// utils/otp.ts
// Utility functions for managing OTP flow

import { QueryClient } from '@tanstack/react-query'

interface OTPCredentials {
  pinId: string
  email: string
}

/**
 * Safely retrieves OTP credentials from multiple sources
 * Priority: QueryClient > localStorage > userData object
 */
export const getOTPCredentials = (
  queryClient: QueryClient,
  userData?: any
): OTPCredentials | null => {
  try {
    let pinId: string | undefined
    let email: string | undefined

    // Try to get from QueryClient
    pinId = queryClient.getQueryData(['pinId']) as string

    // Fallback to userData object
    if (!pinId && userData?.pinId) {
      pinId = userData.pinId
      queryClient.setQueryData(['pinId'], pinId)
    }

    // Fallback to localStorage
    if (!pinId) {
      const storedPinId = localStorage.getItem('pinId')
      if (storedPinId) {
        pinId = storedPinId
        queryClient.setQueryData(['pinId'], pinId)
      }
    }

    // Get email from localStorage first (most reliable)
    email = localStorage.getItem('email') || undefined

    // Fallback to QueryClient
    if (!email) {
      const cachedUser = queryClient.getQueryData(['user']) as any
      email = cachedUser?.email
    }

    // Fallback to userData object
    if (!email && userData?.email) {
      email = userData.email
      localStorage.setItem('email', email as string)
    }

    // Validate we have both credentials
    if (!pinId || !email) {
      console.error('Missing OTP credentials:', { 
        hasPinId: !!pinId, 
        hasEmail: !!email 
      })
      return null
    }

    return { pinId, email }
  } catch (error) {
    console.error('Error getting OTP credentials:', error)
    return null
  }
}

/**
 * Stores OTP credentials in all relevant locations
 */
export const storeOTPCredentials = (
  queryClient: QueryClient,
  credentials: Partial<OTPCredentials>
): void => {
  try {
    if (credentials.pinId) {
      queryClient.setQueryData(['pinId'], credentials.pinId)
      localStorage.setItem('pinId', credentials.pinId)
    }

    if (credentials.email) {
      localStorage.setItem('email', credentials.email)
    }
  } catch (error) {
    console.error('Error storing OTP credentials:', error)
  }
}

/**
 * Clears OTP credentials from all locations
 */
export const clearOTPCredentials = (queryClient: QueryClient): void => {
  try {
    queryClient.removeQueries({ queryKey: ['pinId'] })
    localStorage.removeItem('pinId')
    // Note: Don't clear email as it might be needed for other purposes
  } catch (error) {
    console.error('Error clearing OTP credentials:', error)
  }
}

/**
 * Validates OTP format
 */
export const isValidOTPFormat = (otp: string): boolean => {
  return /^\d{4}$/.test(otp.trim())
}

/**
 * Debounce helper for OTP input
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}