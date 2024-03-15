import db from '@/db/db'
import sendScheduleMail from '@/mail/sendScheduleMail'
import verifyToken from '@/middleware/verifyToken'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid'
import moment from 'moment-timezone'
import sendRemainderMail from '@/mail/sendRemainderMail'
import nodeCron from 'node-cron'

const scheduledTasks: { [userId: string]: nodeCron.ScheduledTask } = {}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  const holder = [
    'instruction',
    'email',
    'fname',
    'sch_name',
    'job_title',
    'date',
    'time',
    'scheduleId',
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

  console.log(req.body['scheduleId'])

  const date = targetDateTime.toDate()
  try {
    const result = await db.schedule.upsert({
      where: {
        id: req.body['scheduleId'],
      },
      update: {
        ...data,
        date,
        time: date,
      },
      create: {
        ...data,
        date,
        time: date,
      },
    })

    const scheduleId = result.id

    await db.instruction.deleteMany({
      where: {
        scheduleId: req.body['scheduleId'],
      },
    })

    if (req.body['instruction'][0]?.text?.trim()?.length > 1) {
      await db.instruction.createMany({
        data: req.body['instruction'].map((instruction: any) => ({
          id: uuid(),
          scheduleId,
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

      // Cancel previous scheduled task for this user if it exists
      if (scheduledTasks[req.authUser!.id]) {
        scheduledTasks[req.authUser!.id].stop()
      }

      scheduledTasks[req.authUser!.id] = nodeCron.schedule(
        targetDateTime.format('m H D M d'),
        async () => {
          await sendRemainderMail({
            email: req.authUser!.email,
            user: req.body['fname'],
            firstName: req.authUser!.fname!,
            job_title: req.body['job_title'],
          })
          scheduledTasks[req.authUser!.id].stop()
          delete scheduledTasks[req.authUser!.id]
        },
      )
    }

    return res.status(200).json({
      message: 'Schedule Created',
      schedule: result,
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
