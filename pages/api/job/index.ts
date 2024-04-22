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
  let job;

  if(req.query.title) {
    job = await db.job.findMany({
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
            sch_city: true,
            sch_state: true,
            sch_lga: true,
            sch_address: true,
          },
        },
        applied: true,
      },
    })

  } else {
   job = await db.job.findMany({
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
          sch_city: true,
          sch_state: true,
          sch_lga: true,
          sch_address: true,
        },
      },
      applied: true,
    },
   })
  }


  return res
    .status(200)
    .json({ message: 'Succesful', job: job as unknown as IJobSchDb[] })
}
