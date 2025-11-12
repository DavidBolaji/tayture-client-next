import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import db from '@/db/db'
import { withRateLimit } from '@/middleware/rateLimiter'
import { Prisma } from '@prisma/client'
import { formatNumber } from '@/utils/helpers'

const isProd = process.env.NEXT_PUBLIC_ENV === 'prod'
const PAYSTACK_SECRET_KEY = isProd
  ? process.env.PAYSTACK_SECRET_KEY_PROD
  : process.env.PAYSTACK_SECRET_KEY!
const MAX_RETRIES = 3

function safeStringify(obj: any) {
  try {
    return JSON.stringify(obj, null, 2)
  } catch {
    return String(obj)
  }
}

function log(section: string, ...msg: any[]) {
  console.log(`[${new Date().toISOString()}] [${section}]`, ...msg)
}

function logError(section: string, error: any) {
  console.error(`[${new Date().toISOString()}] [${section}] ERROR:`, error?.stack || error)
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestId = crypto.randomUUID()
  const logPrefix = `WEBHOOK:${requestId}`

  log(logPrefix, 'Incoming request', { method: req.method, headers: req.headers })

  if (req.method !== 'POST') {
    log(logPrefix, 'Invalid method', req.method)
    return res.status(405).json({ message: 'Method not allowed' })
  }

  if (!PAYSTACK_SECRET_KEY) {
    const msg = 'Missing PAYSTACK_SECRET_KEY in environment variables'
    logError(logPrefix, msg)
    return res.status(500).json({ message: msg })
  }

  log(logPrefix, 'Body:', safeStringify(req.body))

  try {
    // Verify Paystack signature
    const hash = crypto
      .createHmac('sha512', PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest('hex')

    const signature = req.headers['x-paystack-signature']
    log(logPrefix, 'Generated hash:', hash, 'Signature:', signature)

    if (hash !== signature) {
      logError(logPrefix, 'Invalid Paystack signature')
      return res.status(401).json({ message: 'Invalid signature' })
    }

    const event = req.body
    const idempotencyKey =
      (req.headers['x-datadog-trace-id'] as string) ||
      event.data?.id ||
      crypto.randomUUID()

    log(logPrefix, 'Idempotency key:', idempotencyKey)

    // Check duplicates
    try {
      const existingEvent = await db.webhookEvent.findUnique({
        where: { idempotencyKey },
      })

      if (existingEvent) {
        log(logPrefix, `Duplicate webhook received: ${idempotencyKey}`)
        return res.status(200).json({ message: 'Webhook already processed' })
      }

      // Store webhook
      const webhookEvent = await db.webhookEvent.create({
        data: {
          eventType: event.event,
          payload: event,
          idempotencyKey,
        },
      })
      log(logPrefix, `Stored webhook event: ${webhookEvent.id}`)

      // Process webhook
      await processWebhookEvent(webhookEvent.id, event)
      log(logPrefix, `Successfully processed ${event.event}`)

      return res.status(200).json({ received: true })
    } catch (dbErr) {
      logError(logPrefix, dbErr)
      return res.status(500).json({ error: 'Database error' })
    }
  } catch (err) {
    logError(logPrefix, err)
    return res.status(500).json({ error: 'Webhook processing failed' })
  }
}

async function processWebhookEvent(webhookId: string, event: any) {
  const logPrefix = `PROCESS:${webhookId}`
  log(logPrefix, `Processing event: ${event.event}`)

  try {
    await db.$transaction(
      async (tx) => {
        switch (event.event) {
          case 'charge.success':
            log(logPrefix, 'Handling charge.success event')
            await handleSuccessfulPayment(tx, event.data)
            break
          case 'dedicatedaccount.assign.success':
            log(logPrefix, 'Handling dedicatedaccount.assign.success event')
            await handleAccountSuccess(tx, event.data)
            break
          case 'transfer.success':
            log(logPrefix, 'Handling transfer.success event')
            await handleTransferSuccess(tx, event.data)
            break
          case 'transfer.failed':
            log(logPrefix, 'Handling transfer.failed event')
            await handleTransferFailed(tx, event.data)
            break
          default:
            log(logPrefix, `Unhandled event type: ${event.event}`)
        }

        await tx.webhookEvent.update({
          where: { id: webhookId },
          data: {
            status: 'processed',
            processedAt: new Date(),
          },
        })

        log(logPrefix, `Webhook marked as processed`)
      },
      { timeout: 50000 }
    )
  } catch (error) {
    logError(logPrefix, error)
    await handleWebhookError(webhookId, error)
  }
}

async function handleWebhookError(webhookId: string, error: any) {
  const logPrefix = `WEBHOOK_ERROR:${webhookId}`
  logError(logPrefix, error)

  const webhookEvent = await db.webhookEvent.findUnique({ where: { id: webhookId } })
  if (!webhookEvent) {
    log(logPrefix, 'Webhook not found in DB')
    return
  }

  if (webhookEvent.retryCount < MAX_RETRIES) {
    const retryDelay = Math.pow(2, webhookEvent.retryCount) * 1000
    log(logPrefix, `Retrying in ${retryDelay}ms (attempt ${webhookEvent.retryCount + 1})`)

    setTimeout(async () => {
      try {
        await db.webhookEvent.update({
          where: { id: webhookId },
          data: { retryCount: webhookEvent.retryCount + 1 },
        })
        log(logPrefix, `Retry attempt ${webhookEvent.retryCount + 1} started`)
        await processWebhookEvent(webhookId, webhookEvent.payload)
      } catch (retryErr) {
        logError(logPrefix, retryErr)
      }
    }, retryDelay)
  } else {
    logError(logPrefix, 'Max retries reached — marking as failed')
    await db.webhookEvent.update({
      where: { id: webhookId },
      data: {
        status: 'failed',
        error: error.message || 'Max retries reached',
      },
    })
  }
}

async function handleSuccessfulPayment(tx: Prisma.TransactionClient, data: any) {
  const logPrefix = 'HANDLE_PAYMENT'
  log(logPrefix, 'Payment data received:', safeStringify(data))

  try {
    // Log the metadata before stringifying
    log(logPrefix, 'Metadata before stringify:', safeStringify(data.metadata))
    
    const metadataString = JSON.stringify(data.metadata)
    log(logPrefix, 'Metadata stringified successfully')

    // Create DVA transaction
    const dvaTransaction = await tx.dvaTransaction.create({
      data: {
        reference: data.reference,
        amount: data.amount / 100,
        status: data.status,
        accountNumber: data.authorization.receiver_bank_account_number,
        metadata: metadataString, // ✅ Fixed: Convert to string
      },
    })
    log(logPrefix, `DVA transaction created: ${dvaTransaction.reference}`)

    // Update wallet balance
    const updatedWallet = await tx.wallet.update({
      where: { walletSchId: data.customer.metadata.schoolId },
      data: {
        wallet_balance: { increment: data.amount / 100 },
      },
    })
    log(logPrefix, `Wallet updated for school: ${data.customer.metadata.schoolId}, New balance: ${updatedWallet.wallet_balance}`)

    // Create transaction record
    const transaction = await tx.transaction.create({
      data: {
        amount: data.amount / 100,
        type: 'CREDIT',
        message: `Funded Wallet with ₦${formatNumber(data.amount / 100, 'NGN', {})}`,
        userId: data.customer.metadata.userId,
        schoolId: data.customer.metadata.schoolId,
      },
    })
    log(logPrefix, `Transaction record created: ${transaction.id}`)

    // Create notification
    const notification = await tx.notifcation.create({
      data: {
        msg: 'Hurray!!! you have successfully funded your wallet',
        notificationUser: data.customer.metadata.userId,
        caption: 'Wallet Funded',
      },
    })
    log(logPrefix, `Notification created: ${notification.id}`)

    log(logPrefix, '✅ Payment processed successfully')
  } catch (err) {
    logError(logPrefix, err)
    throw err
  }
}

async function handleAccountSuccess(tx: Prisma.TransactionClient, data: any) {
  const logPrefix = 'HANDLE_ACCOUNT'
  log(logPrefix, 'Account assignment data:', safeStringify(data))

  try {
    const dvaAccount = await tx.dvaAccount.create({
      data: {
        schoolId: data.customer.metadata.schoolId,
        accountNumber: data.dedicated_account.account_number,
        bankName: data.dedicated_account.bank.name,
        bankCode: data.dedicated_account.bank.slug,
        reference: data.customer.customer_code,
      },
    })
    log(logPrefix, `DVA account created: ${dvaAccount.accountNumber} for school: ${dvaAccount.schoolId}`)
    log(logPrefix, '✅ Account assignment processed successfully')
  } catch (err) {
    logError(logPrefix, err)
    throw err
  }
}

async function handleTransferSuccess(tx: Prisma.TransactionClient, data: any) {
  const logPrefix = 'HANDLE_TRANSFER_SUCCESS'
  log(logPrefix, 'Transfer success data:', safeStringify(data))

  try {
    log(logPrefix, 'Parsing metadata from reason field:', data?.reason)
    const metaData = JSON.parse(data?.reason)
    log(logPrefix, 'Parsed metadata:', safeStringify(metaData))

    // Create DVA transaction
    const dvaTransaction = await tx.dvaTransaction.create({
      data: {
        reference: data.reference,
        amount: data.amount / 100,
        status: data.status,
        accountNumber: data?.recipient?.details?.account_number,
        metadata: data.reason, // ✅ This is already a string from Paystack
      },
    })
    log(logPrefix, `DVA transaction created: ${dvaTransaction.reference}`)

    // Update wallet locked balance
    const updatedWallet = await tx.wallet.update({
      where: { walletSchId: metaData.schoolId },
      data: { wallet_locked_balance: { decrement: metaData.amount / 100 } },
    })
    log(logPrefix, `Wallet locked balance updated for school: ${metaData.schoolId}, New locked balance: ${updatedWallet.wallet_locked_balance}`)

    // Create transaction record
    const transaction = await tx.transaction.create({
      data: {
        type: 'DEBIT',
        amount: metaData.amount / 100,
        userId: metaData.userId,
        message: `Successful Hiring of ${metaData?.role?.trim()} at ₦${formatNumber(metaData.amount / 100, 'NGN', {})}`,
        schoolId: metaData.schoolId,
      },
    })
    log(logPrefix, `Transaction record created: ${transaction.id}`)

    log(logPrefix, '✅ Transfer processed successfully')
  } catch (err) {
    logError(logPrefix, err)
    throw err
  }
}

async function handleTransferFailed(tx: Prisma.TransactionClient, data: any) {
  const logPrefix = 'HANDLE_TRANSFER_FAILED'
  log(logPrefix, 'Transfer failed data:', safeStringify(data))
  
  try {
    log(logPrefix, `Transfer failed for reference: ${data.reference}`)
    log(logPrefix, `Failure reason: ${data?.reason || 'No reason provided'}`)
    
    // You might want to add logic here to:
    // 1. Release locked funds back to wallet
    // 2. Notify the user
    // 3. Create a failed transaction record
    
    log(logPrefix, '⚠️ Transfer failure logged')
  } catch (err) {
    logError(logPrefix, err)
    throw err
  }
}

export default withRateLimit(handler)