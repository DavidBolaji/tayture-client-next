// pages/api/users/validate-otp/index.ts
// New API endpoint to validate OTP from database


import { validateOTPFromDB } from '@/lib/services/otp'
import verifyToken from '@/middleware/verifyToken'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const userId = req.authUser?.id

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { otp } = req.body

    // Validate request
    if (!otp || typeof otp !== 'string' || otp.trim().length !== 4) {
      return res.status(400).json({
        message: 'Invalid OTP format. Please enter a 4-digit code.',
      })
    }

    // Validate OTP against database
    const result = await validateOTPFromDB(userId, otp)

    return res.status(200).json({
      message: result.message,
      data: {
        verified: result.verified,
      },
    })
  } catch (error: any) {
    console.error('Error validating OTP:', error)
    
    // Return appropriate status code
    const statusCode = 
      error.message.includes('expired') ? 410 :
      error.message.includes('Too many') ? 429 :
      error.message.includes('Invalid') ? 400 :
      500

    return res.status(statusCode).json({
      message: error.message || 'OTP validation failed',
      data: {
        verified: false,
      },
    })
  }
}

export default verifyToken(handler)