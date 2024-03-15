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
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  const user = await db.user.findUnique({
    where: {
      email: req.query.email as string,
    },
  })

  return res.status(200).json({ message: 'Succesful', user })
}
