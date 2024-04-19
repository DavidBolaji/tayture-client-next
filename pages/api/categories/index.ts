import db from '@/db/db'
import { Categories } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  category?: Categories[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  const category = await db.categories.findMany({
    
  })
  res.status(200).json({ message: 'Succesful', category })
}