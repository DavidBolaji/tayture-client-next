'use client'

import { useGlobalContext } from '@/Context/store'
import React, { ReactNode, useEffect, useState } from 'react'

import PaymentModal from './PaymentModal/PaymentModal'
import PaymentComponent from '../PaymentComponent/PaymentComponent'

export const checkPath = (path: string | null) => {
  if (!path) return false
  return true
}

interface HandlePaymentProp {
  onSuccess: () => void
  onFailure: () => void
  amount: number
  children: ReactNode
  valid: boolean
}

const HandlePayment: React.FC<HandlePaymentProp> = ({
  onSuccess,
  onFailure,
  children,
  amount,
  valid,
}) => {
  const { ui, setUI } = useGlobalContext()
  const [count, setCount] = useState(0)

  const handleClose = () => {
    setUI((prev) => {
      return {
        ...prev,
        paymentModal: {
          ...prev.paymentModal,
          visibility: false,
        },
      }
    })
  }
  useEffect(() => {
    setCount((prev) => prev + 1)
  }, [amount])

  return (
    <PaymentModal
      isOpen={ui.paymentModal?.visibility ? ui.paymentModal?.visibility : false}
      close={handleClose}
    >
      <PaymentComponent
        render={children}
        amount={amount}
        onSuccess={onSuccess}
        onFailure={onFailure}
        valid={valid}
      />
    </PaymentModal>
  )
}

export default HandlePayment
