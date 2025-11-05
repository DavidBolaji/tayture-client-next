// pages/api/users/forgot-password/send-otp.ts
// API endpoint to send OTP for password reset

import db from '@/db/db'
import { generateAndSendOTP } from '@/lib/services/otp'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { userId, phone } = req.body

    // Validate request
    if (!userId || !phone) {
      return res.status(400).json({
        message: 'User ID and phone number are required',
      })
    }

    // Verify user exists
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        phone: true,
        email: true,
      },
    })

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    // Verify phone number matches
    if (user.phone !== phone) {
      return res.status(400).json({
        message: 'Phone number does not match our records',
      })
    }

    // Generate and send OTP
    const result = await generateAndSendOTP(userId, phone)

    console.log('Password reset OTP sent to user:', userId)

    return res.status(200).json({
      message: 'OTP sent successfully',
      otpExpiresAt: result.expiresAt,
      success: true,
    })
  } catch (error: any) {
    console.error('Error sending password reset OTP:', error)
    
    const statusCode = error.message.includes('wait') ? 429 : 500

    return res.status(statusCode).json({
      message: error.message || 'Failed to send OTP. Please try again.',
      success: false,
    })
  }
}

export default handler