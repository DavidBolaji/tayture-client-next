'use client'

import { Field, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import StyledInput from '../../Form/NomalInput/StyledInput'
import Button from '../../Button/Button'
import { useMutation } from '@tanstack/react-query'
import { getUserByEmail2 } from '@/lib/services/user'
import Spinner from '../../Spinner/Spinner'
import { regularFont } from '@/assets/fonts/fonts'
import { useGlobalContext } from '@/Context/store'

import * as Yup from 'yup'

export const emailSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      'Please enter a valid email address',
    )
    .required('Email is required'),
})

interface ApplyEmailFormProps {
  SW: any
}

const ApplyEmailForm: React.FC<ApplyEmailFormProps> = ({ SW }) => {
  const { setUser, setEmail } = useGlobalContext()
  const { mutate, isPending, data } = useMutation({
    mutationFn: async (email: string) => {
      return await getUserByEmail2(email)
    },
    onSuccess: (res, email) => {
      const user = res?.data.user

      if (user) {
        setUser(() => user)
        const t = setTimeout(() => {
          SW.next()
          clearTimeout(t)
        }, 500)
      } else {
        setEmail(() => email)
        const t = setTimeout(() => {
          SW.next()
          clearTimeout(t)
        }, 500)
      }
    },
  })
  const onSubmit = async (
    values: { email: string },
    { resetForm, setSubmitting }: FormikHelpers<{ email: string }>,
  ) => {
    mutate(values.email)
  }
  //   console.log(data);
  return (
    <div className="w-full">
      <h2
        className={`text-black mb-[40px] text-center ${regularFont.className} text-xl`}
      >
        Enter your email address
      </h2>
      <Formik
        validateOnMount={true}
        enableReinitialize
        validationSchema={emailSchema}
        key={SW?.current}
        onSubmit={onSubmit}
        initialValues={{
          email: '',
        }}
      >
        {({ isValid, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              as={StyledInput}
              name={'email'}
              placeholder={'Email address'}
            />
            <div className="w-full flex justify-center">
              <Button
                type="submit"
                bold={false}
                text={isPending ? <Spinner color="white" /> : 'Next'}
                disabled={!isValid}
                hover={isValid}
                render="light"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ApplyEmailForm
