import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  job?: any
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  const holder = ['job_resumption']

  const keys = Object.keys(req.body)
  const data: any = {}

  keys.forEach((key) => {
    if (!holder.includes(key)) {
      data[key] = req.body[key]
    }
  })


  try {
    const job = await db.job.create({
      data: {
        ...data,
        job_no_hires: String(req.body.job_no_hires),
        job_active: Array.isArray(req.body.job_active)
          ? JSON.stringify(req.body.job_active)
          : req.body.job_active,
        job_resumption: new Date(req.body.job_resumption.trim()),
        jobUserzId: req.authUser!.id,
      },
    })
    return res.status(200).json({
      message: 'Job Created',
      job: job,
    })
  } catch (error) {
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
