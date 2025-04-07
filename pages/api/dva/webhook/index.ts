import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import db from '@/db/db'
import { logger } from '@/middleware/logger'
import { withRateLimit } from '@/middleware/rateLimiter'
import { Prisma } from '@prisma/client'
import { formatNumber } from '@/utils/helpers'

const isProd = process.env.NEXT_PUBLIC_ENV === 'prod'
const PAYSTACK_SECRET_KEY = isProd
  ? process.env.PAYSTACK_SECRET_KEY_PROD
  : process.env.PAYSTACK_SECRET_KEY!
const MAX_RETRIES = 3

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  if (!PAYSTACK_SECRET_KEY) {
    throw new Error('Missing PAYSTACK_SECRET_KEY in environment variables')
  }

  logger.info('Received Headers:', req.headers) // Log all headers
  logger.info('Received Bocdy:', req.body) // Log all headers

  // Verify Paystack signature
  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex')

  logger.info(`Hash: ${hash}`)

  if (hash !== req.headers['x-paystack-signature']) {
    logger.error('Invalid webhook signature')
    return res.status(401).json({ message: 'Invalid signature' })
  }

  const event = req.body
  const idempotencyKey = req.headers['x-datadog-trace-id'] as string

  try {
    // Check for duplicate webhook
    const existingEvent = await db.webhookEvent.findUnique({
      where: { idempotencyKey },
    })

    if (existingEvent) {
      logger.info(`Duplicate webhook received: ${idempotencyKey}`)
      return res.status(200).json({ message: 'Webhook already processed' })
    }

    // Store webhook event
    const webhookEvent = await db.webhookEvent.create({
      data: {
        eventType: event.event,
        payload: event,
        idempotencyKey,
      },
    })

    // Process the webhook event
    await processWebhookEvent(webhookEvent.id, event)

    return res.status(200).json({ received: true })
  } catch (error) {
    logger.error('Error processing webhook:', error)
    return res.status(500).json({ error: 'Webhook processing failed' })
  }
}

async function processWebhookEvent(webhookId: string, event: any) {
  try {
    await db.$transaction(
      async (tx) => {
        switch (event.event) {
          case 'charge.success':
            await handleSuccessfulPayment(tx, event.data)
            break
          case 'dedicatedaccount.assign.success':
            await handleAccountSuccess(tx, event.data)
            break
          case 'transfer.success':
            await handleTransferSuccess(tx, event.data)
            break
          case 'transfer.failed':
            await handleTransferFailed(tx, event.data)
            break
          // Add other event handlers
        }

        // Mark webhook as processed
        await tx.webhookEvent.update({
          where: { id: webhookId },
          data: {
            status: 'processed',
            processedAt: new Date(),
          },
        })
      },
      { timeout: 50000 }
    )
  } catch (error) {
    logger.error(`Error processing webhook ${webhookId}:`, error)
    await handleWebhookError(webhookId, error)
  }
}

async function handleWebhookError(webhookId: string, error: any) {
  const webhookEvent = await db.webhookEvent.findUnique({
    where: { id: webhookId },
  })

  if (!webhookEvent) return

  if (webhookEvent.retryCount < MAX_RETRIES) {
    // Schedule retry with exponential backoff
    const retryDelay = Math.pow(2, webhookEvent.retryCount) * 1000
    setTimeout(async () => {
      await db.webhookEvent.update({
        where: { id: webhookId },
        data: { retryCount: webhookEvent.retryCount + 1 },
      })
      await processWebhookEvent(webhookId, webhookEvent.payload)
    }, retryDelay)
  } else {
    // Mark as permanently failed
    await db.webhookEvent.update({
      where: { id: webhookId },
      data: {
        status: 'failed',
        error: error.message || 'Maximum retry attempts reached',
      },
    })
  }
}

async function handleSuccessfulPayment(
  tx: Prisma.TransactionClient,
  data: any
) {
  logger.info('Payment made', data)
  await tx.dvaTransaction.create({
    data: {
      reference: data.reference,
      amount: data.amount / 100, // Convert from kobo to naira
      status: data.status,
      accountNumber: data.authorization.receiver_bank_account_number,
      metadata: data.metadata,
    },
  })

  await tx.wallet.update({
    where: {
      walletSchId: data.customer.metadata.schoolId,
    },
    data: {
      wallet_balance: {
        increment: data.amount / 100,
      },
    },
  })

  await tx.transaction.create({
    data: {
      amount: data.amount / 100,
      type: 'CREDIT',
      message: `Funded Wallet with ₦${formatNumber(
        data.amount / 100,
        'NGN',
        {}
      )}`,
      userId: data.customer.metadata.userId,
      schoolId: data.customer.metadata.schoolId,
    },
  })

  tx.notifcation.create({
    data: {
      msg: `Hurray!!! you have succesfully funded wallet`,
      notificationUser: data.customer.metadata.userId as string,
      caption: 'School created',
    },
  })
}

async function handleAccountSuccess(tx: Prisma.TransactionClient, data: any) {
  logger.info('Account Created', data)
  // create prisma Dedicated virtual account
  await tx.dvaAccount.create({
    data: {
      schoolId: data.customer.metadata.schoolId,
      accountNumber: data.dedicated_account.account_number,
      bankName: data.dedicated_account.bank.name,
      bankCode: data.dedicated_account.bank.slug,
      reference: data.customer.customer_code,
    },
  })
}

async function handleTransferSuccess(tx: Prisma.TransactionClient, data: any) {
  logger.info('Transfer Created', data)
  // create prisma Dedicated virtual account
  const metaData = JSON.parse(data?.reason)
  logger.info(JSON.stringify(metaData, null, 2))

  await tx.dvaTransaction.create({
    data: {
      reference: data.reference,
      amount: data.amount / 100, // Convert from kobo to naira
      status: data.status,
      accountNumber: data?.recipient?.details?.account_number,
      metadata: data.reason,
    },
  })

  await tx.wallet.update({
    where: {
      // walletUserId: req.authUser?.id,
      walletSchId: metaData.schoolId,
    },
    data: {
      wallet_locked_balance: {
        decrement: metaData.amount / 100,
      },
    },
  })

  await tx.transaction.create({
    data: {
      type: 'DEBIT',
      amount: metaData.amount / 100,
      userId: metaData.userId,
      message: `Succesful Hiring of ${metaData?.role?.trim()} at ₦${formatNumber(
        metaData.amount / 100,
        'NGN',
        {}
      )}`,
      schoolId: metaData.schoolId,
    },
  })
}

async function handleTransferFailed(tx: Prisma.TransactionClient, data: any) {
  logger.info('Transfer Fauked', data)
  // create prisma Dedicated virtual account
}

// Export with rate limiting
export default withRateLimit(handler)
