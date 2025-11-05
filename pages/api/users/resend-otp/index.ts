// pages/api/users/resend-otp/index.ts
// API endpoint to resend OTP

import db from '@/db/db'
import { resendOTP } from '@/lib/services/otp'

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

    // Get user's phone number
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { phone: true, validated: true },
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (user.validated) {
      return res.status(400).json({ 
        message: 'User is already validated' 
      })
    }

    if (!user.phone) {
      return res.status(400).json({
        message: 'Phone number not found',
      })
    }

    // Resend OTP with rate limiting
    const result = await resendOTP(userId, user.phone)

    return res.status(200).json({
      message: 'OTP resent successfully',
      otpExpiresAt: result.expiresAt,
    })
  } catch (error: any) {
    console.error('Error resending OTP:', error)

    const statusCode = error.message.includes('wait') ? 429 : 500

    return res.status(statusCode).json({
      message: error.message || 'Failed to resend OTP',
    })
  }
}

export default verifyToken(handler)