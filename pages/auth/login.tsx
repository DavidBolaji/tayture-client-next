import React from 'react'
import { boldFont, regularFont } from '@/assets/fonts/fonts'
import AuthLayout from '@/components/layouts/AuthLayout'
import LoginForm from './LoginForm/LoginForm'

const Login = () => {
  return (
    <div
      className={`col-span-6 text-center lg:px-10 mt-20 ${regularFont.className}`}
    >
      <h2
        className={`text-black_200 font-[600] md:pt-0 text-[24px] xl:text-[30px] mb-[8px] xl:text-center md:text-text-center text-center  dsm:max-w-none xl:mt-5 ${boldFont.className}`}
      >
        Hi, Welcome back !
      </h2>
      <p className="text-[16px] text-ash_400 md:text-[18px] lg:text-[18px] text-center">
        Sign in to continue learning
      </p>
      <LoginForm />
    </div>
  )
}

Login.getLayout = function getLayout(page: React.ReactNode) {
  return <AuthLayout>{page}</AuthLayout>
}

export default Login
