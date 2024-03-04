import { IUser } from '@/pages/api/users/types'
import { useQueryClient } from '@tanstack/react-query'
import React, { ReactNode, useEffect, useState } from 'react'
import { PaystackConsumer } from 'react-paystack'
import Button from '../Button/Button'

const PaymentComponent: React.FC<{
  amount: number
  render: ReactNode
  left?: boolean
  onSuccess: () => void
  onFailure: () => void
  valid: boolean
}> = ({
  amount,
  render,
  valid,
  onSuccess: successHandler,
  onFailure: failureHandler,
  left,
}) => {
  const queryClient = useQueryClient()
  const auth = queryClient.getQueryData(['user']) as IUser

  const [config, setConfig] = useState<{
    reference: string
    email: string
    amount: number
    publicKey: string
  }>({
    reference: Date.now().toString(),
    email: auth.email,
    amount: amount * 100,
    publicKey:
      process.env.NEXT_PUBLIC_ENV === 'dev'
        ? process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC!
        : process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_PROD!,
  })

  useEffect(() => {
    setConfig((prev) => {
      return {
        ...prev,
        amount: amount * 100,
      }
    })
  }, [amount])

  const onSuccess = () => {
    successHandler()
  }

  const onClose = () => {
    failureHandler()
  }

  const componentProps = {
    ...config,
    text: 'Paystack Button Implementation',
    onSuccess: () => onSuccess(),
    onClose: () => onClose(),
  }

  return (
    <PaystackConsumer {...componentProps}>
      {({ initializePayment }) => (
        <>
          {render}
          <div>
            <Button
              disabled={!valid}
              bold={false}
              full
              hover
              text="Fund Wallet"
              render="light"
              onClick={() => {
                initializePayment(onSuccess, onClose)
              }}
            />
          </div>
        </>
      )}
    </PaystackConsumer>
  )
}

export default PaymentComponent
