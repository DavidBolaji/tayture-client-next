import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import verifyToken from '@/middleware/verifyToken'
import { ISchDb } from '../../types'
import { v4 as uuid } from 'uuid'
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
    'sch_phone',
    'sch_admin',
  ]

  const keys = Object.keys(req.body)
  const hasSchoolAdmin = keys.includes('sch_admin')
  const data: any = {}

  keys.forEach((key) => {
    if (!holder.includes(key) || !(req.authUser!.role !== 'ADMIN')) {
      data[key] = req.body[key]
    }
  })

  const school = await db.school.update({
    where: {
      schUserId: req.authUser!.id,
    },
    data: { ...data },
  })

  if (hasSchoolAdmin) {
    const schAdminDataArray = JSON.parse(
      req.body['sch_admin'].replace(/'/g, '"'),
    )

    await db.schoolAdmin.deleteMany({
      where: {
        schoolId: school.sch_id,
      },
    })
    await db.schoolAdmin.createMany({
      data: schAdminDataArray.map((admin: any) => ({
        sch_admin_id: uuid(),
        schoolId: school.sch_id,
        ...admin,
      })),
    })
  }
  return res
    .status(200)
    .json({ message: 'School Updated', school: school as unknown as ISchDb })
}

export default verifyToken(handler)
