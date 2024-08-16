import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message?: string
  user?: any
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    const user = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (!user.phone) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          phone: req.body.phone,
        },
      })
    }

    return res.status(200).json({
      message: 'Succesful',
      user: { ...user, phone: !user.phone ? req.body.phone : user.phone },
    })
  } catch (error) {
    console.log(error)
    return res.status(404).json({ error: (error as Error).message })
  }
}
