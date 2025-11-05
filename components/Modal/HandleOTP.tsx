'use client'

import { useGlobalContext } from '@/Context/store'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import OTPModal from './OTPModal/OTPModal'
import { Col, Row, Grid } from 'antd'
import { Images } from '@/assets'
import Image from 'next/image'
import { regularFont } from '@/assets/fonts/fonts'
import OtpInput from 'react-otp-input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { valdateOTP } from '@/lib/services/user'
import { ILogin } from '@/pages/auth/LoginForm/LoginForm'
import { loginUser } from '@/lib/api/user'
import TimerComponent from '../TimerComponent'
import Spinner from '../Spinner/Spinner'
import { useRouter } from 'next/router'
import { getOTPCredentials, isValidOTPFormat } from '@/lib/otp'


export const checkPath = (path: string | null) => {
  if (!path) return false
  return true
}

const { useBreakpoint } = Grid

const HandleOTP: React.FC<{ closable: boolean }> = ({ closable }) => {
  const screen = useBreakpoint()
  const { ui, setUI, user, setMessage } = useGlobalContext()
  const queryClient = useQueryClient()
  const [mounted, setMounted] = useState(false)
  const [otp, setOtp] = useState('')
  const router = useRouter()
  const isDashboard = router.query.job === '1'
  
  // Ref to prevent double submissions
  const isSubmittingRef = useRef(false)

  const handleClose = useCallback(() => {
    setUI((prev) => ({
      ...prev,
      OTPModal: {
        ...prev.OTPModal,
        visibility: false,
      },
    }))
  }, [setUI])

  const handleShowApply = useCallback(() => {
    setUI((prev) => ({
      ...prev,
      applyModal: {
        ...prev.applyModal,
        visibility: true,
      },
    }))
  }, [setUI])

  const { mutate: loginMutate, isPending: isLoggingIn } = useMutation({
    mutationFn: async (values: ILogin) => await loginUser({ ...values }),
    onSuccess: (res) => {
      handleClose()
      window.location.assign('/dashboard')
    },
    onError: (err) => {
      console.error('[LOGIN ERROR]', err)
      setMessage(() => (err as Error).message || 'Login failed')
      isSubmittingRef.current = false
    },
  })

  const { mutate: validateOTPMutate, isPending: isValidating } = useMutation({
    mutationFn: async (otpCode: string) => {
      // Prevent double submissions
      if (isSubmittingRef.current) {
        throw new Error('OTP validation already in progress')
      }
      
      isSubmittingRef.current = true

      try {
        let pinId: string
        let email: string

        if (closable) {
          // For login flow - use user from context
          if (!user?.pinId || !user?.email) {
            throw new Error('Missing user credentials for OTP validation')
          }
          pinId = user.pinId
          email = user.email
        } else {
          // For registration/dashboard flow - use utility function
          const credentials = getOTPCredentials(queryClient, user)
          
          if (!credentials) {
            throw new Error('Unable to retrieve OTP credentials. Please try logging in again.')
          }
          
          pinId = credentials.pinId
          email = credentials.email
        }

        console.log('Validating OTP...', { 
          pinIdPreview: pinId.substring(0, 10) + '...', 
          email 
        })
        
        const response = await valdateOTP({
          otp: otpCode,
          pinId,
          email
        })

        return response
      } catch (error) {
        isSubmittingRef.current = false
        throw error
      }
    },
    onSuccess: (res: any) => {
      console.log('OTP validation response:', res)
      
      // Check for validation success
      const isVerified = res?.data?.verified === true || res?.verified === true
      
      if (!isVerified) {
        setOtp('')
        isSubmittingRef.current = false
        const errorMsg = res?.message || res?.data?.message || 'Invalid OTP. Please check and try again.'
        setMessage(() => errorMsg)
        return
      }

      // Success!
      setMessage(() => 'Hurray!!! Phone number verified successfully')
      
      // Invalidate user query to refresh data
      queryClient.invalidateQueries({
        queryKey: ['user'],
      })

      if (closable) {
        // Login flow
        if (user?.email && user?.pass) {
          loginMutate({
            email: user.email,
            password: user.pass,
          })
        } else {
          isSubmittingRef.current = false
          setMessage(() => 'Login credentials missing')
        }
      } else {
        // Registration/Dashboard flow
        isSubmittingRef.current = false
        handleClose()

        if (isDashboard) {
          setTimeout(() => {
            handleShowApply()
            router.replace('/dashboard/jobs')
          }, 500)
        }

        // Clear success message after delay
        setTimeout(() => {
          setMessage(() => '')
        }, 2500)
      }
    },
    onError: (err: any) => {
      console.error('[OTP VALIDATION ERROR]', err)
      setOtp('')
      isSubmittingRef.current = false
      
      const errorMessage = 
        err?.response?.data?.message || 
        err?.message || 
        'Invalid OTP. Please try again.'
      
      setMessage(() => errorMessage)
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setMessage(() => '')
      }, 3000)
    },
  })

  // Handle OTP submission with validation
  useEffect(() => {
    if (otp.trim().length === 4) {
      // Validate format
      if (!isValidOTPFormat(otp)) {
        setMessage(() => 'Please enter a valid 4-digit OTP')
        setTimeout(() => setMessage(() => ''), 2000)
        return
      }

      // Prevent submission if already validating
      if (isValidating || isLoggingIn || isSubmittingRef.current) {
        return
      }

      // Small delay to ensure state is synced and prevent double-tap
      const timer = setTimeout(() => {
        validateOTPMutate(otp.trim())
      }, 300)
      
      return () => clearTimeout(timer)
    }
  }, [otp, isValidating, isLoggingIn])

  useEffect(() => {
    setMounted(true)
    
    // Reset submission ref when component mounts
    return () => {
      isSubmittingRef.current = false
    }
  }, [])

  // Reset submission ref when modal closes
  useEffect(() => {
    if (!ui.OTPModal?.visibility) {
      isSubmittingRef.current = false
      setOtp('')
    }
  }, [ui.OTPModal?.visibility])

  if (!mounted) {
    return null
  }

  const isProcessing = isValidating || isLoggingIn

  return (
    <OTPModal
      isOpen={ui.OTPModal?.visibility ? ui.OTPModal?.visibility : false}
      closable={closable}
      close={closable ? handleClose : () => {}}
    >
      <Row>
        <Col
          span={24}
          className={`w-full relative md:mb-[16px] mb-[16px] ${regularFont.className}`}
        >
          <div className="flex items-center mx-auto justify-center mt-5">
            <Image
              src={Images.Mail}
              alt="mail"
              className="md:w-[190px] w-[150px] md:h-[127px] md:scale-0"
            />
          </div>
        </Col>
        <Col span={24}>
          <h2
            className={`text-black_200 font-[500] text-[16px] mb-[8px] text-center ${regularFont.className}`}
          >
            Enter OTP
          </h2>
          <div className={`md:px-[49px] ${regularFont.className}`}>
            <p className="text-ash_400 -mt-1 mb-[20px] text-[12px] xl:text-center sm:text-center md:text-center lg:text-center text-center">
              Enter the One-time Password you received via SMS below.
            </p>
          </div>
          <div className="text-center flex justify-center items-center md:mb-[8px] px-20">
            {isProcessing ? (
              <div className="flex flex-col items-center gap-2">
                <Spinner color="orange" />
                <p className="text-xs text-gray-500">
                  {isValidating ? 'Verifying OTP...' : 'Logging in...'}
                </p>
              </div>
            ) : (
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                placeholder="****"
                inputType="tel"
                inputStyle={{
                  border: 'none',
                  width: screen.md ? 50 : 40,
                  height: screen.md ? 50 : 40,
                  borderRadius: 10,
                  outline: 'none',
                  fontSize: '20px',
                  fontWeight: 'bold',
                }}
                containerStyle={{
                  gap: screen.md ? 32 : 8,
                  border: '0px',
                }}
                shouldAutoFocus
                renderInput={(props) => (
                  <div className="border border-[#666666] rounded-[10px] focus-within:border-orange transition-colors">
                    <input 
                      {...props} 
                      disabled={isProcessing}
                      autoComplete="one-time-code"
                    />
                  </div>
                )}
              />
            )}
          </div>
          <div>
            <TimerComponent />
          </div>
        </Col>
      </Row>
    </OTPModal>
  )
}

export default HandleOTP