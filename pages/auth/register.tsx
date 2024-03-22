import React from 'react'
import { boldFont, regularFont } from '@/assets/fonts/fonts'

import AuthLayout from '@/components/layouts/AuthLayout'
import RegisterContainer from './registerGroup/RegisterForm/RegisterContainer'

const Register = () => {
  return (
    <div className={`col-span-6 text-center lg:px-10 ${regularFont.className}`}>
      <h2
        className={`text-black_200 font-[600] md:pt-0 text-[24px] xl:text-[30px] mb-[8px] xl:text-center md:text-text-center text-center  dsm:max-w-none xl:mt-5 ${boldFont.className}`}
      >
        Create account with Tayture
      </h2>
      <RegisterContainer />
    </div>
  )
}

Register.getLayout = function getLayout(page: React.ReactNode) {
  return <AuthLayout>{page}</AuthLayout>
}

export default Register
