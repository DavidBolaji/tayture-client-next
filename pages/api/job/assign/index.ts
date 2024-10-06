import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export let url =
  process.env.NEXT_PUBLIC_ENV === 'prod'
    ? process.env.NEXT_PUBLIC_PROD
    : process.env.NEXT_PUBLIC_DEV

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  const { jobId, userId } = req.body

  if (!jobId || !userId) {
    return res.status(400).json({ message: 'job id and user id is required' })
  }

  try {
    const request = db.applied.findMany({
      where: {
        userId,
      },
      select: {
        cv: true,
        qual: true,
        exp: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const request2 = db.applied.findMany({
      where: {
        userId,
        jobId,
      },
    })

    const [applied, hasApplied] = await Promise.all([request, request2])

    if (!applied.length || hasApplied.length) {
      return res.status(400).json({ error: 'User cannot be assigned' })
    }

    const job = await db.job.findUnique({
      where: {
        job_id: jobId,
      },
      select: {
        school: {
          select: {
            sch_id: true,
          },
        },
      },
    })

    await axios.post(
      `${url}/apply/create/me`,
      {
        userId,
        jobId,
        cv: applied[0].cv,
        qual: applied[0].qual,
        exp: applied[0].exp,
        schoolId: job?.school.sch_id,
      },
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      },
    )

    return res
      .status(200)
      .json({ message: 'user has been assigned successfully' })
  } catch (error) {
    console.error('Error fetching jobs:', (error as Error).message)
    res.status(500).json({ error: (error as Error).message })
  }
}

export default verifyToken(handler)
