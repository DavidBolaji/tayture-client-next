import db from '@/db/db'
import { getUserById } from '@/lib/services/user'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ISchDb } from '../types'
import { v4 as uuid } from 'uuid'
import { appendSchoolIdToEmail, createDVA, formatNumber } from '@/utils/helpers'
import axios from 'axios'
import sendSchoolCreated from '@/mail/sendSchoolCreated'
import { logger } from '@/middleware/logger'

let secret = process.env.JELO_SECRET;
let url =
  process.env.NEXT_PUBLIC_ENV === 'prod'
    ? process.env.JELO_API_LIVE
    : process.env.JELO_API_DEV


type Data = {
  message: string
  school?: ISchDb
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const xUser = await getUserById(req.body.schUserId)

  if (
    !xUser?.path ||
    !(JSON.parse(xUser?.path?.replace(/'/g, '"')) as string[]).includes(
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
    if (!holder.includes(key)) data[key] = req.body[key]
  })

  try {
    // === 1. DB operations only ===
    const sch = await db.$transaction(async (tx) => {
      const schoolCreate = await tx.school.create({
        data: {
          ...data,
        },
      })

      const walletSchId = schoolCreate.sch_id

      const schAdminDataArray = JSON.parse(req.body['sch_admin'].replace(/'/g, '"'))

      await tx.schoolAdmin.createMany({
        data: schAdminDataArray.map((admin: any) => ({
          sch_admin_id: uuid(),
          schoolId: walletSchId,
          ...admin,
        })),
      })

      await tx.wallet.create({
        data: {
          walletSchId,
          wallet_balance: 4000,
          walletUserId: xUser.id || '',
        },
      })

      await tx.transaction.create({
        data: {
          amount: 4000,
          type: 'BONUS',
          message: `School Creation Bonus of ₦ ${formatNumber(4000, 'NGN', {})}`,
          userId: xUser?.id || '',
          schoolId: walletSchId,
        },
      })

      await tx.notifcation.create({
        data: {
          msg: `Hurray!!! you have succesfully created a school`,
          notificationUser: xUser?.id as string,
          caption: 'School created',
        },
      })

      return schoolCreate
    })

    // === 2. External calls (after commit) ===
    const walletSchId = sch.sch_id
    const email = appendSchoolIdToEmail(req.authUser?.email || '', walletSchId)

    // fire & forget or await depending on importance
    const createOrg = axios.post(
      `${url}/signup`,
      {
        email,
        password: walletSchId,
        fname: xUser?.fname,
        lname: xUser?.lname,
        phone: `${xUser?.phone}_${walletSchId}`,
        name: sch.sch_name,
        schId: walletSchId,
      },
      { headers: { Authorization: `Bearer ${secret}` } },
    )

    const dAccount = createDVA(
      walletSchId,
      req.authUser?.id || '',
      sch.sch_name,
      email,
      xUser?.phone || '',
    )

    sendSchoolCreated({
      user: `${xUser?.fname} ${req.authUser?.lname}`,
      school: sch.sch_name,
    })

    // don’t block main response on these if not critical
    await Promise.allSettled([createOrg, dAccount])

    return res.status(200).json({
      message: 'School Created',
      school: sch as unknown as ISchDb,
    })
  } catch (error) {
    logger.error(error)
    if ((error as Error).name === 'PrismaClientKnownRequestError') {
      return res.status(400).json({
        message: `An error occurred: Client can only create one School`,
      })
    }
    res.status(400).json({ message: `An error occurred: ${(error as Error).message}` })
  }
}
