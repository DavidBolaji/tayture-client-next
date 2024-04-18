import { IUser } from '@/pages/api/users/types'
import { useQueryClient } from '@tanstack/react-query'
import React, { ReactNode, useEffect, useState } from 'react'
import { PaystackConsumer } from 'react-paystack'
import Button from '../Button/Button'
import { useGlobalContext } from '@/Context/store'

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
  const {setUI} = useGlobalContext()

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

  const onSuccess = () => {
    successHandler()
    setConfig((prev) => {
      return {
        ...prev,
        reference: Date.now().toString(),
      }
    })
  }

  const onClose = () => {
    failureHandler()
    setConfig((prev) => {
      return {
        ...prev,
        reference: Date.now().toString(),
      }
    })
  }

  useEffect(() => {
    setConfig((prev) => {
      return {
        ...prev,
        amount: amount * 100,
      }
    })
  }, [amount])



  const componentProps = {
    ...config,
    text: 'Paystack Button Implementation',
    onSuccess: () => onSuccess(),
    onClose: () => onClose(),
    callback: function(response: any){
      console.log(response);
      
      let message = 'Payment complete! Reference: ' + response.reference;
      alert(message);

    }
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
              hover={valid}
              text="Fund Wallet"
              render="light"
              onClick={() => {
                setUI((prev) => ({
                  ...prev,
                  paymentModal: {
                    ...prev.paymentModal,
                    visibility: false,
                  },
                }))
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
