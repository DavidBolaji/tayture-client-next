import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const ignoredKeys = ['created_at', 'updated_at', 'assessment']
  const { body, query } = req

  const data = Object.keys(body).reduce((acc, key) => {
    if (!ignoredKeys.includes(key)) {
      if (key === 'job_active' && typeof body[key] === 'object') {
        acc[key] = JSON.stringify(body[key])
      } else if (key === 'job_resumption') {
        // Convert date string to a valid ISO Date
        acc[key] = new Date(body[key])
      } else if (key === 'job_no_hires') {
        acc[key] = String(body[key])
      } else {
        acc[key] = body[key]
      }
    }
    return acc
  }, {} as Record<string, any>)

  try {
    const job = await db.job.update({
      where: {
        job_id: query.jobId as string,
      },
      data,
    })

    res.status(200).json({ message: 'Job Updated', job })
  } catch (error) {
    console.error('[Job Update Error]', (error as Error).message)
    res.status(400).json({ message: `Error: ${(error as Error).message}` })
  }
}
