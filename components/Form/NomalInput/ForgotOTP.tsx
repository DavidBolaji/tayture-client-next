import { Field, Form, Formik, FormikHelpers } from 'formik'
import React, { useState } from 'react'
import CustomPhoneInput from '../CustomPhoneInput/CustomPhoneInput'
import * as Yup from 'yup'
import { isValidPhoneNumber } from 'react-phone-number-input'
import Button from '@/components/Button/Button'
import Spinner from '@/components/Spinner/Spinner'
import StyledInput from './StyledInput'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { valdateOTP } from '@/lib/services/user'
import { useGlobalContext } from '@/Context/store'
import { AnimatePresence, motion } from 'framer-motion'
import { Axios } from '@/request/request'
import TimerComponent from '@/components/TimerComponent'

const forgotSchema = Yup.object().shape({
  phone: Yup.string()
    .test('is-valid-phone-number', 'Invalid phone number', function (value) {
      return isValidPhoneNumber(value || '')
    })
    .required('Phone number is required'),
  password_one: Yup.string().required('Password is required'),

  confirm_password: Yup.string()
    .oneOf([Yup.ref('password_one'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  pin: Yup.string().required('OTP is required'),
})

export type IForgot = {
  phone: string
  password_one: string
  pin: string
  confirm_password: string
}

const ForgotOTP: React.FC<{ close: () => void; SW: any }> = ({ close, SW }) => {
  const queryClient = useQueryClient()
  const phn = queryClient.getQueryData(['phone'])
  const [isOtp, setIsOtp] = useState(false)
  const { setMessage } = useGlobalContext()
  const [init, setInit] = useState({
    phone: (phn as string) ?? '+2348107483900',
    pin: '',
    password_one: '',
    confirm_password: '',
  })

  const { mutate, isPending: isValidating } = useMutation({
    mutationFn: async ({
      otp,
      pinId,
      email,
    }: {
      otp: string
      pinId: string
      email: string
    }) => {
      return await valdateOTP({
        otp,
        pinId,
        email,
      })
    },
    onSuccess: (res: any) => {
      if (!res?.data?.verified) {
        return setMessage(() => res?.message ?? 'Invalid OTP')
      }
      const { verified } = res?.data
      if (verified) {
        setIsOtp(true)
      }
    },
    onError: (err) => {
      setMessage(() => (err as Error).message)
    },
  })

  const onSubmit = async (values: IForgot) => {
    const userId = queryClient.getQueryData(['forgotUserId'])
    try {
      await Axios.put(`/users/update/${userId}`, {
        password: values.password_one,
      })
      close()
      setMessage(() => 'Password changed successfully')
      queryClient.removeQueries({
        queryKey: ['forgotUserId', 'phone', 'pinId', 'email'],
      })
      SW.prev()
    } catch (error) {
      setMessage(() => (error as Error).message)
    }
  }

  const onValidate = async (values: IForgot) => {
    if (String(values.pin).trim().length === 4 && !isOtp) {
      const pinId = queryClient.getQueryData(['pinId']) as string
      const email = queryClient.getQueryData(['email']) as string
      mutate({ otp: values.pin, pinId, email })
      setInit((prev) => {
        return {
          ...prev,
          pin: values.pin,
        }
      })
    }
    return {}
  }

  return (
    <div>
      <Formik
        validateOnMount={true}
        initialValues={init}
        onSubmit={onSubmit}
        validationSchema={forgotSchema}
        validate={onValidate}
        enableReinitialize
        key={String(init.pin) ?? 0}
      >
        {({ handleSubmit, isSubmitting, isValid }) => (
          <Form onSubmit={handleSubmit} className="mt-10 pb-20">
            <div>
              <Field
                name="phone"
                as={CustomPhoneInput}
                type={'text'}
                placeholder={'Phone'}
                text={'Phone'}
                disabled
              />
            </div>
            {!isOtp && (
              <div>
                <Field
                  name="pin"
                  as={StyledInput}
                  type={'number'}
                  placeholder={'OTP'}
                  text={'OTP'}
                  default={init.pin}
                  disabled={isOtp}
                />
              </div>
            )}
            {!isOtp && !isValidating && (
              <div className="md:-mt-16 -mt-10 -translate-x-[98px] md:-translate-x-[105px] mb-4">
                <TimerComponent />
              </div>
            )}
            {isValidating && (
              <div className="flex w-full justify-end -mt-5 mb-2">
                {' '}
                <Spinner color="orange" />
              </div>
            )}
            <AnimatePresence mode="wait">
              {isOtp && (
                <motion.div
                  initial={{ opacity: 0, transform: 'translateY(0%)' }}
                  animate={{ opacity: 1, transform: 'translateY(5%)' }}
                  exit={{ opacity: 0, transform: 'translateY(0%)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <Field
                      name="password_one"
                      as={StyledInput}
                      type={'password'}
                      placeholder={'Password'}
                      text={'Password'}
                      password={true}
                    />
                  </div>
                  <div>
                    <Field
                      name="confirm_password"
                      as={StyledInput}
                      type={'password'}
                      placeholder={'Confirm Password'}
                      text={'Confirm Password'}
                      password={true}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div>
              <Button
                disabled={isSubmitting || !isValid || !isOtp}
                bold={false}
                hover={!(isSubmitting || !isValid)}
                text={isSubmitting ? <Spinner /> : 'Change Password'}
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

export default ForgotOTP
