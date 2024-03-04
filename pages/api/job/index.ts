import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IJobSchDb } from './types'

type Data = {
  message: string
  job?: IJobSchDb[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  const job = await db.job.findMany()

  return res
    .status(200)
    .json({ message: 'Succesful', job: job as unknown as IJobSchDb[] })
}
