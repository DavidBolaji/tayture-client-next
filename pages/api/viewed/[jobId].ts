import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  const currentDate = new Date()
  const formattedCurrentDate = currentDate.toISOString()

  const { no_hires } = req.body

  try {
    const viewed = await db.viewedMatch.findMany({
      take: 2 * no_hires,
      where: {
        jobId: req.query.jobId as string,
        viewed: {
          gte: formattedCurrentDate,
        },
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

    return res.status(200).json({
      message: 'Successfullyy fetched viewed',
      viewed,
    })
  } catch (error) {
    console.log('[VIEWED_SINGLE]', (error as Error).message)
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
