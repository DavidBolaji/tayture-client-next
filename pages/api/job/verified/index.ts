import db from '@/db/db'
import { Prisma, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  job?: any
  total?: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'GET') {
    return res.status(400).json({ message: 'Method not allowed' })
  }

  try {
    const { searchTerm = '', filterBy = 'job', currentPage, pageSize } = req.query

    const select:Prisma.JobSelect = {
      job_id: true,
      job_title: true,
      job_role: true,
      job_active: true,
      job_desc: true,
      job_min_sal: true,
      job_max_sal: true,
      job_exp: true,
      job_qual: true,
      job_resumption: true,
      assessmentId: true,
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
    }

    // Query building for filtering
    const whereClause: any = {
      school: {
        sch_verified: 1,
      },
      active: true,
    }

    if (filterBy === 'school') {
      whereClause.school.sch_name = {
        contains: (searchTerm as string).toLowerCase(),
      }
    } else if (filterBy === 'job') {
      whereClause.job_title = {
        contains: (searchTerm as string).toLowerCase(),
      }
    }

    // Pagination condition: only apply pagination if both currentPage and pageSize are provided
    let jobs: any[] = []
    let total: number = 0

    if (currentPage && pageSize) {
      console.log('[PAGINATION]')
      // If pagination is specified, apply it
      ;[jobs, total] = await Promise.all([
        db.job.findMany({
          where: whereClause,
          select: select,
          orderBy: {
            createdAt: 'desc', // Order by latest created first
          },
          skip: (Number(currentPage) - 1) * Number(pageSize), // Skip previous pages
          take: Number(pageSize), // Limit number of results per currentPage
        }),
        db.job.count({ where: whereClause }), // Total number of jobs matching the search
      ])
    } else {
      // If pagination is not specified, fetch all jobs
      jobs = await db.job.findMany({
        where: whereClause,
        select: select,
        orderBy: {
          createdAt: 'desc', // Order by latest created first
        },
      })
      total = jobs.length // Total is the length of all jobs when pagination is not applied
    }

    // Group by school and calculate the index for each job
    const schoolIndexMap = new Map<string, number>()
    const jobsWithTag = jobs.map((job) => {
      const schoolId = job.school.sch_id
      const schoolName = job.school.sch_name.split(' ')
      const schoolAcro = schoolName.map((el: any) => el[0]?.toUpperCase())

      // Initialize or increment the job index for the school
      const jobIndex = (schoolIndexMap.get(schoolId) || 0) + 1
      schoolIndexMap.set(schoolId, jobIndex)

      // Format the job tag
      const datePart = job.createdAt.toISOString().slice(2, 10).replace(/-/g, '') // e.g., 08092024
      const idxPart = jobIndex.toString().padStart(2, '0') // Pad index with leading zero if needed
      const tag = `${datePart}-${schoolAcro.join('').slice(0, 3)}-${idxPart}`

      return {
        ...job,
        tag,
        idx: jobIndex,
      }
    })

    res.status(200).json({ message: 'Successful', job: jobsWithTag, total })
  } catch (error) {
    console.error('Error fetching jobs:', error)
    res.status(500).json({ message: (error as Error).message })
  }
}
