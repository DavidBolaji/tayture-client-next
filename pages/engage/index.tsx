import { Footer } from '@/components/Footer'
import Wrapper from '@/components/Wrapper/Wrapper'
import HomeLayout from '@/components/layouts/HomeLayout'
import React from 'react'
import Section1Cards from './components/Section1Cards'

function Engage() {
  return (
    <>
      <div className="h-[100vh] overflow-auto">
        <div>
          <Wrapper>
            <Section1Cards/>
          </Wrapper>
        </div>
        <div className="h-[100vh]"></div>
        <Footer />
      </div>
    </>
  )
}

Engage.getLayout = function getLayout(page: React.ReactNode) {
  return <HomeLayout>{page}</HomeLayout>
}

export default Engage
