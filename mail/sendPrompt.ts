import transporter from './transporter'
import path from 'path'
import ejs from 'ejs'

interface ImailOptions {
  from: string
  to: string
  cc?: string[]
  bcc?: string[]
  subject: string
  html: string
  attachments?: { filename: string; path: string }[]
}

const sendCvMail = async ({
  firstName,
  email,
  job,
}: {
  email: string
  firstName: string
  job: string
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
  const templatePath = path.join(process.cwd(), 'views', 'prompt.ejs')
  const dat = await ejs.renderFile(templatePath)

  const mailOption: ImailOptions = {
    from: 'hello@tayture.com',
    to: email,
    subject: `New Jobs <${dateTime}>`,
    html: dat,
  }

  try {
    await transporter.sendMail(mailOption)
    console.log('Mail sent succesfully')
  } catch (error) {
    console.log('Error sending mail', error)
  }
}

export default sendCvMail
