'use client'

import { Field, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import StyledInput from '../../Form/NomalInput/StyledInput'
import Button from '../../Button/Button'
import Spinner from '../../Spinner/Spinner'
import { regularFont } from '@/assets/fonts/fonts'
import CustomPhoneInput from '../../Form/CustomPhoneInput/CustomPhoneInput'
import { useRouter } from 'next/router'
import { useGlobalContext } from '@/Context/store'
import {
  IRegister,
  registerSchema,
} from '@/pages/auth/registerGroup/RegisterForm/RegisterForm'
import { registerUser } from '@/lib/api/user'


interface ApplyEmailFormProps {
  SW: any
}

const CreateUserForm: React.FC<ApplyEmailFormProps> = ({ SW }) => {
  const router = useRouter()
  const { setMessage, email } = useGlobalContext()

  const initilaValues: IRegister = {
    fname: '',
    lname: '',
    email: email ?? '',
    password: '',
    phone: '',
  }


  const onSubmit = async (
    values: IRegister,
    { setSubmitting }: FormikHelpers<IRegister>,
  ) => {
    const res = await registerUser({ ...values, skip: true })

    if (!res.data.message && res.data.message !== 'User Created!') {
      setMessage(() => res.data.message)
    } else {
      SW.next()
    }
    setSubmitting(false)
  }
  return (
    <div className="w-full">
      <h2
        className={`text-black mb-[40px] text-center ${regularFont.className} text-xl`}
      >
        Your contact info
      </h2>
      <Formik
        enableReinitialize
        key={SW?.current}
        validateOnMount
        validationSchema={registerSchema}
        onSubmit={onSubmit}
        initialValues={initilaValues}
      >
        {({ isValid, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className="mt-10">
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
              <div className="w-full flex justify-center">
                <Button
                  type="submit"
                  bold={false}
                  text={isSubmitting  ? <Spinner color="white" /> : 'Next'}
                  disabled={!isValid || isSubmitting}
                  hover={isValid}
                  render="light"
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreateUserForm
