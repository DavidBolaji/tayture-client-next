import db from '@/db/db'
import verifyToken2 from '@/middleware/verifyToken2'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  job?: any
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  if(typeof req.authUser!.school[+req.query.defaultSchool!]?.sch_id === "undefined") {
    return res.status(200).json({
      message: `Succesful`,
      job: [],
    })
  }


  try {
    const job = await db.job.findMany({
      where: {
        // jobUserzId: req.authUser!.id,
        school: {
          sch_id: req.authUser!.school[+req.query.defaultSchool!].sch_id
        }
      },
      include: {
        applied: true,
        matched: true,
        viewed: true,
        hired: true
      },
    })

    return res.status(200).json({
      message: 'Job Created',
      job: job,
    })
  } catch (error) {
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken2(handler)
