import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IJobSchDb } from './types'

type Data = {
  message: string
  job?: IJobSchDb[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })
  let jobs;

  if(req.query.title) {
    jobs = await db.job.findMany({
      where: {
        job_title: {
          contains: (req.query.title as string).toLowerCase(),
        },
        school: {
          sch_verified: 1,
        },
        active: true
      },
      select: {
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
      },
    })

  } else {
   jobs = await db.job.findMany({
    where: {
      school: {
        sch_verified: 1,
      },
      active: true
    },
    select: {
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
    },
   })
  }

    // Group by school and calculate the index for each job
    const schoolIndexMap = new Map<string, number>()
    const jobsWithTag = jobs.map((job) => {
      const schoolId = job.school.sch_id
      const schoolName = job.school.sch_name.split(' ')
      const schoolAcro = schoolName.map(el => el[0]?.toUpperCase())
  
  
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
        idx: jobIndex
      }
    })


  return res
    .status(200)
    .json({ message: 'Succesful', job: jobsWithTag as unknown as IJobSchDb[] })
}
