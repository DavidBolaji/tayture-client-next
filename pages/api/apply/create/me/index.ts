import db from '@/db/db'
import { sendTextMessage } from '@/lib/services/user'
import sendAppliedEmail from '@/mail/sendAppliedEmail'
import verifyToken from '@/middleware/verifyToken'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import cron from 'node-cron'

export const calculateSubmittedAt = (
  currentDate: Date,
  expiryDays: number
): Date => {
  const result = new Date(currentDate);
  result.setDate(result.getDate() + expiryDays);
  return result;
};

const isProd = process.env.NEXT_PUBLIC_ENV === 'prod';

let url =
  isProd
    ? process.env.JELO_API_LIVE
    : process.env.JELO_API_DEV

let baseUrl =
  isProd
    ? "https://jelo.live"
    : "http://localhost:3000"

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
  // check route
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  // validate field
  const { qual, exp, schoolId, cv, jobId, userId, assessmentId } = req.body
  if (!qual || !exp || !schoolId || !jobId)
    return res
      .status(400)
      .json({ message: 'Validation error all fields are required' })



  try {
    // check if already applied
    const isAppliedReq = db.applied.findMany({
      where: {
        AND: [
          {
            jobId: jobId,
          },
          {
            userId: !userId ? req.authUser?.id : userId,
          },
        ],
      },
    })

    const jobsReq = db.job.findUnique({
      where: {
        job_id: jobId,
      },
    })

    const [isApplied, jobs] = await Promise.all([isAppliedReq, jobsReq])

    if (isApplied.length) {
      return res.status(200).json({
        message: 'User Applied Already',
        applied: isApplied[0],
      })
    }
    const applied = await db.applied.create({
      data: {
        exp,
        qual,
        schoolId,
        cv: cv ? cv : undefined,
        userId: !userId ? req.authUser?.id : userId,
        jobId,
      },
    })

    if (!userId && req.authUser?.phone) {
      if (isProd) {
        sendTextMessage(
          req.authUser?.phone,
          `Hello ${req.authUser.fname}, you have successfully applied for the role of ${jobs?.job_title}. ${assessmentId ? 'An assessment invitation will be sent to your email by Jelo, please complete it to proceed.' : 'Your application is under review and we will get back to you soon. '} Thanks`,
        )
      }
    }

    if (assessmentId) {

      const assessment = await axios.get(
        `${url}/assesement/${assessmentId}/tayture`,
        { headers: { Authorization: `Bearer api_live_${schoolId}` } },
      )

      const token = `${assessment.data.id}-${Date.now()}`;
      const [, curTime] = token.split("-");
      const currentDate = new Date(Number(curTime));
      const assessmentLink = `${baseUrl}/candidate/${token}`;

      await axios.post(
        `${url}/mail`,
        {
          content: "You are invited to take the assessment. Please complete it before the deadline.",
          type: "invitation",
          email: req.authUser?.email,
          firstName: req.authUser?.fname,
          lastName: req.authUser?.lname,
          title: assessment.data.title,
          estimatedTime: assessment.data.hasDuration ? `${assessment.data.duration} minute(s)` : "None",
          questionCount: assessment.data.questions.length,
          expiryDays: 7,
          assessmentLink,
          assessmentId,
          token,
          submittedAt: calculateSubmittedAt(currentDate, 7),
        },
        { headers: { Authorization: `Bearer api_live_${schoolId}` } },
      )
    }


    // Schedule a cron job to check the application status every 2 weeks
    if (!scheduledTasks[!userId ? req.authUser?.id : userId]) {
      scheduledTasks[!userId ? req.authUser?.id : userId] = {}
    }

    if (scheduledTasks[!userId ? req.authUser?.id : userId][jobId]) {
      scheduledTasks[!userId ? req.authUser?.id : userId][jobId].stop()
    }

    const school = await db.school.findUnique({
      where: { sch_id: applied.schoolId },
      select: { user: { select: { email: true } } },
    })

    await sendAppliedEmail({ email: school?.user?.email as string })

    //'0 0 */14 * *' 2weeks
    //'*/2 * * * *' 2 minutes

    scheduledTasks[!userId ? req.authUser?.id : userId][jobId] = cron.schedule(
      '0 0 */14 * *',
      async () => {
        await checkApplicationStatus(
          !userId ? req.authUser?.id : userId,
          jobId,
          jobs?.job_title,
          req.authUser?.phone,
          req.authUser?.fname,
        )
      },
    )

    return res.status(200).json({
      message: assessmentId
        ? 'Your application has been received. An assessment invitation will be sent to your email by Jelo. Kindly note that your eligibility for this role depends on completing the assessment.'
        : 'Your application has been received successfully.',
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
