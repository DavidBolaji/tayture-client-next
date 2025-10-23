import { regularFont } from '@/assets/fonts/fonts'
import React, { useState } from 'react'
import JobPreviewForm from './JobPreview/JobPreviewForm'
import Stepper from '@/components/Stepper/Stepper'
import JobOverviewForm from './JobOverview/JobOverviewForm'

const PostJobComponent = () => {
  const [SW, setSW] = useState<any>(null)

  return (
    <div className={`${regularFont.className} w-full`}>
      <h3 className="md:text-[24px] text-[20px] text-center font-[600] text-black_400">
        {SW?.current === 0 ? "Add Job" : "Review"}
      </h3>
      <Stepper init={(start) => setSW(start)} className="bg-white overflow-y-hidden">
        <JobOverviewForm SW={SW} />
        <JobPreviewForm SW={SW} />
      </Stepper>
    </div>
  )
}

export default PostJobComponent
