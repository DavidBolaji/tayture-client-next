import transporter from './transporter'

interface ImailOptions {
  from: string
  to: string
  cc?: string[]
  bcc?: string[]
  subject: string
  html: string
}

const sendUserRegisteredMail = async ({ name }: { name: string }) => {
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

  const mailOption: ImailOptions = {
    from: 'hello@tayture.com',
    to: 'support@tayture.com',
    subject: `User signed up <${dateTime}>`,
    html: `<p>Hurray, ${name} just registerd</p>`,
  }

  try {
    await transporter.sendMail(mailOption)
    console.log('Mail sent succesfully')
  } catch (error) {
    console.log('Error sending mail', error)
  }
}

export const sendSchCreateddMail = async ({ name }: { name: string }) => {
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

  const mailOption: ImailOptions = {
    from: 'hello@tayture.com',
    to: 'support@tayture.com',
    subject: `School Created <${dateTime}>`,
    html: `<p>Hurray, ${name} just created a school page</p>`,
  }

  try {
    await transporter.sendMail(mailOption)
    console.log('Mail sent succesfully')
  } catch (error) {
    console.log('Error sending mail', error)
  }
}

export const sendJobPostedMail = async ({ name }: { name: string }) => {
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

  const mailOption: ImailOptions = {
    from: 'hello@tayture.com',
    to: 'support@tayture.com',
    subject: `Job Posted <${dateTime}>`,
    html: `<p>Hurray, ${name} just posted a job</p>`,
  }

  try {
    await transporter.sendMail(mailOption)
    console.log('Mail sent succesfully')
  } catch (error) {
    console.log('Error sending mail', error)
  }
}

export default sendUserRegisteredMail
