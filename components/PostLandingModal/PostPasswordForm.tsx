'use client'

import { Field, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import StyledInput from '../Form/NomalInput/StyledInput'
import Button from '../Button/Button'
import { useMutation } from '@tanstack/react-query'
import Spinner from '../Spinner/Spinner'
import { regularFont } from '@/assets/fonts/fonts'
import { loginUser, updateUser } from '@/lib/api/user'
import { ILogin } from '@/pages/auth/LoginForm/LoginForm'
import { useGlobalContext } from '@/Context/store'
// import Link from "next/link";
import * as Yup from 'yup'
import { checkPath } from '../Modal/HandleApply'

export const passwordSchema = Yup.object().shape({
  password: Yup.string().required('Email is required'),
})

interface PostPasswordFormProps {
  SW: any
}

const PostPasswordForm: React.FC<PostPasswordFormProps> = ({ SW }) => {
  const { setMessage, user } = useGlobalContext()

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: async (values: ILogin) => await loginUser({ ...values }),
    onSuccess: async (res) => {
 
      const a = setTimeout(async () => {
        /**check if path exist */
        const pathExist = checkPath(res.data.user.path)
        if (pathExist) {
          /**Check if path includes school admin do nothing */
          if (
            (
              JSON.parse(user!.path?.replace("'", '')!) as unknown as string[]
            ).includes('school admin')
          ) {
            await updateUser(
              JSON.parse(user!.path?.replace("'", '')!) as unknown as string[],
            )
          } else {
            /**path does not have admin but has other path add school admin */
            await updateUser(
              (
                JSON.parse(user!.path?.replace("'", '')!) as unknown as string[]
              ).concat('school admin'),
            )
          }
        } else {
          /**path does not contain any path add school admin */
          await updateUser(['school admin'])
        }
        clearTimeout(a)
        window.location.assign(`/dashboard?school=1`)

      }, 500)
    },
    onError: (err) => {
      setMessage(() => (err as any).response.data.error || (err as Error).message)
    },
  })

  const onSubmit = async (
    values: { password: string },
    { resetForm }: FormikHelpers<{ password: string }>,
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
        className={`text-black mb-[40px] text-center ${regularFont.className} text-sm md:text-xl`}
      >
        Enter your password
      </h2>
      <Formik
        enableReinitialize
        validateOnMount
        validationSchema={passwordSchema}
        key={SW?.current}
        onSubmit={onSubmit}
        initialValues={{
          password: '',
        }}
      >
        {({ isValid, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              as={StyledInput}
              name={'password'}
              type="password"
              placeholder={'Password'}
              password={true}
            />
            {/* <Link href={"/forgot"} className="text-orange">
              forgot
            </Link> */}
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

export default PostPasswordForm
