import { cities } from '@/utils/data'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  user?: any
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  const { state } = req.body
  return res
    .status(200)
    .send({ message: `${state} retrieved`, data: [...cities[state]] })
}
