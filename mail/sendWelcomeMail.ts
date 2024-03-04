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

const sendWelcomeMail = async ({
  firstName,
  email,
}: {
  firstName: string
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

  const templatePath = './views/welcome.ejs'
  console.log(templatePath)
  const dat = await ejs.renderFile(templatePath, {
    firstName,
  })
  console.log('got here')
  const mailOption: ImailOptions = {
    from: 'Tayture <hello@tayture.com>',
    to: email,
    bcc: ['info@tayture.com'],
    subject: `Welcome ${firstName}, this is a special moment in history <${dateTime}>`,
    html: dat,
  }

  try {
    await transporter.sendMail(mailOption)
    console.log('Welcome mail sent succesfully')
  } catch (error) {
    console.log('Error sending mail', error)
  }
}

export default sendWelcomeMail
