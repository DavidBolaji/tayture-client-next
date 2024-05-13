'use client'
import React from 'react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import StyledInput from '@/components/Form/NomalInput/StyledInput'
import CustomPhoneInput from '@/components/Form/CustomPhoneInput/CustomPhoneInput'
import Button from '@/components/Button/Button'
import { useRouter } from 'next/navigation'
import Spinner from '@/components/Spinner/Spinner'
import { registerUser } from '@/lib/api/user'
import { useGlobalContext } from '@/Context/store'

import { isValidPhoneNumber } from 'react-phone-number-input'
import * as Yup from 'yup'

export const registerSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      'Please enter a valid email address',
    )
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
  fname: Yup.string()
    .min(3, 'first name cannot be less than 3 characters')
    .required('First name is required'),
  lname: Yup.string()
    .min(3, 'Last name cannot be less than 3 characters')
    .required('Last name is required'),
  phone: Yup.string()
    .test('is-valid-phone-number', 'Invalid phone number', function (value) {
      return isValidPhoneNumber(value || '')
    })
    .required('Phone number is required'),
})

export type IRegister = {
  fname: string
  lname: string
  email: string
  password: string
  phone: string
}

const initilaValues: IRegister = {
  fname: '',
  lname: '',
  email: '',
  password: '',
  phone: '',
}

const RegisterForm = ({
  show = true,
  cb,
}: {
  show?: boolean
  cb?: () => void
}) => {
  const router = useRouter()
  const { setUser, setMessage, setUI } = useGlobalContext()
  const onSubmit = async (
    values: IRegister,
    { resetForm, setSubmitting }: FormikHelpers<IRegister>,
  ) => {
    const res = await registerUser(values)
    if (res.data.message && res.data.message === 'User Created!') {
      setUser(() => res.data.user)
      resetForm({
        values: initilaValues,
      })
      if (!show) {
        if (cb) return cb()
      } else {
        setMessage(() => "Account created Successfully, Login to dashboard to continue")
        const t = setTimeout(() => {
          clearTimeout(t)
          router.push('/auth/login')
        }, 3000)
      }
    } else {
      setMessage(() => res.data.message)
    }
    setSubmitting(false)
  }
  return (
    <Formik
      validateOnMount={true}
      initialValues={initilaValues}
      onSubmit={onSubmit}
      validationSchema={registerSchema}
    >
      {({ handleSubmit, isSubmitting, isValid }) => (
        <Form onSubmit={handleSubmit} className="mt-10 pb-20">
          <div className="grid lg:grid-cols-12 grid-cols-6 lg:gap-3">
            <div className="col-span-6">
              <Field
                name="fname"
                as={StyledInput}
                placeholder="First Name"
                type={'text'}
                text={'First Name'}
              />
            </div>
            <div className="col-span-6">
              <Field
                name="lname"
                as={StyledInput}
                placeholder="Last Name"
                type={'text'}
                text={'Last Name'}
              />
            </div>
          </div>
          <div>
            <Field
              name="email"
              as={StyledInput}
              placeholder="Email"
              type={'email'}
              text={'Email'}
            />
          </div>
          <div>
            <Field
              name="phone"
              as={CustomPhoneInput}
              type={'text'}
              placeholder={'Phone'}
              text={'Phone'}
            />
          </div>
          <div>
            <Field
              name="password"
              as={StyledInput}
              placeholder="Password"
              type={'password'}
              password={true}
              text={'Password'}
            />
          </div>

          <div>
            <Button
              disabled={isSubmitting || !isValid}
              bold={false}
              hover={!(isSubmitting || !isValid)}
              text={isSubmitting ? <Spinner /> : 'Sign up'}
              render="light"
              full
              type="submit"
            />
            {show && (
              <h3 className="mt-5 text-[14px] text-center">
                Already have an account ? <br />
                <button
                  type="button"
                  className="text-orange cursor-pointer text-[18px]"
                  onClick={() => router.push('/auth/login')}
                >
                  Log In
                </button>
              </h3>
            )}
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default RegisterForm
