import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import db from '@/db/db'
import { Prisma } from '@prisma/client'
import { formatNumber } from '@/utils/helpers'

// ⚠️ reuse your existing env logic
const isProd = process.env.NEXT_PUBLIC_ENV === 'prod'
const PAYSTACK_SECRET_KEY = isProd
  ? process.env.PAYSTACK_SECRET_KEY_PROD
  : process.env.PAYSTACK_SECRET_KEY!

/**
 * Verify transaction directly from Paystack
 * (Source of truth)
 */
async function verifyPaystackTransaction(reference: string) {
  const response = await axios.get(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    }
  )

  return response.data.data
}

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { reference } = req.body

  if (!reference) {
    return res.status(400).json({ message: 'Transaction reference is required' })
  }

  try {
    /**
     * STEP 1: Verify from Paystack
     */
    const verifiedData = await verifyPaystackTransaction(reference)

    if (!verifiedData || verifiedData.status !== 'success') {
      return res.status(400).json({
        message: 'Transaction not successful on Paystack',
        status: verifiedData?.status,
      })
    }

    /**
     * STEP 2: Idempotency check
     * Prevent double wallet funding
     */
    const alreadyProcessed = await db.dvaTransaction.findUnique({
      where: { reference },
    })

    if (alreadyProcessed) {
      return res.status(200).json({
        message: 'Transaction already processed',
        reference,
      })
    }

    /**
     * STEP 3: Process using same webhook logic
     */
    await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        await handleSuccessfulPayment(tx, verifiedData)
      },
      { timeout: 50000 }
    )

    /**
     * STEP 4: Log recovery for audit
     */
    await db.webhookEvent.create({
      data: {
        eventType: 'manual.recovery',
        payload: verifiedData,
        idempotencyKey: `manual-${reference}`,
        status: 'processed',
        processedAt: new Date(),
      },
    })

    return res.status(200).json({
      message: 'Transaction recovered and processed successfully',
      reference,
    })
  } catch (error: any) {
    console.error('[PAYSTACK_RECOVERY_ERROR]', error)

    return res.status(500).json({
      message: 'Failed to recover transaction',
      error: error.message,
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