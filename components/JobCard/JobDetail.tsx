// JobDetails.tsx
import React from 'react'
import { Job } from '@prisma/client'
import { regularFont } from '@/assets/fonts/fonts'
import { Tag } from 'antd'
import moment from 'moment'

interface IJobDetails {
  job: Job
}

const JobDetails: React.FC<IJobDetails> = ({ job }) => (
  <div className="pl-3 pt-1 space-y-4">
    <JobDetailItem label="Experience" value={`${job.job_exp} years`} color="green" />
    <JobDetailItem label="Vacancy" value={job.job_no_hires.toString()} color="green" />
    <JobDetailItem label="Qualification" value={job.job_qual} color="magenta" />
    <JobDetailItem label="Resumption" value={moment(job.job_resumption).format('Do MMM')} color="red" />
  </div>
)

const JobDetailItem: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div className={`${regularFont.className} text-xs space-x-2`}>
    <span>{label}:</span>
    <Tag color={color} className={`${regularFont.className} text-xs`}>
      {value}
    </Tag>
  </div>
)

export default JobDetails