import nodemailer from 'nodemailer'
// import { env } from "../config";

const transporter = nodemailer.createTransport({
  service: "zoho",
  host: 'smtpro.zoho.in',
  port: 465,
  secure: true,
  auth: {
    user: 'hello@tayture.com',
    pass: process.env.NEXT_PUBLIC_MAIL_AUTH_PASS_ONE,
  },
})

// export const transporter2 = nodemailer.createTransport({
//   host: 'tayture.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: 'support@tayture.com',
//     pass: process.env.NEXT_PUBLIC_MAIL_AUTH_PASS_TWO,
//   },
// })

export const startMailServer = () => {
  transporter.verify((error: any, success: any) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Mail hello server is running')
    }
  })
}
// export const startMailServer2 = () => {
//   transporter2.verify((error: any, success: any) => {
//     if (error) {
//       console.log(error)
//     } else {
//       console.log('Mail support server is running')
//     }
//   })
// }

export default transporter
