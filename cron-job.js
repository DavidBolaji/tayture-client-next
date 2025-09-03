const cron = require('node-cron')
const dat = require('date-fns')
const axios = require('axios')
const cronitor = require('cronitor')(process.env.NEXT_PUBLIC_CRONITOR_ID)

const url =
  process.env.NEXT_PUBLIC_ENV === 'prod'
    ? process.env.NEXT_PUBLIC_PROD
    : process.env.NEXT_PUBLIC_DEV

console.log(`Using URL: ${url}`)

const sendTextMessage = async (phone, msg) => {
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
    console.error('Error sending SMS:', error.message)
  }
}

const monitor = new cronitor.Monitor('job-application-message')

// '*/2 * * * *'
// '0 20 * * 5'
// weekly sms for available jobs
cron.schedule('0 20 * * 5', async () => {
 if (process.env.NEXT_PUBLIC_RUN_CRONITOR === "true") {
  monitor.ping({ state: 'run' })
  const { subDays, startOfDay, endOfDay } = dat

  const oneWeekAgo = startOfDay(subDays(new Date(), 8))
  const today = endOfDay(new Date())

  try {
    const reqJob = axios.post(`${url}/mail-job/mail`, { oneWeekAgo, today })
    const reqUser = axios.get(`${url}/users/all`)
    const [jobs, users] = await Promise.all([reqJob, reqUser])


    if (jobs.data.jobs.length > 0) {
      await Promise.all(
        users.data.user.map((user) =>
          sendTextMessage(
            user.phone,
            `Hello ${user.fname}, new and exciting jobs have been posted on Tayture. Be the first to apply, https://tayture.com/jobs.`,
          ),
        ),
      )
    }
    
    monitor.ping({ state: 'complete' })
  } catch (error) {
    monitor.ping({ state: 'fail', message: error.message })
    console.error('Error in cron job:', error.message)
  }
 }
})

console.log('Cron job setup to run every Friday at 8:00 PM')
