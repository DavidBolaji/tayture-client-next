import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  job?: any
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    const notification = await db.notifcation.findMany({
      where: {
        notificationUser: req.authUser!.id,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return res.status(200).json({
      message: 'Notification fetch Succesfully',
      notification: notification,
    })
  } catch (error) {
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
