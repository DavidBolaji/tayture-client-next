import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import type { NextApiRequest, NextApiResponse } from 'next'

import { v4 as uuid } from 'uuid'
import { ISchDb } from '../../types'
import sendSchoolCreated from '@/mail/sendSchoolCreated'
import { appendSchoolIdToEmail, createDVA, formatNumber } from '@/utils/helpers'
import { logger } from '@/middleware/logger'
import axios from 'axios'

let secret = process.env.JELO_SECRET;
let url =
  process.env.NEXT_PUBLIC_ENV === 'prod'
    ? process.env.JELO_API_LIVE
    : process.env.JELO_API_DEV

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  if (
    !req.authUser?.path ||
    !(JSON.parse(req.authUser.path.replace(/'/g, '"')) as string[]).includes('school admin')
  ) {
    return res.status(401).json({ message: 'Unauthorized, user is not a school admin' })
  }

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
          schUserId: req?.authUser?.id,
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
          walletUserId: req.authUser?.id || '',
        },
      })

      await tx.transaction.create({
        data: {
          amount: 4000,
          type: 'BONUS',
          message: `School Creation Bonus of ₦ ${formatNumber(4000, 'NGN', {})}`,
          userId: req.authUser?.id || '',
          schoolId: walletSchId,
        },
      })

      await tx.notifcation.create({
        data: {
          msg: `Hurray!!! you have succesfully created a school`,
          notificationUser: req.authUser?.id as string,
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
        fname: req.authUser?.fname,
        lname: req.authUser?.lname,
        phone: `${req.authUser?.phone}_${walletSchId}`,
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
      req.authUser?.phone || '',
    )

    sendSchoolCreated({
      user: `${req.authUser?.fname} ${req.authUser?.lname}`,
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

export default verifyToken(handler)
