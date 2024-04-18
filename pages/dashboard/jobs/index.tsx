import React from 'react'
import { dataJobs } from '@/utils/data'
import DashboardCard from '@/components/Dashboard/DashboardCard'


import JobApplication from '@/components/Dashboard/JobApplication/JobApplication'
import TopNav from '@/components/TopNav/TopNav'
import JobSearchDashboard from '@/components/JobSearch/JobSearchDashboard'

const JobsPage: React.FC = (props) => {
  return (
    <div className="">
      <div className="overflow-x-auto w-full no-s ">
        <div className="flex space-x-4 mb-5">
          {dataJobs.map((d) => (
            <div key={d.id} className="min-w-[300px]">
              <DashboardCard
                title={d.title}
                text={d.text}
                max
                img={d.img}
                icon={d.icon}
                link={d.link}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 md:-ml-2">
        <JobSearchDashboard />
      </div>
      <div className='mt-2 sm:mt-3'>
        <TopNav />
      </div>
      <JobApplication progress={true} />
    </div>
  )
}

export default JobsPage
