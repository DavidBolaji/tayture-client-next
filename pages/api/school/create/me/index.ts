import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import type { NextApiRequest, NextApiResponse } from 'next'

import { v4 as uuid } from 'uuid'
import { ISchDb } from '../../types'
import sendSchoolCreated from '@/mail/sendSchoolCreated'
type Data = {
  message: string
  school?: ISchDb
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  if (
    !req.authUser?.path ||
    !(JSON.parse(req.authUser.path.replace(/'/g, '"')) as string[]).includes(
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
        schUserId: req.authUser.id,
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
        walletUserId: req.authUser.id,
      },
    })

    await Promise.all([schAdmin, schWallet])
    await db.notifcation.create({
      data: {
        msg: `Hurray!!! you have succesfully created a school`,
        notificationUser: req.authUser?.id as string,
        caption: "Job created"
      }
    })
    
    sendSchoolCreated({
      user: `${req.authUser.fname} ${req.authUser.lname}`,
      school: schoolCreate.sch_name
    })

    return res.status(200).json({
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

export default verifyToken(handler)
