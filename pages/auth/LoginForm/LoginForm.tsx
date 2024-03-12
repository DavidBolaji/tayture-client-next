'use client'
import React from 'react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import StyledInput from '@/components/Form/NomalInput/StyledInput'
import Button from '@/components/Button/Button'
import { useRouter } from 'next/navigation'
import Spinner from '@/components/Spinner/Spinner'
import { useGlobalContext } from '@/Context/store'
import { loginUser } from '@/lib/api/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as Yup from 'yup'
import { Axios } from '@/request/request'
import { AxiosError } from 'axios'

const initilaValues = {
  email: '',
  password: '',
}

export type ILogin = {
  email: string
  password: string
}

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      'Please enter a valid email address',
    )
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
})

const LoginForm = ({ show = true }: { show?: boolean }) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { setMessage, colorList } = useGlobalContext()

  const data = queryClient.getQueryData(['cvData']) as any
  const order = queryClient.getQueryData(['sectionOrder']) as string[]

  const downloadCv = async () => {
    try {
      const response = await Axios.post('/pdf', { data, colorList })
      setMessage(() => response.data.message)
      const t = setTimeout(() => {
        setMessage(() => '')
        clearTimeout(t)
      }, 3000)
    } catch (error) {
      console.error('Error sending PDF:', (error as Error).message)
    }
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: ILogin) => await loginUser({ ...values }),
    onSuccess: async (res) => {
      localStorage.setItem('pinId', res.data.user.pinId)
      localStorage.setItem(
        'token',
        //@ts-ignore
        JSON.stringify(res.headers.getAuthorization().replace('Bearer ', '')),
      )
      if (!show) {
        await downloadCv()
        const t = setTimeout(() => {
          clearTimeout(t)
          window.location.assign('/dashboard?profile=1')
        }, 3000)
      } else {
        window.location.assign('/dashboard')
      }
    },
    onError: (err) => {
      setMessage(() => (err as AxiosError<{error: string}>).response?.data?.error ||(err as Error).message)
    },
  })

  const onSubmit = async (
    values: ILogin,
    { resetForm, setSubmitting }: FormikHelpers<ILogin>,
  ) => {
    mutate({ ...values })
    resetForm({
      values: initilaValues,
    })
  }
  return (
    <div className="text-center mt-10">
      <Formik
        validateOnMount={true}
        initialValues={initilaValues}
        onSubmit={onSubmit}
        validationSchema={loginSchema}
      >
        {({ handleSubmit, isSubmitting, isValid }) => (
          <Form onSubmit={handleSubmit}>
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
                disabled={isSubmitting || !isValid || isPending}
                bold={false}
                hover={!(isSubmitting || !isValid || !isPending)}
                text={isSubmitting || isPending ? <Spinner /> : 'Sign In'}
                render="light"
                full
                type="submit"
              />
              {show && (
                <h3 className="mt-5 text-[14px] text-center">
                  You don’t have an account ? <br />
                  <button
                    type="button"
                    className="text-orange cursor-pointer text-[18px]"
                    onClick={() => router.push('/auth/register')}
                  >
                    Sign up
                  </button>
                </h3>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginForm
