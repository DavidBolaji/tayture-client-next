import { regularFont } from '@/assets/fonts/fonts'
import React, { useState } from 'react'
import JobOverviewForm from './JobOverview/JobOverviewForm'
import JobPreviewForm from './JobPreview/JobPreviewForm'
import Stepper from '@/components/Stepper/Stepper'

const PostJobComponent = () => {
  const [SW, setSW] = useState<any>(null)

  return (
    <div className={`${regularFont.className} w-full`}>
      <Stepper init={(start) => setSW(start)} className="bg-white">
        <JobOverviewForm SW={SW} />
        <JobPreviewForm SW={SW} />
      </Stepper>
    </div>
  )
}

export default PostJobComponent
