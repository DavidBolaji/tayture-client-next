import db from '@/db/db'
import { sendTextMessage } from '@/lib/services/user'
import verifyToken from '@/middleware/verifyToken'
import type { NextApiRequest, NextApiResponse } from 'next'
import cron from 'node-cron'
const cronitor = require('cronitor')(process.env.NEXT_PUBLIC_CRONITOR_ID)

const monitor = new cronitor.Monitor('job-application-feedback-message')

// Object to store scheduled tasks by userId and jobId
const scheduledTasks: {
  [userId: string]: { [jobId: string]: cron.ScheduledTask }
} = {}

const checkApplicationStatus = async (
  userId: string,
  jobId: string,
  jobTitle?: string,
  userPhone?: string,
  userName?: string,
) => {
  monitor.ping({ state: 'run' })
  try {
    const hiredJob = await db.hired.findMany({
      where: { jobId },
    })

    // If the jobId does not exist in hired, send a message to the user
    if (!hiredJob.length) {
      if (userPhone) {
        sendTextMessage(
          userPhone,
          `Hello ${userName}, we have a lot of applications, and your application for the role of ${jobTitle} is still under review. We will get back to you soon. Thanks for your patience.`,
        )
      }
    } else {
      // If the jobId exists in hired, check if the userId is in the list of hired users
      const hiredUser = await db.hired.findFirst({
        where: {
          jobId,
          userId,
        },
      })

      // If the userId is found in the list of hired users, cancel the cron job for that user
      if (hiredUser) {
        if (scheduledTasks[userId] && scheduledTasks[userId][jobId]) {
          scheduledTasks[userId][jobId].stop()
          delete scheduledTasks[userId][jobId]
        }
      } else {
        // If the userId is not found, send a rejection message to the user
        if (userPhone) {
          sendTextMessage(
            userPhone,
            `Hello, thank you for your application for the role of ${jobTitle}. We regret to inform you that you have not been selected for the position. Best of luck with your job search.`,
          )
        }

        scheduledTasks[userId][jobId].stop()
        delete scheduledTasks[userId][jobId]
      }
    }
    monitor.ping({ state: 'complete' })
  } catch (error) {
    monitor.ping({ state: 'fail' })
    console.log('[CHECK_APPLICATION_STATUS]', (error as Error).message)
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  const { qual, exp, schoolId, cv, jobId } = req.body
  if (!qual || !exp || !schoolId || !jobId)
    return res
      .status(400)
      .json({ message: 'Validation error all fields are required' })

  try {
    const jobs = await db.job.findUnique({
      where: {
        job_id: jobId,
      },
    })

    const applied = await db.applied.create({
      data: {
        exp,
        qual,
        schoolId,
        cv: cv ? cv : undefined,
        userId: req.authUser!.id,
        jobId,
      },
    })

    if (req.authUser?.phone) {
      sendTextMessage(
        req.authUser?.phone,
        `Hello ${req.authUser.fname}, you have successfully applied for the role of ${jobs?.job_title}. Your application is under review and we will get back to you soon. Meanwhile, you can check the platform and apply to other jobs. Thanks`,
      )
    }

    // Schedule a cron job to check the application status every 2 weeks
    if (!scheduledTasks[req.authUser!.id]) {
      scheduledTasks[req.authUser!.id] = {}
    }

    if (scheduledTasks[req.authUser!.id][jobId]) {
      scheduledTasks[req.authUser!.id][jobId].stop()
    }

    //'0 0 */14 * *' 2weeks
    //'*/2 * * * *' 2 minutes

    scheduledTasks[req.authUser!.id][jobId] = cron.schedule(
      '*/2 * * * *',
      async () => {
        await checkApplicationStatus(
          req.authUser!.id,
          jobId,
          jobs?.job_title,
          req.authUser?.phone,
          req.authUser?.fname,
        )
      },
    )

    return res.status(200).json({
      message: 'Application successful',
      applied,
    })
  } catch (error) {
    console.log('[APPLY_POST]', (error as Error).message)
    res.status(400).json({
      message: `An error occurred: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
