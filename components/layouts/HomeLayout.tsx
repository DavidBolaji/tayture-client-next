import React, { PropsWithChildren } from 'react'
import Header from '../Header/Header'
import { regularFont } from '@/assets/fonts/fonts'

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={`${regularFont.className} overflow-x-hidden no-s`}
      id="home"
    >
      <div className="flex flex-col min-h-screen">
        <div className="fixed w-full z-50">
          <Header />
        </div>
        <main className="flex-grow pt-[70px]">{children}</main>
      </div>
    </div>
  )
}

export default HomeLayout
