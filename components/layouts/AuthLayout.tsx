import React, { PropsWithChildren } from 'react'
import Header from '../Header/Header'
import Wrapper from '../Wrapper/Wrapper'
import Image from 'next/image'
import { Images } from '@/assets'
import HandleOTP from '../Modal/HandleOTP'

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <div className="flex flex-col overflow-hidden">
        <div className="fixed w-full z-50">
          <Header />
        </div>
        <main
          className="flex-grow pt-[75px] h-[100vh] overflow-y-scroll no-s"
          id="auth"
        >
          <Wrapper>
            <section className="grid lg:grid-cols-12 grid-cols-6 py-10">
              <div className="col-span-6 lg:block hidden pr-10">
                <Image
                  loading="lazy"
                  alt="login"
                  src={Images.Login}
                  className="object-cover rounded-lg"
                />
              </div>
              {children}
            </section>
          </Wrapper>
        </main>
        <HandleOTP closable={true} />
        {/* <HandleError /> */}
      </div>
    </div>
  )
}

export default AuthLayout
