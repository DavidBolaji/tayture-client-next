import type { NextApiRequest, NextApiResponse } from 'next'
import { subDays, startOfDay, endOfDay } from 'date-fns'
import axios from 'axios'
import { User } from '@prisma/client'
import sendPromptMail from '@/mail/sendPrompt'

const url =
  process.env.NEXT_PUBLIC_ENV === 'prod'
    ? process.env.NEXT_PUBLIC_PROD
    : process.env.NEXT_PUBLIC_DEV

// Function to introduce a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  const oneWeekAgo = startOfDay(subDays(new Date(), 8))
  const today = endOfDay(new Date())

  try {
    const reqJob = axios.post(`${url}/mail-job/mail`, { oneWeekAgo, today })
    const reqUser = axios.get(`${url}/users/all`)
    const [jobs, users] = await Promise.all([reqJob, reqUser])

    if (jobs.data.jobs.length > 0) {
      for (const user of users.data.user as Pick<
        User,
        'email' | 'fname' | 'phone'
      >[]) {
        await sendPromptMail({
          email: user.email,
          firstName: user.fname,
          job: jobs.data.jobs[0].job_title,
        })

        console.log(`Email sent to: ${user.email}`)

        // Wait for 1 minute before sending the next email
        await delay(60000)
      }
    }

    return res.status(200).json({
      message: 'Emails sent successfully with 1-minute intervals.',
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error })
  }
}
