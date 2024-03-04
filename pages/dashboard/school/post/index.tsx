import DashboardLayout from '@/components/layouts/DashboardLayout'
import PostJobComponent from '@/components/pagez/PostJobComponent'
import React from 'react'

const PostJob = () => {
  return (
    <div
      className="flex items-center justify-center flex-col max-w-[648px] bg-white mx-auto md:px-[60px] px-5 py-[40px] overflow-hidden"
      id="scroll-post"
    >
      <h3 className="md:text-[24px] text-[20px] text-center font-[600] text-black_400">
        Add Job Overview
      </h3>
      <PostJobComponent />
    </div>
  )
}

PostJob.getLayout = function getLayout(page: React.ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default PostJob
