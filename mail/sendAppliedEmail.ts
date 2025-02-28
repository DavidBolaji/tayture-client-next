import path from 'path'
import ejs from 'ejs'
import transporter from './transporter'

interface ImailOptions {
  from: string
  to: string
  cc?: string[]
  subject: string
  html: string
}

const sendAppliedEmail = async ({ email }: { email: string }) => {
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
  const templatePath = path.join(process.cwd(), 'views', 'applied.ejs')
  const dat = await ejs.renderFile(templatePath)

  const mailOption: ImailOptions = {
    from: 'Tayture <hello@tayture.com>',
    to: email,
    subject: `🌟 Hire complete 🌟 <${dateTime}>`,
    html: dat,
  }

  try {
    await transporter.sendMail(mailOption)
    console.log('Hire tayture mail sent succesfully')
  } catch (error) {
    //@ts-ignore
    console.log('Error sending mail', error)
  }
}

export default sendAppliedEmail
