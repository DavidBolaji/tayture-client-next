import db from '@/db/db'
import { getJobById } from '@/lib/api/job'
import verifyToken from '@/middleware/verifyToken'

import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  if (!req.query.jobId)
    return res.status(400).json({ message: 'job id is required' })

  const jobs = getJobById(req.query.jobId as string)

  try {
    /** get applied */
    const req1 = db.schedule.findMany({
      where: {
        jobId: req.query.jobId as string,
      },

      include: {
        user: {
          include: {
            applied: {
              where: {
                jobId: req.query.jobId as string,
              },
            },
            hired: {
              where: {
                jobId: req.query.jobId as string,
              }
            }
          },
         
        },
        job: {
          include: {
            hired: {
              where: {
                jobId: req.query.jobId as string,
              }
            }
          },
          
        },
       
        test: true,
        instruction: true,
      },
    })

    const [scheduled, job] = await Promise.all([req1, jobs])

    console.log({
      scheduled: [...scheduled].map(({ job, user, ...rest }) => ({
        ...rest,
        user,
      })),
      job: job.data.job,
    })

    return res.status(200).json({
      message: 'Scheduled fetched succesfully',
      scheduled: {
        scheduled: [...scheduled].map(({ job, user, ...rest }) => ({
          ...rest,
          user,
        })),
        job: job.data.job,
      },
    })
  } catch (error) {
    console.log('[GET_SCHEDULED]', error as Error)
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
