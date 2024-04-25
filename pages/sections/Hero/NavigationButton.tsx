
import Button from '@/components/Button/Button'
import React from 'react'
// import { useRouter } from 'next/navigation'
import sendWelcomeMail from '@/mail/sendWelcomeMail'
import { Axios } from '@/request/request'

const NavigationButton = () => {
  const send = async () => {
    await Axios.post('/mail/welcome', {firstName: 'David', email: 'odavidbolaji14@gmail.com'})
  }

  return (
    <Button
      type="button"
      bold={false}
      render="light"
      text="Start Now"
      hover
      onClick={send}
      // onClick={() => router.push('/auth/register')}
    />
  )
}

export default NavigationButton
