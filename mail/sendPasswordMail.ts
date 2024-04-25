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

const sendPasswordMail = async ({
  email,
  firstName,
  password,
}: {
  email: string
  firstName: string
  password: string
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

  const templatePath = path.join(__dirname, '../views/password.ejs')
  const dat = await ejs.renderFile(templatePath, {
    firstName,
    password,
  })

  const mailOption: ImailOptions = {
    from: 'Tayture <hello@tayture.com>',
    to: email,
    subject: `Important Information Regarding Your Account<${dateTime}>`,
    html: dat,
  }

  try {
    await transporter2.sendMail(mailOption)
    console.log('Password Mail sent succesfully')
  } catch (error) {
    console.error(error, 'Password Mail')
    console.log('Error sending Verification mail', error)
  }
}

export default sendPasswordMail
