import db from '@/db/db'
import { getUserById } from '@/lib/services/user'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    const jobCreate = await db.hired.create({
      data: {
       userId: req.body.userId,
       jobId: req.body.jobId
      },
    })
    const note = await db.notifcation.create({
        data: {
          msg: `Hurray!!! you have succesfully Hired `,
          notificationUser: req.body.userId as string,
          caption: "Job Hire Completed"
        }
      })
    res.status(201).json({
      message: 'Job status updated',
      job: jobCreate,
    })
  } catch (error) {
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}
