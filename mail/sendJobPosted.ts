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

const sendJobPosted = async ({
 job_title,
 school
}: {
  job_title: string
  school: string
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
  const templatePath = path.join(process.cwd(), 'views', 'postJob.ejs')
  const dat = await ejs.renderFile(templatePath, {
   job_title,
   school
  })

  const mailOption: ImailOptions = {
    from: 'Tayture <support@tayture.com>',
    to: 'hello@tayture.com',
    subject: `🌟 Job created 🌟 <${dateTime}>`,
    html: dat,
  }

  try {
    await transporter.sendMail(mailOption)
    console.log('Schedule mail sent succesfully')
  } catch (error) {
    //@ts-ignore
    console.log('Error sending mail', error)
  }
}

export default sendJobPosted
