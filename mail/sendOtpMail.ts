import { transporter2 } from './transporter'
import path from 'path'
import ejs from 'ejs'

interface ImailOptions {
  from: string
  to: string
  cc?: string[]
  bcc?: string[]
  subject: string
  html: string
}

const sendOtpMail = async ({
  email,
  firstName,
  otp,
}: {
  email: string
  firstName: string
  otp: string
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

  const templatePath = path.join(__dirname, '../views/otp.ejs')
  console.log(templatePath)
  const dat = await ejs.renderFile(templatePath, {
    firstName,
    otp,
  })

  const mailOption: ImailOptions = {
    from: 'Tayture <support@tayture.com>',
    to: email,
    subject: `Tayture Verification<${dateTime}>`,
    html: dat,
  }

  try {
    await transporter2.sendMail(mailOption)
    console.log('Otp Mail sent succesfully')
  } catch (error) {
    console.log('Error sending Otp mail', error)
  }
}

export default sendOtpMail
