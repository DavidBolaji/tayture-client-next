'use client'

import { useGlobalContext } from '@/Context/store'
import React, { useEffect, useState } from 'react'

import OTPModal from './OTPModal/OTPModal'
import { Col, Row } from 'antd'
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

export const checkPath = (path: string | null) => {
  if (!path) return false
  return true
}

const HandleOTP: React.FC<{ closable: boolean }> = ({ closable }) => {
  const { ui, setUI, user, setMessage } = useGlobalContext()
  const queryClient = useQueryClient()
  const [mounted, setMounted] = useState(false)
  const [otp, setOtp] = useState('')
  const router = useRouter()
  const isDashboard = router.query.job === '1'

  const handleClose = () => {
    setUI((prev) => {
      return {
        ...prev,
        OTPModal: {
          ...prev.OTPModal,
          visibility: false,
        },
      }
    })
  }
  const handleShowApply = () => {
    setUI((prev) => {
      return {
        ...prev,
        applyModal: {
          ...prev.applyModal,
          visibility: true,
        },
      }
    })
  }

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: async (values: ILogin) => await loginUser({ ...values }),
    onSuccess: (res) => {
      handleClose()
      window.location.assign('/dashboard')
    },
    onError: (err) => {
      setMessage(() => (err as Error).message)
    },
  })

  const { mutate, isPending: isValidating } = useMutation({
    mutationFn: async (otp: string) => {
      if (closable) {
        return await valdateOTP({
          otp,
          pinId: user?.pinId as string,
          email: user.email as string,
        })
      }
      const pin = queryClient.getQueryData(['pinId']) as string
     
      console.log(pin)
      return await valdateOTP({
        otp,
        pinId: pin,
        email: localStorage.getItem('email')!,
      })
    },
    onSuccess: (res: any) => {
      const { verified, attemptsRemaining } = res.data
      setMessage(() => 'Hurray!!!, phone number verified')
      if (verified) {
        if (closable) {
          loginMutate({
            email: user.email as string,
            password: user.pass as string,
          })
        } else {
          handleClose()

          if (isDashboard) {
            handleShowApply()
            const t = setTimeout(() => {
              setMessage(() => '')
              clearTimeout(t)
            }, 1000)
            router.replace('/dashboard/jobs')
          }
          setTimeout(() => {
            setMessage(() => '')
          }, 1000)
        }
        queryClient.invalidateQueries({
          queryKey: ['user'],
        })
      } else {
        setOtp('')
        setMessage(
          () => `Incorrect OTP. You  have ${attemptsRemaining} more attempt(s)`,
        )
        setTimeout(() => {
          setMessage(() => '')
        }, 1000)
      }
    },
    onError: (err) => {
      setOtp('')
      setMessage(() => (err as Error).message)
    },
  })

  useEffect(() => {
    if (otp.trim().length === 4) {
      mutate(otp.trim())
    }
  }, [otp])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleOk = () => {}
  return (
    <OTPModal
      isOpen={ui.OTPModal?.visibility ? ui.OTPModal?.visibility : false}
      closable={closable}
      close={closable ? handleClose : () => {}}
    >
      <Row>
        <Col
          span={24}
          className={`w-full relative dsm:mb-[32px] md:mb-[16px] mb-[16px] ${regularFont.className}`}
        >
          <div className="flex w-[300px] items-center mx-auto justify-center mt-5">
            <Image
              src={Images.Mail}
              alt="mail"
              width={190}
              height={127}
              className=""
              priority
            />
          </div>
        </Col>
        <Col span={24}>
          <h2
            className={`text-black_200 font-[500] text-[16px] mb-[8px] text-center ${regularFont.className}`}
          >
            Enter OTP
          </h2>
          <div className={`px-[49px] ${regularFont.className}`}>
            <p className="text-ash_400 -mt-1 mb-[20px] text-[12px] xl:text-center sm:text-center md:text-center dsm:text-center lg:text-center text-center">
              Enter the One-time Password you receive via SMS below.
            </p>
          </div>
          <div className="text-center flex justify-center items-center mb-[8px] px-20">
            {isPending || isValidating ? (
              <Spinner color="orange" />
            ) : (
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                placeholder="****"
                inputStyle={{
                  border: 'none',
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  outline: 'none',
                }}
                containerStyle={{
                  gap: 32,
                  border: '0px',
                }}
                shouldAutoFocus
                renderInput={(props) => (
                  <div className="border border-[#666666] rounded-[10px] focus-within:border-orange">
                    <input {...props} disabled={isPending || isValidating} />
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
