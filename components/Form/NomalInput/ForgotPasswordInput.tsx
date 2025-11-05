import { Field, Form, Formik } from 'formik'
import React from 'react'
import CustomPhoneInput from '../CustomPhoneInput/CustomPhoneInput'
import * as Yup from 'yup'
import { isValidPhoneNumber } from 'react-phone-number-input'
import Button from '@/components/Button/Button'
import Spinner from '@/components/Spinner/Spinner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { useGlobalContext } from '@/Context/store'
import { AxiosError } from 'axios'

const forgotSchema = Yup.object().shape({
  phone: Yup.string()
    .test('is-valid-phone-number', 'Invalid phone number', function (value) {
      return isValidPhoneNumber(value || '')
    })
    .required('Phone number is required'),
})

export type IForgot = {
  phone: string
}

const initialValues: IForgot = {
  phone: '',
}

const ForgotPasswordInput: React.FC<{ SW: any }> = ({ SW }) => {
  const queryClient = useQueryClient()
  const { setMessage } = useGlobalContext()

  // Step 2: Send OTP to user's phone (triggers OTP generation and storage in DB)
  const { mutate: sendOTP, isPending: isSendingOTP } = useMutation({
    mutationFn: async (data: { userId: string; phone: string }) => {
      // Call API to generate OTP, store in DB, and send via SMS
      const response = await Axios.post('/users/forgot-password/send-otp', {
        userId: data.userId,
        phone: data.phone,
      })
      return response.data
    },
    onSuccess: (result, variables) => {
      // Store user info for the next step (OTP validation)
      queryClient.setQueryData(['forgotPasswordUserId'], () => variables.userId)
      queryClient.setQueryData(['forgotPasswordPhone'], () => variables.phone)
      
      setMessage(() => 'OTP sent successfully to your phone')
      
      // Clear message after 2 seconds
      setTimeout(() => {
        setMessage(() => '')
      }, 2000)
      
      // Move to next step (OTP input screen)
      SW.next()
    },
    onError: (error: any) => {
      const errorMessage = 
        error?.response?.data?.message || 
        error?.message || 
        'Failed to send OTP. Please try again.'
      setMessage(() => errorMessage)
      
      // Clear error after 3 seconds
      setTimeout(() => {
        setMessage(() => '')
      }, 3000)
    },
  })

  // Step 1: Verify phone number exists and get user info
  const { mutate: verifyPhone, isPending: isVerifyingPhone } = useMutation({
    mutationFn: async (phone: string) => {
      const response = await Axios.get(`/users/phone/${phone}`)
      return response.data
    },
    onSuccess: (result, phone) => {
      if (!result?.user) {
        setMessage(() => 'No account found with this phone number')
        return
      }

      // Store email for display/reference
      queryClient.setQueryData(['forgotPasswordEmail'], () => result.user.email)
      
      // Send OTP to the verified phone number
      sendOTP({
        userId: result.user.id,
        phone: phone,
      })
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        'Phone number not found. Please check and try again.'
      
      setMessage(() => errorMessage)
      
      // Clear error after 3 seconds
      setTimeout(() => {
        setMessage(() => '')
      }, 3000)
    },
  })

  const onSubmit = (values: IForgot) => {
    // Start the flow by verifying phone number
    verifyPhone(values.phone)
  }

  const isLoading = isVerifyingPhone || isSendingOTP

  return (
    <div>
      <Formik
        validateOnMount={true}
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={forgotSchema}
      >
        {({ handleSubmit, isValid }) => (
          <Form onSubmit={handleSubmit} className="mt-10 pb-20">
            <div>
              <Field
                disabled={isLoading}
                name="phone"
                as={CustomPhoneInput}
                type={'text'}
                placeholder={'Phone'}
                text={'Phone'}
              />
            </div>
            <div className="-mt-8">
              <Button
                disabled={isLoading || !isValid}
                bold={false}
                hover={isValid && !isLoading}
                text={
                  isLoading ? (
                    <Spinner />
                  ) : (
                    'Send OTP'
                  )
                }
                render="light"
                full
                type="submit"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ForgotPasswordInput