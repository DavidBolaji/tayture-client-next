import db from '@/db/db'
import { logger } from '@/middleware/logger'
import {
  createTransferRecipient,
  initiateTransfer,
  resolveBankAccount,
} from '@/utils/helpers'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  const { amount, schoolId, jobId, userId, customerId, role } = req.body

  let deductedAmt = amount
  try {
    const previousHires = await db.job.count({
      where: {
        jobSchoolId: schoolId,
        hired: { some: {} }, // Check if any hire exists for jobs posted by the school
      },
    })

    logger.info(JSON.stringify(previousHires, null, 2))
    if (previousHires < 1) {
      // not hired
      deductedAmt = deductedAmt - 4000
    }
    // Step 1: Resolve bank details
    const resolved = await resolveBankAccount()
    logger.info(JSON.stringify(resolved, null, 2))
    // console.log('Resolved Bank Details:', resolved)

    // Step 2: Create recipient
    const recipientCode = await createTransferRecipient(resolved.account_name)

    // Step 3: Initiate transfer
    await initiateTransfer(
      recipientCode,
      deductedAmt * 100,
      JSON.stringify({
        schoolId,
        jobId,
        userId,
        customerId,
        deductedAmt: deductedAmt * 100,
        amount: amount * 100,
        role,
      })
    )

    return res.status(200).json({
      message: `Successful`,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message })
  }
}
