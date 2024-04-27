import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
  service: "zoho",
  host: 'smtpro.zoho.in',
  port: 465,
  secure: true,
  auth: {
    user: 'hello@tayture.com',
    pass: 'E5&4koG#+r[}' 
    // 
  },
})

export const transporter2 = nodemailer.createTransport({
  service: "zoho",
  host: 'smtpro.zoho.in',
  port: 465,
  secure: true,
  auth: {
    user: 'hello@tayture.com',
    pass: 'E5&4koG#+r[}',
    // E5&4koG#+r[}
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
