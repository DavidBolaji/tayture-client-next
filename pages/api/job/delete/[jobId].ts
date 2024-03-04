import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IJobSchDb } from '../types'

type Data = {
  message: string
  job?: IJobSchDb
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'DELETE')
    return res.status(405).json({ message: 'Method not allowed' })

  const job = await db.job.delete({
    where: {
      job_id: req.query.jobId as string,
    },
  })

  res.status(200).json({
    message: 'Job deleted Succesfully',
    job: job as unknown as IJobSchDb,
  })
}
