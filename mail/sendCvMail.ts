import transporter from './transporter'

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
  email,
  firstName,
  filename,
  path,
}: {
  email: string
  firstName: string
  filename: string
  path: string
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

  const mailOption: ImailOptions = {
    from: 'complaint@tayture.com',
    to: 'hello@tayture.com',
    subject: `Resume <${dateTime}>`,
    html: `<p>Dear ${firstName}, \n attached to this mail is your cv. Thank you for using Tayture</p>`,
    attachments: [
      {
        filename,
        path,
      },
    ],
  }

  try {
    await transporter.sendMail(mailOption)
    console.log('Mail sent succesfully')
  } catch (error) {
    console.log('Error sending mail', error)
  }
}

export default sendCvMail
