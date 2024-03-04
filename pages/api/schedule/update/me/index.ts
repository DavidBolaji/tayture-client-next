import db from '@/db/db'
import sendScheduleMail from '@/mail/sendScheduleMail'
import verifyToken from '@/middleware/verifyToken'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid'
import moment from 'moment-timezone'
import sendRemainderMail from '@/mail/sendRemainderMail'
import nodeCron from 'node-cron'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })

  const holder = [
    'instruction',
    'email',
    'fname',
    'sch_name',
    'job_title',
    'date',
    'time',
  ]

  const keys = Object.keys(req.body)
  const data: any = {}

  keys.forEach((key) => {
    if (!holder.includes(key)) {
      data[key] = req.body[key]
    }
  })

  const targetDateTime = moment.tz(
    `${req.body['time']} ${req.body['date']}`,
    'Africa/Lagos',
  )

  const date = targetDateTime.toDate()
  try {
    const scheduleCreate = await db.schedule.create({
      data: {
        ...data,
        date,
        time: date,
      },
    })

    const instructionId = scheduleCreate.id

    if (req.body['instruction'][0].text.trim().length > 2) {
      const instruction = db.instruction.createMany({
        data: req.body['instruction'].map((instruction: any) => ({
          id: uuid(),
          instructionId,
          ...instruction,
        })),
      })
    }

    sendScheduleMail({
      email: req.body['email'],
      firstName: req.body['fname'],
      company: req.body['sch_name']!,
      job_title: req.body['job_title'],
      link: 'https://tayture.com/dashboard/jobs/all',
    })
    if (req.body['remainder']) {
      const targetDateTime = moment
        .tz(`${req.body['time']} ${req.body['date']}`, 'Africa/Lagos')
        .subtract(90, 'minutes')

      const task = nodeCron.schedule(
        targetDateTime.format('m H D M d'),
        async () => {
          await sendRemainderMail({
            email: req.authUser!.email,
            user: req.body['fname'],
            firstName: req.authUser!.fname!,
            job_title: req.body['job_title'],
          })

          task.stop()
        },
      )
    }

    return res.status(200).json({
      message: 'Schedule Created',
      schedule: scheduleCreate,
    })
  } catch (error) {
    if ((error as Error).name === 'PrismaClientKnownRequestError') {
      return res.status(400).json({
        message: `An error occured: ${(error as Error).message}`,
      })
    }
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
