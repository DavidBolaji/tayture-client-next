
// JobShare.tsx
import React from 'react'
import { FaShareAlt } from 'react-icons/fa'
import { message } from 'antd'

interface IJobShare {
  jobId: string
}

const JobShare: React.FC<IJobShare> = ({ jobId }) => {
  const handleShare = () => {
    const link = `${process.env.NEXT_PUBLIC_FRONTEND_API}/jobs?find=${jobId}`
    navigator.clipboard.writeText(link)
    message.success('Link copied to clipboard')
  }

  return (
    <div
      onClick={handleShare}
      className="absolute top-[67px] w-12 flex items-center justify-center h-[100px] right-0 bg-[#fafafa] cursor-pointer"
    >
      <FaShareAlt />
    </div>
  )
}

export default JobShare