import ejs from 'ejs'
import path from 'path'
import transporter from './transporter'

interface ImailOptions {
  from: string
  to: string
  cc?: string[]
  bcc?: string[]
  subject: string
  html: string
}

const sendRemainderMail = async ({
  user,
  firstName,
  job_title,
  email,
}: {
  user: string
  firstName: string
  job_title: string
  email: string
}) => {
  let current = new Date()
  let cDate =
    current.getFullYear() +
    '-' +
    (current.getMonth() + 1) +
    '-' +
    current.getDate()
  let cTime =
    current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds()
  let dateTime = cDate + ' ' + cTime
  const templatePath = path.join(process.cwd(), 'views', 'reminder.ejs')
  const dat = await ejs.renderFile(templatePath, {
    firstName,
    user,
    job_title,
    email,
  })

  const mailOption: ImailOptions = {
    from: 'Tayture <hello@tayture.com>',
    to: email,
    // bcc: ['info@tayture.com'],
    subject: `🌟 Interview Reminder 🌟 <${dateTime}>`,
    html: dat,
  }

  try {
    if(process.env.NEXT_PUBLIC_ENV === 'prod') {
      await transporter.sendMail(mailOption)
    }
    console.log('Reminder mail sent succesfully')
  } catch (error) {
    //@ts-ignore
    console.log('Error sending mail', error)
  }
}

export default sendRemainderMail
