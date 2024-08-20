import db from '@/db/db'
import { Coupoun } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  coupoun?: Coupoun[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  const coupoun = await db.coupoun.findMany({})

  res.status(200).json({ message: 'Succesful', coupoun })
}
