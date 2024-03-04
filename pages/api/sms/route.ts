import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const smsVal = z.object({
  otp: z.string(),
  phone: z.string(),
})

type Data = {
  message: string
  data?: any
}

type verifyField = 'otp' | 'phone'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const body = req.body
  const validation = smsVal.safeParse(body)

  if (!validation.success) {
    const errorList = validation.error.format()
    const field = Object.keys(errorList)[1] as verifyField
    return res.status(400).send({
      message: `Validation Error (${field}): ${errorList[field]?._errors}`,
    })
  }

  const { phone, otp } = validation.data
  try {
    const result = await axios.post(`${process.env.TERMII_URL}/sms/send`, {
      api_key: process.env.TERMII_API_KEY,
      to: phone.replace('+', ''),
      from: 'Tayture',
      sms: `Your one time password is ${otp}`,
      type: 'plain',
      channel: 'dnd',
    })
    console.log('SMS sent succesfully')
    return res
      .status(200)
      .send({ message: 'SMS sent succesfully', data: result.data })
  } catch (error: any) {
    console.log('error: ', error)
    return res.status(400).send({ message: (error as Error).message })
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  console.log(body)
  const validation = smsVal.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 })

  const { phone, otp } = validation.data
  try {
    const result = await axios.post(`${process.env.TERMII_URL}/sms/send`, {
      api_key: process.env.TERMII_API_KEY,
      to: phone.replace('+', ''),
      from: 'Tayture',
      sms: `Your one time password is ${otp}`,
      type: 'plain',
      channel: 'generic',
    })
    console.log('SMS sent succesfully')
    return NextResponse.json({ data: result.data })
  } catch (error: any) {
    console.log('error: ', error)
    return NextResponse.json({ error })
  }
}
