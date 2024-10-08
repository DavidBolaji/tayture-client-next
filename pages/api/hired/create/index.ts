import db from '@/db/db'
import { sendTextMessage } from '@/lib/services/user'
import sendHireTayture from '@/mail/sendHireTayture'
import sendHireUser from '@/mail/sendHireUser'
import verifyToken from '@/middleware/verifyToken'
import { AMOUNT_PER_HIRE, formatNumber } from '@/utils/helpers'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

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

      const r = tx.wallet.update({
        where: {
          walletUserId: req.authUser?.id,
          walletSchId: req.authUser!.school[+req.body.defaultSchool]
            .sch_id as unknown as string,
        },
        data: {
          wallet_locked_balance: {
            decrement: AMOUNT_PER_HIRE,
          },
        },
      })

      const v = tx.transaction.create({
        data: {
          type: 'DEBIT',
          amount: AMOUNT_PER_HIRE,
          userId: req.authUser!.id,
          message: `Succesful Hiring of ${req.body['role']} at ₦${formatNumber(
            AMOUNT_PER_HIRE,
            'NGN',
            {},
          )}`,
          schoolId: h.job.school.sch_id,
        },
      })

      await Promise.all([r, v])
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
        `Hello ${jobCreate.job.school.user.fname}, This message is to inform you that you have succesfully hired for the role of ${jobCreate.job.job_title} at ${jobCreate.job.school.sch_name}.`,
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
