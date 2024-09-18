import db from '@/db/db'
import sendScheduleMail from '@/mail/sendScheduleMail'
import verifyToken from '@/middleware/verifyToken'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid'
import moment from 'moment-timezone'
import sendRemainderMail from '@/mail/sendRemainderMail'
import nodeCron from 'node-cron'

// Object to store scheduled tasks by userId
const scheduledTasks: { [userId: string]: nodeCron.ScheduledTask } = {}

// Handler for scheduling tasks
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Check if the request method is POST
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  // Define required fields for validation
  const holder = [
    'instruction',
    'email',
    'fname',
    'sch_name',
    'job_title',
    'date',
    'time',
    'scheduleId',
    'country'
  ]

  // Extract the fields from the request body
  const keys = Object.keys(req.body)
  const data: any = {}
  keys.forEach((key) => {
    if (!holder.includes(key)) {
      data[key] = req.body[key]
    }
  })

  // Parse the target date and time
  const targetDateTime = moment.tz(
    `${req.body['time']} ${req.body['date']}`,
    'Africa/Lagos',
  )
  const date = targetDateTime.toDate()

  try {
    // Upsert the schedule in the database
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

    // Increment the number of scheduled jobs
    await db.job.update({
      where: {
        job_id: req.body['jobId'],
      },
      data: {
        noScheduled: {
          increment: 1,
        },
      },
    })

    const scheduleId = result.id

    // Delete previous instructions for the schedule
    await db.instruction.deleteMany({
      where: {
        scheduleId: req.body['scheduleId'],
      },
    })

    // Create new instructions if they exist
    if (req.body['instruction'][0]?.text?.trim()?.length > 1) {
      await db.instruction.createMany({
        data: req.body['instruction'].map((instruction: any) => ({
          id: uuid(),
          scheduleId,
          ...instruction,
        })),
      })
    }

    // Create notifications
    const notificationUser = req.authUser?.id as string
    const note1 = db.notifcation.create({
      data: {
        msg: 'Hurray!!! you have successfully created a schedule',
        notificationUser,
        caption: 'Schedule created',
      },
    })
    const note2 = db.notifcation.create({
      data: {
        msg: 'Hurray!!! you have successfully been scheduled for a job',
        notificationUser: req.body['userId'] as string,
        caption: 'Job Schedule',
      },
    })

    await Promise.all([note1, note2])

    // Send schedule mail to the user
    if (process.env.NEXT_PUBLIC_ENV === 'prod') {
      sendScheduleMail({
        email: req.body['email'],
        firstName: req.body['fname'],
        company: req.body['sch_name']!,
        job_title: req.body['job_title'],
        link: `${process.env.NEXT_PUBLIC_FRONTEND_API}dashboard/jobs/all`,
      })
    }
    // Schedule a reminder email if required
    if (req.body['remainder']) {
      const targetDateTime = moment
        .tz(`${req.body['time']} ${req.body['date']}`, 'Africa/Lagos')
        .subtract(90, 'minutes')

      // Cancel previous scheduled task for this user if it exists
      if (scheduledTasks[req.authUser!.id]) {
        scheduledTasks[req.authUser!.id].stop()
      }

      // Schedule a new task to send a reminder email
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
    console.error('[SCHEDULE_CREATE_ERROR]', (error as Error).message)
    return res.status(400).json({
      message: `An error occurred: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
