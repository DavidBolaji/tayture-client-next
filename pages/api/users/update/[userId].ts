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
        console.log('[update] password received — length:', String(req.body[key]).length, 'type:', typeof req.body[key])
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body[key], salt)
        data[key] = hashedPassword
      } else {
        data[key] = req.body[key]
      }
    }
  }))

  console.log('[update] updating userId:', req.query.userId, '| fields:', Object.keys(data))

  try {
    const user = await db.user.update({
      where: {
        id: req.query.userId as string,
      },
      data,
    })

    console.log('[update] DB write success — full hash:', user.password)
    return res.status(200).json({ message: 'User Updated', user })
  } catch (err) {
    console.log((err as Error).message)
    return res.status(500).json({ message: (err as Error).message })
  }
}
