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

const sendSchoolCreated = async ({
 user,
 school
}: {
  user: string
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
 
  const templatePath = path.join(process.cwd(), 'views', 'schoolCreated.ejs')
  const dat = await ejs.renderFile(templatePath, {
   user,
   school
  })

  const mailOption: ImailOptions = {
    from: 'Tayture <hello@tayture.com>',
    to: 'hello@tayture.com',
    subject: `🌟 School created 🌟 <${dateTime}>`,
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

export default sendSchoolCreated
