import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ISchDb } from '../types'
import verifyToken from '@/middleware/verifyToken'

type Data = {
  message: string
  school?: Partial<ISchDb>
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })

  const holder = [
    'sch_verified',
    'sch_name',
    'sch_address',
    'sch_state',
    'sch_city',
    'sch_lga',
    'sch_logo',
  ]

  const keys = Object.keys(req.body)
  const data: any = {}

  keys.forEach((key) => {
    if (!holder.includes(key) || !(req.authUser!.role !== 'ADMIN')) {
      data[key] = req.body[key]
    }
  })

  const school = await db.school.update({
    where: {
      sch_id: req.query.schId as string,
    },
    data: { ...data },
  })
  return res
    .status(200)
    .json({ message: 'School Updated', school: school as unknown as ISchDb })
}

export default verifyToken(handler)
