import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import { formatNumber } from '@/utils/helpers'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })

  const { wallet_balance, schoolId, decre, role } = req.body


  try {
    if(!decre) {
      const [wallet] = await db.$transaction(async (tx) => {
        const req2 = tx.wallet.update({
          where: {
            walletUserId: req.authUser!.id as string,
          },
          data: {
            wallet_balance: {
              increment: wallet_balance,
            },
          },
        })
    
        const req1 = tx.transaction.create({
          data: {
            type: 'CREDIT',
            amount: wallet_balance,
            userId: req.authUser!.id,
            message: `Funded Wallet with ₦${formatNumber(wallet_balance, "NGN", {})}`,
            schoolId,
          },
        })
    
        return await Promise.all([req1, req2])
      })
      return res.status(200).json({
        message: 'Job Created',
        wallet,
      })
    } else {
      const [wallet] = await db.$transaction(async (tx) => {
        const req2 = tx.wallet.update({
          where: {
            walletUserId: req.authUser!.id as string,
          },
          data: {
            wallet_balance: {
              decrement: wallet_balance,
            },
            wallet_locked_balance: {
              increment: wallet_balance
            }
          },
        })
    
        const req1 = tx.transaction.create({
          data: {
            type: 'LOCKED',
            amount: wallet_balance,
            userId: req.authUser!.id,
            message: `Interview Booking of ₦${formatNumber((wallet_balance), "NGN", {})} for role of ${role}`,
            schoolId,
          },
        })
    
        return await Promise.all([req1, req2])
      })
      return res.status(200).json({
        message: 'Job Created',
        wallet,
      })
    }
   
  
  } catch (error) {
    console.log('[WALLET_UPDATE]', (error as Error).message)
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
