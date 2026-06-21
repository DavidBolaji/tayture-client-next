import { Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import Button from '@/components/Button/Button'
import Spinner from '@/components/Spinner/Spinner'
import StyledInput from './StyledInput'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { useGlobalContext } from '@/Context/store'
import { AxiosError } from 'axios'
import { createSuccessMessage, createErrorMessage } from '@/utils/message'

const forgotSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
})

export type IForgot = {
  email: string
}

const initialValues: IForgot = {
  email: '',
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

      setMessage(createSuccessMessage('OTP sent successfully to your phone'))

      // Move to next step (OTP input screen)
      SW.next()
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to send OTP. Please try again.'
      setMessage(createErrorMessage(errorMessage))
    },
  })

  // Step 1: Verify email exists and get user info
  const { mutate: verifyEmail, isPending: isVerifyingEmail } = useMutation({
    mutationFn: async (email: string) => {
      const response = await Axios.get(`/users/email/${email}`)
      return response.data
    },
    onSuccess: (result, email) => {
      if (!result?.user) {
        setMessage(createErrorMessage('No account found with this email'))
        return
      }

      // Store email for display/reference
      queryClient.setQueryData(['forgotPasswordEmail'], () => email)

      // Send OTP to the user's registered phone number
      sendOTP({
        userId: result.user.id,
        phone: result.user.phone,
      })
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        'Email not found. Please check and try again.'

      setMessage(createErrorMessage(errorMessage))
    },
  })

  const onSubmit = (values: IForgot) => {
    // Start the flow by verifying email address
    verifyEmail(values.email)
  }

  const isLoading = isVerifyingEmail || isSendingOTP

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
                name="email"
                as={StyledInput}
                type={'email'}
                placeholder={'Email'}
                text={'Email'}
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