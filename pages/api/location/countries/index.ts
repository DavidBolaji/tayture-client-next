import { countries } from '@/utils/data'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  user?: any
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    return res.status(200).send({
      message: 'Fetch succesfull',
      data: [...countries].sort((a, b) =>
        a.name.localeCompare(b.name),
      ),
    })
  } catch (error: any) {
    res.status(500).send({ message: error.message, data: [] })
  }
}