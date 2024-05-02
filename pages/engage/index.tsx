import { Footer } from '@/components/Footer'
import Wrapper from '@/components/Wrapper/Wrapper'
import HomeLayout from '@/components/layouts/HomeLayout'
import React from 'react'
import Section1Cards from './components/Section1Cards'

function Engage() {
  return (
    <>
      <div className="h-[100vh] overflow-auto">
        <Wrapper>

        <div className='relative py-16 '>
            <div className='absolute inset-y-0 w-screen xl:max-w-[1340px] 2xl:max-w-screen-2xl left-1/2 transform -translate-x-1/2 xl:rounded-[40px] z-0 bg-neutral-100'></div>
            <Section1Cards/>
        </div>
        </Wrapper>
        <Footer />
      </div>
    </>
  )
}

Engage.getLayout = function getLayout(page: React.ReactNode) {
  return <HomeLayout>{page}</HomeLayout>
}

export default Engage
