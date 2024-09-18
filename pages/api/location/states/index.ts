import { states } from '@/utils/data'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  user?: any
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!['GET', 'POST'].includes(req.method!))
    return res.status(405).json({ message: 'Method not allowed' })

  const final =
    req.body.country === 'Nigeria'
      ? [...states[req.body.country ?? 'Nigeria'], { name: 'Rivers', state_code: 'RV' }]
      : [...states[req.body.country ?? 'Nigeria']]


  try {
    return res.status(200).send({
      message: 'Fetch succesfull',
      data: final.sort((a, b) => a.name.localeCompare(b.name)),
    })
  } catch (error: any) {
    res.status(500).send({ message: error.message, data: [] })
  }
}
