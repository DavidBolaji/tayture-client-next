'use client'
import { useGlobalContext } from '@/Context/store'
import { sendTextMessageOTP } from '@/lib/services/user'

import { regularFont } from '@/assets/fonts/fonts'
import React, { useState } from 'react'
import Countdown from 'react-countdown'
import Spinner from './Spinner/Spinner'
import { message } from 'antd'
import { useQueryClient } from '@tanstack/react-query'
import { User } from '@prisma/client'
import { resendOTP } from '@/lib/api/otp'

const TimerComponent = () => {
  const queryClient = useQueryClient()
  const [load, setLoad] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [time, setTime] = useState(Date.now() + 60000)
  const user = queryClient.getQueryData(['user']) as User


  const handleButtonClick = async () => {
    setLoad(true)
    try {
      await resendOTP()
      // const result = await sendTextMessageOTP(user.phone as string)
      // console.log(result?.data?.pinId)
      // queryClient.setQueryData(['pinId'], () => result?.data?.pinId)
      // localStorage.setItem('pinId', result?.data?.pinId)
      setTime(() => Date.now() + 60000)
      setIsButtonDisabled(true)
      setLoad(false)
      message.success('OTP sent')
    } catch (e: any) {
      console.log(e.message);
    }
  }

  const handleCountdownComplete = () => {
    setIsButtonDisabled(false)
  }

  return (
    <div className="w-full text-center md:mt-16 mt-5">
      <div
        className={`flex justify-center items-center ${regularFont.className}`}
      >
        <button
          className={`border-0 bg-transparent text-orange mr-2`}
          onClick={handleButtonClick}
          disabled={isButtonDisabled}
        >
          {load ? <Spinner color='#FF7517' /> : isButtonDisabled ? 'Resend OTP' : 'Resend OTP'}
        </button>
        <Countdown
          key={time}
          date={time}
          onComplete={handleCountdownComplete}
          renderer={({ minutes, seconds, completed }) => {
            if (completed) {
              return null
            } else {
              return (
                <span>
                  {minutes > 0 ? minutes : ''}
                  {minutes > 0 ? ':' : ''}
                  {seconds > 0 ? seconds : '00'} {minutes > 0 ? 'm' : 's'}
                </span>
              )
            }
          }}
        />
      </div>
    </div>
  )
}

export default TimerComponent
