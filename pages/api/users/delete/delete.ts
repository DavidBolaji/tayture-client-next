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
  if (req.method !== 'DELETE')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    await db.user.deleteMany({})
    res.status(200).json({ message: 'Succesful' })
  } catch (e) {
    console.log((e as Error).message)
  }
}
