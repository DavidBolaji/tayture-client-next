import { Field, Form, Formik } from 'formik'
import React from 'react'
import CustomPhoneInput from '../CustomPhoneInput/CustomPhoneInput'
import * as Yup from 'yup'
import { isValidPhoneNumber } from 'react-phone-number-input'
import Button from '@/components/Button/Button'
import Spinner from '@/components/Spinner/Spinner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { sendTextMessageOTP } from '@/lib/services/user'
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

const initilaValues: IForgot = {
  phone: '',
}

const ForgotPasswordInput: React.FC<{ SW: any }> = ({ SW }) => {
  const queryClient = useQueryClient()
  const { setMessage } = useGlobalContext()

  const { mutate, isPending } = useMutation({
    mutationFn: async (phone: string) => await sendTextMessageOTP(phone),
    onSuccess: (result, variables) => {
      queryClient.setQueryData(['pinId'], () => result?.data?.pinId)
      SW.next()
    },
    onError: (error) => {
      setMessage(() => (error as Error).message)
    },
  })

  const { mutate: getPhone, isPending: isPhonePending } = useMutation({
    mutationFn: async (phone: string) =>
      await Axios.get(`/users/phone/${phone}`),
    onSuccess: (result, variables) => {
      queryClient.setQueryData(['email'], () => result?.data?.user.email)
      queryClient.setQueryData(['forgotUserId'], () => result?.data?.user.id)
      mutate(variables)
    },
    onError: (error) => {
      setMessage(
        () =>
          (error as AxiosError<{ error: string }>).response?.data.error ||
          (error as unknown as Error).message,
      )
    },
  })

  const onSubmit = (values: IForgot) => {
    getPhone(values.phone)
  }

  return (
    <div>
      <Formik
        validateOnMount={true}
        initialValues={initilaValues}
        onSubmit={onSubmit}
        validationSchema={forgotSchema}
      >
        {({ handleSubmit, isValid }) => (
          <Form onSubmit={handleSubmit} className="mt-10 pb-20">
            <div>
              <Field
                disabled={isPhonePending || isPending}
                name="phone"
                as={CustomPhoneInput}
                type={'text'}
                placeholder={'Phone'}
                text={'Phone'}
              />
            </div>
            <div className="-mt-8">
              <Button
                disabled={isPending || isPhonePending || !isValid}
                bold={false}
                hover={isValid}
                text={isPending || isPhonePending ? <Spinner /> : 'Send OTP'}
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
