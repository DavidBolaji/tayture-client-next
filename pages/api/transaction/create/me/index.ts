import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import { formatNumber } from '@/utils/helpers'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  const { noPaid, schoolId, jobId, isFunded, amount, role, complete } = req.body
  if (!noPaid || !schoolId || !jobId)
    return res
      .status(400)
      .json({ message: 'Validation error all fields are required' })

  try {
    await db.$transaction(async (tx) => {
     if (isFunded) {
      const r = tx.wallet.update({
        where: {
          walletUserId: req.authUser?.id
        },
        data: {
          wallet_balance: {
            decrement: amount
          },
          wallet_locked_balance: {
            increment:  amount
          }
        }
      })

      const v = tx.transaction.create({
        data: {
          type: 'LOCKED',
          amount,
          userId: req.authUser!.id,
          message: `Interview Booking of ₦ ${formatNumber((amount), "NGN", {})} for role of ${role}`,
          schoolId,
        }
        
      })
      await Promise.all([r, v])
     }
      const req2 = await tx.job.update({
        where: {
          job_id: jobId,
        },
        data: {
          noPaid: complete ? noPaid :  {
            increment: noPaid
          },
          status: true,
        },
      })
     
    })

    return res.status(200).json({
      message: 'Transaction succesfull',
    })
  } catch (error) {
    console.log('[TRANSACTION_POST]', (error as Error).message)
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
