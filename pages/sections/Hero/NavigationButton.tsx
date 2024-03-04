'use client'
import Button from '@/components/Button/Button'
import React from 'react'
import { useRouter } from 'next/navigation'

const NavigationButton = () => {
  const router = useRouter()

  return (
    <Button
      type="button"
      bold={false}
      render="light"
      text="Start Now"
      hover
      onClick={() => router.push('/auth/register')}
    />
  )
}

export default NavigationButton
