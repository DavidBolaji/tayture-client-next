import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    const transaction = await db.transaction.findMany({
        where: {
            userId: req.authUser?.id
        },
        orderBy: {
            createdAt: "desc"
        }
      })
    return res.status(200).json({
      message: `Succesful`,
      transaction,
    })
  } catch (error) {
    console.log('[API/TRANSACTION/ME]', (error as Error).message)
    return res.status(400).json({
      message: `${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)