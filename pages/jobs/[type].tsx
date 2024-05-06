import Wrapper from '@/components/Wrapper/Wrapper'
import HomeLayout from '@/components/layouts/HomeLayout'
import { useRouter } from 'next/router'
import React from 'react'
import FindJobHeading from './components/FindJobHeading'
import Career from './components/Career'
import JobApplication from '@/components/Dashboard/JobApplication/JobApplication'
import { Footer } from '@/components/Footer'
import { Skeleton } from 'antd'

const FindJobTypePage = () => {
  const router = useRouter()
  return (
    <div className="bg-ash_200 pt-[50px] h-[90vh] overflow-y-scroll no-s">
      <Wrapper>
        <div className="">
          <FindJobHeading />
          <div className="mt-20 h-full scale-90">
            {router.query.type ? (
              <JobApplication
                type={router?.query?.type as string}
                progress={false}
                className="h-screen"
              />
            ) : (
              <Skeleton />
            )}
          </div>
          <div className="mt-[96px] mb-20">
            <Career />
          </div>
        </div>
      </Wrapper>
      <Footer />
    </div>
  )
}

FindJobTypePage.getLayout = function getLayout(page: React.ReactNode) {
  return <HomeLayout>{page}</HomeLayout>
}

export default FindJobTypePage
