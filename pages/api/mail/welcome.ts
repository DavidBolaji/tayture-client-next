
import sendWelcomeMail from '@/mail/sendWelcomeMail'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await sendWelcomeMail({
      firstName: req.body.firstName,
      email: req.body.email,
    })
    return res.status(200).send({ message: 'SMS sent succesfully' })
  } catch (error: any) {
    console.log('error: ', error)
    return res.status(400).send({ message: (error as Error).message })
  }
}
