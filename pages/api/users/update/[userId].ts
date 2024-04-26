import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

type Data = {
  message: string
  user?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })
  const holder = ['email']

  const keys = Object.keys(req.body)
  const data: { [key: string]: string } = {}

  await Promise.all(keys.map(async (key) => {
    if (!holder.includes(key)) {
      if (key === "password") {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body[key], salt)
        data[key] = hashedPassword
      } else {
        data[key] = req.body[key]
      }
    }
  }))

  try {
    const user = await db.user.update({
      where: {
        id: req.query.userId as string,
      },
      data,
    })

    return res.status(200).json({ message: 'User Updated', user })
  } catch (err) {
    console.log((err as Error).message)
  }
}
