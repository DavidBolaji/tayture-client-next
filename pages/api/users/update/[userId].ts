import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'

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

  keys.forEach((key) => {
    if (!holder.includes(key)) {
      data[key] = req.body[key]
    }
  })
  console.log(req.query.userId)
  console.log(data)

  const user = await db.user.update({
    where: {
      id: req.query.userId as string,
    },
    data,
  })

  return res.status(200).json({ message: 'User Updated', user })
}
