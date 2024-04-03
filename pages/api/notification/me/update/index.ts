import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import verifyToken from '@/middleware/verifyToken'

type Data = {
  message: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })

  const holder = [
    'status'
  ]

  const keys = Object.keys(req.body)
  const data: any = {}

  keys.forEach((key) => {
    if (!holder.includes(key)) {
      data[key] = req.body[key]
    }
  })

  const notification = await db.notifcation.update({
    where: {
      id: req.body.id,
    },
    data: {
        status: req.body.status
    },
  })

  return res
    .status(200)
    .json({ message: 'Notification Updated', notification })
}

export default verifyToken(handler)
