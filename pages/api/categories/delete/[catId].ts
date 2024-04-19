import db from '@/db/db'
import { Categories } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  category: Categories
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'DELETE')
    return res.status(405).json({ message: 'Method not allowed' })

  const category = await db.categories.delete({
    where: {
      id: req.query.catId as string,
    },
  })

  res.status(200).json({
    message: 'Job deleted Succesfully',
    category
  })
}
