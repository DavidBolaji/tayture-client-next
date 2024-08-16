import ejs from 'ejs'
import transporter from './transporter'
import path from 'path'

interface ImailOptions {
  from: string
  to: string
  cc?: string[]
  bcc?: string[]
  subject: string
  html: string
}

const sendMigrationMail = async ({
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

  const templatePath = path.join(process.cwd(), 'views', 'migration.ejs')
  const dat = await ejs.renderFile(templatePath, {
    firstName,
  })

  const mailOption: ImailOptions = {
    from: 'Tayture <hello@tayture.com>',
    to: email,
    // bcc: ['info@tayture.com'],
    subject: `Migration <${dateTime}>`,
    html: dat,
  }

  try {
    await transporter.sendMail(mailOption)
    console.log('Migration mail sent succesfully')
  } catch (error) {
    console.log('Error sending mail', error)
  }
}

export default sendMigrationMail
