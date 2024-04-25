import nodemailer from 'nodemailer'



const transporter = nodemailer.createTransport({
  service: "zoho",
  host: 'smtpro.zoho.in',
  port: 465,
  secure: true,
  auth: {
    user: 'hello@tayture.com',
    pass: '.g?Ov?}oty$0',
    // pass: `${process.env.NEXT_PUBLIC_MAIL_AUTH_PASS_ONE}`,
  },
})

export const startMailServer = () => {
  transporter.verify((error: any, success: any) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Mail hello server is running')
    }
  })
}


export default transporter
