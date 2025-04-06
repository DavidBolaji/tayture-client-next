import db from '@/db/db'
import { sendTextMessage } from '@/lib/services/user'
import sendHireTayture from '@/mail/sendHireTayture'
import sendHireUser from '@/mail/sendHireUser'
import verifyToken from '@/middleware/verifyToken'
import { AMOUNT_PER_HIRE, formatNumber } from '@/utils/helpers'
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY
const PAYSTACK_SECRET_KEY_PROD = process.env.PAYSTACK_SECRET_KEY_PROD
const isProd = process.env.NEXT_PUBLIC_ENV === 'prod'
const url = isProd ? '' : process.env.NEXT_PUBLIC_DEV
const key = isProd ? PAYSTACK_SECRET_KEY_PROD : PAYSTACK_SECRET_KEY

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  const schoolId = req.authUser!.school[+req.body.defaultSchool]
    .sch_id as unknown as string

  try {
    const jobCreate = await db.$transaction(async (tx) => {
      const h = await tx.hired.create({
        data: {
          userId: req.body.userId,
          jobId: req.body.jobId,
        },
        select: {
          job: {
            select: {
              job_title: true,
              hired: {
                select: {
                  userId: true,
                },
              },
              school: {
                select: {
                  sch_name: true,
                  sch_id: true,
                  user: {
                    select: {
                      fname: true,
                      email: true,
                      phone: true,
                    },
                  },
                },
              },
            },
          },
        },
      })

      // const balance = await getDVABalance(req.body.customer)
      await axios.post(`${url}/transfer`, {
        amount: AMOUNT_PER_HIRE,
        reason: 'Hire completed',
        schoolId,
        jobId: req.body.jobId,
        userId: req.body.userId,
        customerId: req.body.customer,
        role: req.body['role'],
      })

      return h
    })

    if (process.env.NEXT_PUBLIC_ENV === 'prod') {
      await db.notifcation.create({
        data: {
          msg: `Hurray!!! you have been Hired `,
          notificationUser: req.body.userId as string,
          caption: 'Job Hire',
        },
      })
    }

    await db.notifcation.create({
      data: {
        msg: `Hurray!!! you have succesfully Hired `,
        notificationUser: req.authUser?.id as string,
        caption: 'Hire Completed',
      },
    })

    sendHireTayture({
      job_title: jobCreate.job.job_title,
      school: jobCreate.job.school.sch_name as string,
    })

    if (process.env.NEXT_PUBLIC_ENV === 'prod') {
      sendHireUser({
        job_title: jobCreate.job.job_title,
        school: jobCreate.job.school.sch_name as string,
        firstName: jobCreate.job.school.user.fname,
        email: jobCreate.job.school.user.email,
      })
    }

    if (process.env.NEXT_PUBLIC_ENV === 'prod') {
      sendTextMessage(
        jobCreate.job.school.user.phone as string,
        `Hello ${jobCreate.job.school.user.fname}, This message is to inform you that you have succesfully hired for the role of ${jobCreate.job.job_title} at ${jobCreate.job.school.sch_name}.`
      )
    }

    res.status(201).json({
      message: 'Job status updated',
      job: jobCreate,
    })
  } catch (error) {
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
