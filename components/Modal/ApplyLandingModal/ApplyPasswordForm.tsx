'use client'

import { Field, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import StyledInput from '../../Form/NomalInput/StyledInput'
import Button from '../../Button/Button'
import { useMutation } from '@tanstack/react-query'
import Spinner from '../../Spinner/Spinner'
import { regularFont } from '@/assets/fonts/fonts'
import { loginUser } from '@/lib/api/user'
import { ILogin } from '@/pages/auth/LoginForm/LoginForm'
import { useGlobalContext } from '@/Context/store'
// import Link from "next/link";
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'

export const passwordSchema = Yup.object().shape({
  password: Yup.string().required('Email is required'),
})

interface ApplyEmailFormProps {
  SW: any
}

const ApplyPasswordForm: React.FC<ApplyEmailFormProps> = ({ SW }) => {
  const { setMessage, user, setUI } = useGlobalContext()
  const router = useRouter();

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: async (values: ILogin) => await loginUser({ ...values }),
    onSuccess: (res) => {
      setUI((prev) => {
        return {
          ...prev,
          applyLandingModal: {
            ...prev.applyLandingModal,
            visibility: false,
          },
        }
      })
      return router.push(`/dashboard?job=1`)
    },
    onError: (err) => {
      console.log((err as AxiosError<{error: string}>).response?.data.error)
      setMessage(() => (err as AxiosError<{error: string}>).response?.data.error || (err as Error).message)
    },
  })

  const onSubmit = async (
    values: { password: string },
    resetForm:(arg: { values: {password: string} }) => void ,
  ) => {
    loginMutate({ email: user.email!, password: values.password })
    resetForm({
      values: {
        password: '',
      },
    })
  }

  return (
    <div className="w-full">
      <h2
        className={`text-black mb-[40px] text-center ${regularFont.className} text-xl`}
      >
        Enter your password
      </h2>
      <Formik
        enableReinitialize
        validateOnMount
        validationSchema={passwordSchema}
        key={SW?.current}
        onSubmit={() => {}}
        initialValues={{
          password: '',
        }}
      >
        {({ isValid, resetForm, values }) => (
          <Form>
            <Field
              as={StyledInput}
              name={'password'}
              type="password"
              placeholder={'Pasword'}
              password={true}
            />
            {/* <Link href={"/forgot"} className="text-orange">
              forgot
            </Link> */}
            <div className="w-full flex justify-center">
              <Button
                type="button"
                bold={false}
                text={isPending ? <Spinner color="white" /> : 'Next'}
                disabled={!isValid}
                hover={isValid}
                render="light"
                onClick={() => onSubmit(values, resetForm)}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ApplyPasswordForm
