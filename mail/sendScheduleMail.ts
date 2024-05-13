import path from 'path'
import ejs from 'ejs'
import transporter from './transporter'

interface ImailOptions {
  from: string
  to: string
  cc?: string[]
  bcc?: string[]
  subject: string
  html: string
}

const sendScheduleMail = async ({
  company,
  firstName,
  link,
  job_title,
  email,
}: {
  company: string
  firstName: string
  link: string
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
  const templatePath = path.join(process.cwd(), 'views', 'schedule.ejs')
  const dat = await ejs.renderFile(templatePath, {
    firstName,
    company,
    link,
    job_title,
    email,
  })

  const mailOption: ImailOptions = {
    from: 'Tayture <hello@tayture.com>',
    to: email,
    // bcc: ['info@tayture.com'],
    subject: `🌟 Interview Invitation - Please Confirm Your Attendance 🌟 <${dateTime}>`,
    html: dat,
  }

  try {
    await transporter.sendMail(mailOption)
    console.log('Schedule mail sent succesfully')
  } catch (error) {
    //@ts-ignore
    console.log('Error sending mail', error)
  }
}

export default sendScheduleMail
