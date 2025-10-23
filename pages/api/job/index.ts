import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IJobSchDb } from './types'
import { Prisma } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { title, location, minPrice } = req.query

  const whereClause: Prisma.JobWhereInput = {
    school: {
      sch_verified: 1,
    },
    active: true,
  }

  if (title) {
    whereClause.job_title = {
      contains: (title as string).toLowerCase(),
    }
  }

  if (location) {
    whereClause!.school!.sch_state = location as string
  }

  try {
    let jobs = await db.job.findMany({
      where: whereClause,
      select: {
        job_id: true,
        job_title: true,
        job_role: true,
        job_active: true,
        job_desc: true,
        job_min_sal: true,
        job_max_sal: true,
        job_exp: true,
        assessmentId: true,
        job_qual: true,
        job_resumption: true,
        job_no_hires: true,
        jobSchoolId: true,
        jobUserzId: true,
        createdAt: true,
        updatedAt: true,
        school: {
          select: {
            sch_id: true,
            sch_name: true,
            sch_city: true,
            sch_state: true,
            sch_lga: true,
            sch_address: true,
            landmark: true,
          },
        },
        applied: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Convert salary strings to numbers and filter manually
    jobs = jobs.filter((job) => {
      const minSalary = parseFloat(job.job_min_sal) || 0
      const maxSalary = parseFloat(job.job_max_sal) || 0

      if (minPrice) {
        const minPriceNum = Number(minPrice)
        // Check if the minPrice falls within the salary range
        if (minSalary > minPriceNum || maxSalary < minPriceNum) return false
      }

      return true
    })

    // Generate unique job tags
    const schoolIndexMap = new Map<string, number>()
    const jobsWithTag = jobs.map((job) => {
      const schoolId = job.school.sch_id
      const schoolName = job.school.sch_name.split(' ')
      const schoolAcro = schoolName.map((el) => el[0]?.toUpperCase())

      const jobIndex = (schoolIndexMap.get(schoolId) || 0) + 1
      schoolIndexMap.set(schoolId, jobIndex)

      const datePart = job.createdAt
        .toISOString()
        .slice(2, 10)
        .replace(/-/g, '')
      const idxPart = jobIndex.toString().padStart(2, '0')
      const tag = `${datePart}-${schoolAcro.join('').slice(0, 3)}-${idxPart}`

      return {
        ...job,
        tag,
        idx: jobIndex,
      }
    })

    return res.status(200).json({
      message: 'Successful',
      job: jobsWithTag as unknown as IJobSchDb[],
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error })
  }
}
