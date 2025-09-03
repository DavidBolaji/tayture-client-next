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

  const holderAdmin = [
    'sch_verified',
    'sch_name',
    'sch_address',
    'sch_state',
    'sch_city',
    'sch_lga',
    'sch_phone',
    'sch_logo',
    'active',
    'landmark',
    'country'
  ]

  const holderUser = ['sch_logo', 'sch_name', 'sch_phone']
  const id = req.body.sch_id;

  const keys = Object.keys(req.body)

  const hasSchoolAdmin = keys.includes('sch_admin')
  const data: any = {}

  keys.forEach((key) => {
    if (req.authUser!.role === 'SUPER_ADMIN') {
      if (holderAdmin.includes(key)) {
        data[key] = req.body[key]
      }
    } else {
      if (holderUser.includes(key)) {
        data[key] = req.body[key]
      }
    }
  })

  try {
    const school = await db.school.update({
      where: {
        sch_id: req.authUser?.role === "SUPER_ADMIN" ? id : req.authUser!.school[+req.query.defaultSchool!].sch_id,
      },
      data: { ...data },
    })

    if (hasSchoolAdmin) {
      const schAdminDataArray = JSON.parse(
        req.body['sch_admin']?.replace(/'/g, '"'),
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
  } catch (error) {
    console.error('Error updating school:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export default verifyToken(handler)
