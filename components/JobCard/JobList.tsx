import React from 'react'
import { Job, Hired } from '@prisma/client'
import JobCard from './JobCardTwo'

interface IJobList {
  jobs: (Job & { hired: Hired[] })[]
  access: boolean
}

const JobList: React.FC<IJobList> = ({ jobs, access }) => (
  <div className="grid grid-cols-12 gap-3 pb-10 overflow-auto no-s">
    {jobs.map((job) => (
      <JobCard key={job.job_id} job={job} access={access} />
    ))}
  </div>
)

export default JobList