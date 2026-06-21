import { validateOTPFromDB } from '@/lib/services/otp'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { userId, otp } = req.body

    if (!userId || !otp) {
      return res.status(400).json({ message: 'User ID and OTP are required' })
    }

    if (typeof otp !== 'string' || otp.trim().length !== 4) {
      return res.status(400).json({ message: 'Invalid OTP format. Please enter a 4-digit code.' })
    }

    const result = await validateOTPFromDB(userId, otp)

    return res.status(200).json({
      message: result.message,
      data: { verified: result.verified },
    })
  } catch (error: any) {
    const statusCode =
      error.message.includes('expired') ? 410 :
      error.message.includes('Too many') ? 429 :
      error.message.includes('Invalid') ? 400 :
      500

    return res.status(statusCode).json({
      message: error.message || 'OTP validation failed',
      data: { verified: false },
    })
  }
}

export default handler
