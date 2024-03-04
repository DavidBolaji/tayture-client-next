import nodemailer from 'nodemailer'
// import { env } from "../config";

const transporter = nodemailer.createTransport({
  host: 'tayture.com',
  port: 465,
  secure: true,
  auth: {
    user: 'hello@tayture.com',
    pass: '.g?Ov?}oty$0',
  },
})

export const transporter2 = nodemailer.createTransport({
  host: 'tayture.com',
  port: 465,
  secure: true,
  auth: {
    user: 'support@tayture.com',
    pass: process.env.NEXT_PUBLIC_MAIL_AUTH_PASS_TWO,
  },
})

export const startMailServer = () => {
  transporter.verify((error, success) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Mail hello server is running')
    }
  })
}
export const startMailServer2 = () => {
  transporter2.verify((error, success) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Mail support server is running')
    }
  })
}

export default transporter
