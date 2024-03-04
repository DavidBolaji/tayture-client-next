import db from '@/db/db'
import { getUserById } from '@/lib/services/user'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ISchDb } from '../types'
import { v4 as uuid } from 'uuid'
type Data = {
  message: string
  school?: ISchDb
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  const xUser = await getUserById(req.body.schUserId)

  if (
    !xUser?.path ||
    !(JSON.parse(xUser.path.replace(/'/g, '"')) as string[]).includes(
      'school admin',
    )
  )
    return res
      .status(401)
      .json({ message: 'Unauthorzed, user is not a school admin' })

  const holder = ['sch_verified', 'sch_admin']
  const keys = Object.keys(req.body)
  const data: any = {}

  keys.forEach((key) => {
    if (!holder.includes(key)) {
      data[key] = req.body[key]
    }
  })

  try {
    const schoolCreate = await db.school.create({
      data: {
        ...data,
      },
    })

    const walletSchId = schoolCreate.sch_id

    const schAdminDataArray = JSON.parse(
      req.body['sch_admin'].replace(/'/g, '"'),
    )

    const schAdmin = db.schoolAdmin.createMany({
      data: schAdminDataArray.map((admin: any) => ({
        sch_admin_id: uuid(),
        schoolId: walletSchId,
        ...admin,
      })),
    })
    const schWallet = db.wallet.create({
      data: {
        walletSchId,
        walletUserId: req.body.schUserId,
      },
    })

    await Promise.all([schAdmin, schWallet])

    res.status(201).json({
      message: 'School Created',
      school: schoolCreate as unknown as ISchDb,
    })
  } catch (error) {
    if ((error as Error).name === 'PrismaClientKnownRequestError') {
      return res.status(400).json({
        message: `An error occured: Client can only create one School`,
      })
    }
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}
