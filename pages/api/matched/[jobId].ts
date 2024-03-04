import db from '@/db/db'
import { getJobById } from '@/lib/api/job'
import { storeAndDeleteMatched } from '@/lib/api/matched'
import { getViewed } from '@/lib/api/viewed'
import verifyToken from '@/middleware/verifyToken'

import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  if (!req.query.jobId)
    return res.status(400).json({ message: 'job id is required' })

  const jobs = await getJobById(req.query.jobId as string)

  try {
    /** fetch viewed matches */
    const viewed = await getViewed({
      jobId: req.query.jobId as string,
      no_hires: jobs.data.job.job_no_hires,
      token: req.token as string,
    })
    const totalHires = +jobs.data.job.job_no_hires * 2
    console.log(totalHires)

    console.log('[GET_VIEWED_DATA]', viewed)

    /**check if viewed match exist */
    if (viewed && viewed.length > 0) {
      /**check if returned count matches multiple of hire */
      if (viewed.length < totalHires) {
        /** get reserved */
        const left = totalHires - viewed.length

        /** get matched */
        const matched = await db.matched.findMany({
          take: left,
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
              },
            },
            job: {
              select: {
                job_title: true,
              },
            },
          },
        })
        /**no extra data return */
        if (!matched)
          return res.status(200).json({
            message: 'Matches fetched succesfully',
            matched: viewed,
          })

        await storeAndDeleteMatched(
          matched.map(({ user, job, ...match }) => match),
        )
        /** return data */
        res.status(200).json({
          message: 'Matches fetched succesfully',
          matched: [...viewed, ...matched],
        })
      }

      /** update viewed and return data */
      return res.status(200).json({
        message: 'Matches fetched succesfully',
        matched: viewed,
      })
    }

    /** get matched */
    const matched = await db.matched.findMany({
      take: totalHires,
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
          },
        },
        job: {
          select: {
            job_title: true,
          },
        },
      },
    })

    /** check matched if < to multiple of hire */
    if (matched.length < totalHires) {
      /** complete number from list */
      const left = totalHires - matched.length

      /** get viewed */
      const prevView = await db.viewedMatch.findMany({
        take: left,
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
            },
          },
          job: {
            select: {
              job_title: true,
            },
          },
        },
      })

      await storeAndDeleteMatched(
        matched.map(({ user, job, ...match }) => match),
      )

      return res.status(200).json({
        message: 'Matches fetched succesfully',
        matched: [...prevView, ...matched],
      })
    }

    await storeAndDeleteMatched(matched.map(({ user, job, ...match }) => match))

    return res.status(200).json({
      message: 'Matches fetched succesfully',
      matched,
    })
  } catch (error) {
    console.log('[GET_MATCHED]', error as Error)
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
