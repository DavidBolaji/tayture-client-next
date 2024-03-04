import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IJobSchDb } from '../types'

type Data = {
  message: string
  job?: Partial<IJobSchDb>
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })

  const holder = ['created_at', 'updated_at']

  const keys = Object.keys(req.body)
  const data: any = {}

  keys.forEach((key) => {
    if (!holder.includes(key)) {
      data[key] = req.body[key]
    }
  })

  try {
    const job = await db.job.update({
      where: {
        job_id: req.query.jobId as string,
      },
      data: { ...data },
    })
    res
      .status(200)
      .json({ message: 'Job Updated', job: job as unknown as IJobSchDb })
  } catch (error) {
    res.status(400).json({ message: `Error: ${(error as Error).message}` })
  }
}
