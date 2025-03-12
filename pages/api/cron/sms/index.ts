import type { NextApiRequest, NextApiResponse } from 'next'
import { subDays, startOfDay, endOfDay } from 'date-fns'
import axios from 'axios'

const url =
  process.env.NEXT_PUBLIC_ENV === 'prod'
    ? process.env.NEXT_PUBLIC_PROD
    : process.env.NEXT_PUBLIC_DEV

const sendTextMessage = async (phone: string, msg: string) => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_TERMII_URL}/sms/send`,
      {
        api_key: process.env.NEXT_PUBLIC_TERMII_API_KEY,
        to: phone.replace('+', ''),
        from: 'Tayture',
        sms: msg,
        type: 'plain',
        channel: 'generic',
      },
    )
    console.log('SMS sent successfully')
    return result.data
  } catch (error) {
    console.error('Error sending SMS:', (error as Error).message)
  }
}

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
      await Promise.all(
        users.data.user.map((user: any) =>
          sendTextMessage(
            user.phone,
            `Hello ${user.fname}, hope you're having a great day! New jobs, including "${jobs.data.jobs[0].job_title}", have been added to the Tayture platform. Visit https://tayture.com/jobs to apply.`,
          ),
        ),
      )
    }

    return res.status(200).json({
      message: 'Successful',
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error })
  }
}

console.log('Cron job setup to run every Friday at 7:00 PM')
