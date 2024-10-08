import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Only allow PUT method
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const ignoredKeys = ['created_at', 'updated_at']
  const { body, query } = req

  // Process the request body, handling specific keys and data formats
  const data = Object.keys(body).reduce((acc, key) => {
    if (!ignoredKeys.includes(key)) {
      if (key === 'job_active' && typeof body[key] === 'object') {
        acc[key] = JSON.stringify(body[key])
      } else if (key === 'job_no_hires') {
        acc[key] = String(body[key])
      } else {
        acc[key] = body[key]
      }
    }
    return acc
  }, {} as Record<string, any>)

  try {
    // Update the job in the database
    const job = await db.job.update({
      where: {
        job_id: query.jobId as string,
      },
      data,
    })

    res.status(200).json({ message: 'Job Updated', job: job })
  } catch (error) {
    res.status(400).json({ message: `Error: ${(error as Error).message}` })
  }
}
