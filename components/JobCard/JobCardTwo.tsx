import React from 'react'
import { Job, Hired } from '@prisma/client'
import JobHeader from './JobHeader'
import JobDetails from './JobDetail'
import JobShare from './JobShare'
import JobFooter from './JobFooter'


interface IJobCard {
  job: Job & { hired: Hired[] }
  access: boolean
}

const JobCard: React.FC<IJobCard> = ({ job, access }) => (
  <div className="md:col-span-6 col-span-12 bg-white gap-2 border hover:shadow rounded-md h-60 relative overflow-hidden">
    <JobHeader job={job} access={access} />
    <JobDetails job={job} />
    <JobShare jobId={job.job_id} />
    <JobFooter job={job} access={access} />
  </div>
)

export default JobCard