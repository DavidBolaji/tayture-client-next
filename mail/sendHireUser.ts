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

const sendHireUser = async ({
 job_title,
 school,
 email,
 firstName
}: {
  job_title: string
  school: string,
  email: string,
  firstName: string
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
  const templatePath = path.join(process.cwd(), 'views', 'hireUser.ejs')
  const dat = await ejs.renderFile(templatePath, {
   job_title,
   school,
   firstName
  })

  const mailOption: ImailOptions = {
    from: 'Tayture <support@tayture.com>',
    to: email,
    subject: `🌟 Hired 🌟 <${dateTime}>`,
    html: dat,
  }

  try {
    await transporter.sendMail(mailOption)
    console.log('Hire user mail sent succesfully')
  } catch (error) {
    //@ts-ignore
    console.log('Error sending mail', error)
  }
}

export default sendHireUser
