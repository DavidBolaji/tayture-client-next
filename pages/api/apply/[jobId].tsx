import db from '@/db/db'
import { getJobById } from '@/lib/api/job'
import verifyToken from '@/middleware/verifyToken'

import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  if (!req.query.jobId)
    return res.status(400).json({ message: 'job id is required' })

  // const jobs = await getJobById(req.query.jobId as string)

  try {
    /** get applied */
    const req1 = db.applied.findMany({
      where: {
        jobId: req.query.jobId as string,
      },

      include: {
        user: true,
        job: {
          include: {
           
            schedule: {
              where: {
                jobId: req.query.jobId as string,
              },
              include: {
                user: true,
              },
            },
          },
        },
      },
    })

  
    const [applied] = await Promise.all([req1])
    return res.status(200).json({
      message: 'Applied fetched succesfully',
      applied: {
        applied: [...applied].map(({ job, user, ...rest }) => ({
          ...rest,
          user,
        })),
        job: applied[0].job,
      },
    })
  } catch (error) {
    console.log('[GET_MATCHED]', error as Error)
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
