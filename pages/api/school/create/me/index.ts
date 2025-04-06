import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import type { NextApiRequest, NextApiResponse } from 'next'

import { v4 as uuid } from 'uuid'
import { ISchDb } from '../../types'
import sendSchoolCreated from '@/mail/sendSchoolCreated'
import { appendSchoolIdToEmail, createDVA, formatNumber } from '@/utils/helpers'
import { logger } from '@/middleware/logger'
type Data = {
  message: string
  school?: ISchDb
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  console.log('STARTED')

  if (
    !req.authUser?.path ||
    !(JSON.parse(req.authUser.path.replace(/'/g, '"')) as string[]).includes(
      'school admin',
    )
  )
    return res
      .status(401)
      .json({ message: 'Unauthorzed, user is not a school admin' })

  console.log('IS SCHOOL ADMIN')

  const holder = ['sch_verified', 'sch_admin']
  const keys = Object.keys(req.body)
  const data: any = {}

  keys.forEach((key) => {
    if (!holder.includes(key)) {
      data[key] = req.body[key]
    }
  })

  try {
    // create school
    const sch = await db.$transaction(async (tx) => {
      const schoolCreate = await tx.school.create({
        data: {
          ...data,
          schUserId: req?.authUser?.id,
        },
      })

      logger.info('SCHOOL CREATED', schoolCreate.sch_id)

      const walletSchId = schoolCreate.sch_id

      const schAdminDataArray = JSON.parse(
        req.body['sch_admin'].replace(/'/g, '"'),
      )

      // create school admin
      const schAdmin = tx.schoolAdmin.createMany({
        data: schAdminDataArray.map((admin: any) => ({
          sch_admin_id: uuid(),
          schoolId: walletSchId,
          ...admin,
        })),
      })

      logger.info('SCHOOL ADMIN CREATED')
      // create school wallet
      const schWallet = tx.wallet.create({
        data: {
          walletSchId,
          wallet_balance: 4000,
          walletUserId: req.authUser?.id || '',
        },
      })

      logger.info('SCHOOL WALLET')

      logger.info('Email data', req.authUser?.email || '', walletSchId)
      // create unique email
      const email = appendSchoolIdToEmail(
        req.authUser?.email || '',
        walletSchId,
      )

      logger.info('NEW MAIL', email)
      // create dedicated virtual account paystack

      await Promise.all([schAdmin, schWallet])

      const dAccount = await createDVA(
        walletSchId,
        req.authUser?.id || '',
        schoolCreate.sch_name,
        email,
        req.authUser?.phone || '',
      )

      logger.info(`DVA ${dAccount.data}`)

      await tx.transaction.create({
        data: {
          amount: 4000,
          type: 'BONUS',
          message: `School Creation Bonus of ₦ ${formatNumber(
            4000,
            'NGN',
            {},
          )}`,
          userId: req.authUser?.id || '',
          schoolId: schoolCreate.sch_id,
        },
      })

      logger.info('CREATED TRANSACTION')

      tx.notifcation.create({
        data: {
          msg: `Hurray!!! you have succesfully created a school`,
          notificationUser: req.authUser?.id as string,
          caption: 'School created',
        },
      })

      logger.info('CREATED TRANSACTION')
      sendSchoolCreated({
        user: `${req.authUser?.fname} ${req.authUser?.lname}`,
        school: schoolCreate.sch_name,
      })

      return schoolCreate
    })

    return res.status(200).json({
      message: 'School Created',
      school: sch as unknown as ISchDb,
    })
  } catch (error) {
    logger.error(error)
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
