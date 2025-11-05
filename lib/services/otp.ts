// lib/services/otp.ts
// Service functions for OTP generation, storage, and validation

import db from '@/db/db'
import { sendTextMessageOTP } from './user' // Your existing SMS service

/**
 * Generate a random 4-digit OTP
 */
export const generateOTP = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

/**
 * Generate OTP, store in database, and send via SMS
 */
export const generateAndSendOTP = async (userId: string, phone: string) => {
  try {
    // Generate OTP
    const otp = generateOTP()
    
    // Set expiry time (10 minutes from now)
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000)

    // Store OTP in database
    await db.user.update({
      where: { id: userId },
      data: {
        otp,
        otpExpiry,
        otpAttempts: 0, // Reset attempts on new OTP generation
      },
    })

    // Send OTP via SMS
    await sendTextMessageOTP(phone, otp)

    console.log(`OTP generated and sent to ${phone}`)

    return {
      success: true,
      message: 'OTP sent successfully',
      expiresAt: otpExpiry,
    }
  } catch (error: any) {
    console.error('Error generating and sending OTP:', error)
    throw new Error('Failed to send OTP: ' + error.message)
  }
}

/**
 * Validate OTP against database
 */
export const validateOTPFromDB = async (
  userId: string,
  enteredOTP: string
) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        otp: true,
        otpExpiry: true,
        otpAttempts: true,
        validated: true,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    // Check if user is already validated
    if (user.validated) {
      return {
        success: true,
        verified: true,
        message: 'User already validated',
      }
    }

    // Check if OTP exists
    if (!user.otp) {
      throw new Error('No OTP found. Please request a new one.')
    }

    // Check if OTP has expired
    if (user.otpExpiry && new Date() > user.otpExpiry) {
      // Clear expired OTP
      await db.user.update({
        where: { id: userId },
        data: { otp: null, otpExpiry: null },
      })
      throw new Error('OTP has expired. Please request a new one.')
    }

    // Check maximum attempts (prevent brute force)
    if (user.otpAttempts >= 5) {
      // Clear OTP after too many failed attempts
      await db.user.update({
        where: { id: userId },
        data: { otp: null, otpExpiry: null, otpAttempts: 0 },
      })
      throw new Error('Too many failed attempts. Please request a new OTP.')
    }

    // Validate OTP
    if (user.otp === enteredOTP.trim()) {
      // OTP is correct - validate user and clear OTP
      await db.user.update({
        where: { id: userId },
        data: {
          validated: 1,
          otp: null,
          otpExpiry: null,
          otpAttempts: 0,
        },
      })

      return {
        success: true,
        verified: true,
        message: 'Phone number verified successfully',
      }
    } else {
      // OTP is incorrect - increment attempts
      await db.user.update({
        where: { id: userId },
        data: {
          otpAttempts: { increment: 1 },
        },
      })

      const remainingAttempts = 5 - (user.otpAttempts + 1)
      throw new Error(
        `Invalid OTP. ${remainingAttempts} attempt${remainingAttempts !== 1 ? 's' : ''} remaining.`
      )
    }
  } catch (error: any) {
    console.error('Error validating OTP:', error)
    throw error
  }
}

/**
 * Resend OTP (with rate limiting)
 */
export const resendOTP = async (userId: string, phone: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        otpExpiry: true,
        updatedAt: true,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    // Rate limiting: Don't allow resend within 60 seconds
    const lastUpdate = user.updatedAt || new Date(0)
    const timeSinceLastOTP = Date.now() - lastUpdate.getTime()
    
    if (timeSinceLastOTP < 60000) {
      const waitTime = Math.ceil((60000 - timeSinceLastOTP) / 1000)
      throw new Error(`Please wait ${waitTime} seconds before requesting a new OTP`)
    }

    // Generate and send new OTP
    return await generateAndSendOTP(userId, phone)
  } catch (error: any) {
    console.error('Error resending OTP:', error)
    throw error
  }
}

/**
 * Clear expired OTPs (run periodically as cleanup job)
 */
export const clearExpiredOTPs = async () => {
  try {
    const result = await db.user.updateMany({
      where: {
        otpExpiry: {
          lt: new Date(),
        },
        otp: {
          not: null,
        },
      },
      data: {
        otp: null,
        otpExpiry: null,
      },
    })

    console.log(`Cleared ${result.count} expired OTPs`)
    return result.count
  } catch (error) {
    console.error('Error clearing expired OTPs:', error)
    throw error
  }
}