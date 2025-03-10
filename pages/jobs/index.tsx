import HomeLayout from '@/components/layouts/HomeLayout'
import React from 'react'
import FindJobHeading from './components/FindJobHeading'
import JobApplication from '@/components/Dashboard/JobApplication/JobApplication'
import Wrapper from '@/components/Wrapper/Wrapper'
import Career from './components/Career'
import { Footer } from '@/components/Footer'
import JobRelated from '@/components/Dashboard/JobRelated/JobRelated'
import FilterModal from '@/components/JobSearch/components/filter-modal'

const FindJob = () => {
  return (
    <div className="bg-ash_200 pt-[50px] h-[90vh] overflow-y-scroll no-s">
      <Wrapper>
        <div className="">
          <FindJobHeading />
          <div className="mt-20 h-full scale-90">
            <JobApplication progress={false} />
          </div>
          <JobRelated progress={false} />
          <div className="mb-20">
            <Career />
          </div>
        </div>
      </Wrapper>
      <Footer />
      <FilterModal />
    </div>
  )
}

FindJob.getLayout = function getLayout(page: React.ReactNode) {
  return <HomeLayout>{page}</HomeLayout>
}

export default FindJob
