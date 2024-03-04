import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    await db.test.deleteMany({
      where: {
        scheduleId: req.body['scheduleId'],
      },
    })

    const result = await db.test.createMany({
      data: req.body['test'].map((test: any) => ({
        id: uuid(),
        scheduleId: req.body['scheduleId'],
        text: test,
      })),
    })

    const data = await db.test.findFirst({
      where: {
        scheduleId: req.body['scheduleId'],
      },
      select: {
        schedule: {
          select: {
            jobId: true,
          },
        },
      },
    })

    return res.status(200).json({
      message: 'Test Created',
      job: data?.schedule.jobId,
    })
  } catch (error) {
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
