'use client'
import { useGlobalContext } from '@/Context/store'
import { sendTextMessageOTP } from '@/lib/services/user'

import { regularFont } from '@/assets/fonts/fonts'
import React, { useState } from 'react'
import Countdown from 'react-countdown'

const TimerComponent = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [time, setTime] = useState(Date.now() + 60000)
  const { user } = useGlobalContext()

  const handleButtonClick = async () => {
    const result = await sendTextMessageOTP(user.phone as string)
    setTime(() => Date.now() + 60000)
    setIsButtonDisabled(true)
  }

  const handleCountdownComplete = () => {
    setIsButtonDisabled(false)
  }

  return (
    <div className="w-full text-center mt-16">
      <div
        className={`flex justify-center items-center ${regularFont.className}`}
      >
        <button
          className={`border-0 bg-transparent text-orange mr-2`}
          onClick={handleButtonClick}
          disabled={isButtonDisabled}
        >
          {isButtonDisabled ? 'Resend OTP' : 'Resend OTP'}
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
