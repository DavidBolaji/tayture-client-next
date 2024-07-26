import { NextApiRequest, NextApiResponse } from 'next'
import db from '@/db/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  try {
    const { oneWeekAgo, today } = req.body

    const jobs = await db.job.findMany({
      where: {
        AND: [
          {
            school: {
              sch_verified: 1,
            },
            active: true,
          },
          {
            createdAt: {
              gte: oneWeekAgo,
              lte: today,
            },
          },
        ],
      },
      select: {
        job_title: true,
        job_role: true,
      },
    })

    return res.status(200).send({ message: 'SMS sent succesfully', jobs })
  } catch (error: any) {
    console.log('error: ', error)
    return res.status(400).send({ message: (error as Error).message })
  }
}
