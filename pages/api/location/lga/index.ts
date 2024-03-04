import { holder } from '@/utils/data'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  user?: any
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  const { lga } = req.body
  const ind = lga as unknown as string
  return res
    .status(200)
    .send({ message: `Lga in ${lga} retrieved`, data: [...holder[ind]] })
}
