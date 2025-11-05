// lib/api/otp.ts
// Client-side functions to interact with OTP APIs

import { Axios } from '@/request/request'

/**
 * Validate OTP against database
 */
export const validateOTP = async (otp: string) => {
  try {
    const response = await Axios.post('/users/validate-otp', { otp })
    return response.data
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || 
      error?.message || 
      'Failed to validate OTP'
    )
  }
}

/**
 * Resend OTP
 */
export const resendOTP = async () => {
  try {
    const response = await Axios.post('/users/resend-otp')
    return response.data
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || 
      error?.message || 
      'Failed to resend OTP'
    )
  }
}

/**
 * Get user with OTP (triggers OTP send if not validated)
 */
export const getUserWithOTP = async () => {
  try {
    const response = await Axios.get('/users/me', { 
      params: { add: 1 } 
    })
    return response.data
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || 
      error?.message || 
      'Failed to fetch user'
    )
  }
}