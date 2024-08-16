import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IJobSchDb } from './types'

type Data = {
  message: string
  job?: IJobSchDb
  relatedJob?: any[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const selected = {
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
        landmark: true
      },
    },
    applied: true,
  }

  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  if (!req.query.jobId) {
    return res.status(200).json({
      message: 'Succesful',
    })
  }

  const job = await db.job.findUnique({
    where: {
      job_id: req.query.jobId as string,
    },
    select: selected,
  })

  const schoolIndexMap2 = new Map<string, number>()
  const jobWithTag = [{...job}].map((job) => {
    const schoolId = job?.school?.sch_id
    const schoolName = job.school?.sch_name.split(' ')
    const schoolAcro = schoolName?.map(el => el[0]?.toUpperCase())

    // Initialize or increment the job index for the school
    const jobIndex = (schoolIndexMap2.get(schoolId!) || 0) + 1
    schoolIndexMap2.set(schoolId!, jobIndex)

    // Format the job tag
    const datePart = job?.createdAt?.toISOString().slice(2, 10).replace(/-/g, '') // e.g., 08092024
    const idxPart = jobIndex.toString().padStart(2, '0') // Pad index with leading zero if needed

    const tag = `${datePart}-${schoolAcro?.join('').slice(0, 3)}-${idxPart}`

    return {
      ...job,
      tag,
      idx: jobIndex
    }
  })

  

  const related = await db.job.findMany({
    where: {
      active: true,
      job_id: {
        not: {
          equals: req.query.jobId as string,
        },
      },
      school: {
        sch_verified: 1,
        OR: [
          {
            sch_city: job?.school.sch_city,
          },
          {
            sch_state: job?.school.sch_state,
          },
        ],
      },
    },
    select: selected,
  })

    // Group by school and calculate the index for each job
    const schoolIndexMap = new Map<string, number>()
    const relatedWithTag = related.map((job) => {
      const schoolId = job.school.sch_id
      const schoolName = job.school.sch_name.split(' ')
      const schoolAcro = schoolName.map(el => el[0]?.toUpperCase())
  
      // Initialize or increment the job index for the school
      const jobIndex = (schoolIndexMap.get(schoolId) || 0) + 1
      schoolIndexMap.set(schoolId, jobIndex)
  
      // Format the job tag
      const datePart = job.createdAt.toISOString().slice(2, 10).replace(/-/g, '') // e.g., 08092024
      const idxPart = jobIndex.toString().padStart(2, '0') // Pad index with leading zero if needed
  
      const tag = `${datePart}-${schoolAcro.join('').slice(0, 2)}-${idxPart}`
  
      return {
        ...job,
        tag,
        idx: jobIndex
      }
    })

  res.status(200).json({
    message: 'Succesful',
    job: jobWithTag[0] as unknown as IJobSchDb,
    relatedJob: related?.length ? relatedWithTag : [],
  })
}
