import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import verifyToken from '@/middleware/verifyToken'
import { SchoolAdmin } from '@prisma/client'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })

  const holder = [
    'sch_admin_active',
    'sch_admin_email',
    'sch_admin_phone',
    'sch_admin_name',
  ]

  const keys = Object.keys(req.body)
  const data: any = {}

  keys.forEach((key) => {
    if (holder.includes(key)) {
      data[key] = req.body[key]
    }
  })

  const schoolAdmin = await db.schoolAdmin.update({
    where: {
      sch_admin_id: req.query.adminId as string,
    },
    data: { ...data },
  })
  return res
    .status(200)
    .json({ message: 'School Admin Updated', schoolAdmin: schoolAdmin as unknown as SchoolAdmin })
}

export default verifyToken(handler)
