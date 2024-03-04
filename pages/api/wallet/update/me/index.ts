import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })

  const { wallet_balance } = req.body

  try {
    const wallet = await db.wallet.update({
      where: {
        walletUserId: req.authUser!.id as string,
      },
      data: {
        wallet_balance: {
          increment: wallet_balance,
        },
      },
    })
    return res.status(200).json({
      message: 'Job Created',
      wallet,
    })
  } catch (error) {
    console.log('[WALLET_UPDATE]', (error as Error).message)
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
