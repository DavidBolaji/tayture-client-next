
// JobHeader.tsx
import React from 'react'
import { Job } from '@prisma/client'
import { regularFont } from '@/assets/fonts/fonts'
import { FaClock } from 'react-icons/fa'
import moment from 'moment'
import Link from 'next/link'

interface IJobHeader {
  job: Job
  access: boolean
}

const JobHeader: React.FC<IJobHeader> = ({ job, access }) => (
  <div className={`p-3 border-b flex justify-between ${regularFont.className}`}>
    <div>
      <div className="mb-1">{job.job_title}</div>
      <div className={`flex items-center gap-1 ${regularFont.className} text-xs`}>
        <FaClock />
        <div className="text-[10px]">
          {moment(job.createdAt).format('Do MMM')}
        </div>
      </div>
    </div>
    <Link href={!access ? '#' : `/dashboard/school/manage/${job.job_id}?default=2`}>
      View
    </Link>
  </div>
)

export default JobHeader
