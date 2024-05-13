import transporter from './transporter'

interface ImailOptions {
  from: string
  to: string
  cc?: string[]
  bcc?: string[]
  subject: string
  html: string
}

const sendChatMail = async ({
  email,
  firstName,
  html,
}: {
  email: string
  firstName: string
  html: string
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
    from: 'hello@tayture.com',
    to: 'hello@tayture.com',
    subject: `Challenge <${dateTime}>`,
    html: `<p>${html}</p>`,
  }

  try {
    await transporter.sendMail(mailOption)
    console.log('Mail sent succesfully')
  } catch (error) {
    console.log('Error sending mail', error)
  }
}

export default sendChatMail
