import db from '@/db/db'
import { sendTextMessage } from '@/lib/services/user'
import verifyToken from '@/middleware/verifyToken'

import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  if (!req.query.jobId)
    return res.status(400).json({ message: 'job id is required' })

  try {
    /** get applied */
    const applied = await db.applied.findMany({
      where: {
        jobId: req.query.jobId as string,
      },
      select: {
        user: {
          select: {
            id: true,
            phone: true,
            fname: true,
          },
        },
        job: {
          select: {
            job_title: true,
          },
        },
      },
    })

    if (process.env.NEXT_PUBLIC_ENV === 'prod') {
      const rejectedUsers = applied.filter(
        (apply) => !req.body['userIds'].include(apply.user.id),
      )

      await Promise.all(
        rejectedUsers.map(async ({ user, job }) => {
          await sendTextMessage(
            user.phone,
            `Hello ${user.fname}, thank you for your application for the role of ${job.job_title}. We regret to inform you that you have not been selected for the position. However you can still visit https://tayture.com for more jobs. Best of luck with your job search.`,
          )
        }),
      )
    }

    return res.status(200).json({
      message: 'Applied fetched succesfully',
    })
  } catch (error) {
    console.log('[GET_MATCHED]', error as Error)
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
