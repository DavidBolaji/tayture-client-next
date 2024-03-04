'use client'
import { getSchoolJobs } from '@/lib/api/job'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import CardWrapper from '../CardWrapper'
import { Empty } from 'antd'
import Link from 'next/link'
import { regularFont } from '@/assets/fonts/fonts'
import { closingDate, datePosted } from '@/utils/helpers'

const SchoolAnalytics = () => {
  const { data: schJobList, isLoading } = useQuery({
    queryKey: ['schoolJobs'],
    queryFn: async () => {
      const req = await getSchoolJobs()
      return req.data.job
    },
  })

  return (
    <div className="pb-16">
      <CardWrapper
        plus={false}
        title="Active Jobs"
        loading={isLoading}
        onClick={() => console.log('first')}
        empty
      >
        <div className={`md:block hidden ${regularFont.className}`}>
          <div className="grid grid-cols-7 mb-[20px]">
            <div className="col-span-4 ">Job Details</div>
            <div className="col-span-1 text-center">Applied</div>
            {/* <div className="col-span-1 text-center">Matched</div> */}
            <div className="col-span-1 text-center">Selected</div>
          </div>
          {schJobList &&
            schJobList.map((j: any) => (
              <div key={j.job_id} className="grid grid-cols-7 mb-[20px]">
                <div className="col-span-4">
                  <p>{j.job_title}</p>
                  <div className="flex gap-5 items-center">
                    <p className="text-ash_400 mb-[8px]">
                      posted:&nbsp;
                      {datePosted(j.createdAt!)}
                    </p>
                    <p className="text-ash_400 -translate-y-1">
                      Deadline:&nbsp;
                      {closingDate(j.job_resumption!)}
                    </p>
                  </div>
                </div>
                <div className="col-span-1 items-center text-center">
                  <Link href={`/dashboard/school/manage/${j.job_id}?default=2`}>
                    {j?.applied && j?.applied.length > 0
                      ? j?.applied.length
                      : 0}
                  </Link>
                </div>

                <div className="col-span-1 text-center">
                  <Link href={`/dashboard/school/manage/${j.job_id}?default=3`}>
                    {/* {j.selected_count} */} 0
                  </Link>
                </div>
              </div>
            ))}
        </div>
        {/* <div className="md:hidden block">
      <div className="">
        {jobSch.job &&
          jobSch.job.map((j: IJobSch) => (
            <div key={j.job_id} className="mb-5">
              <div className="grid sm:grid-cols-7 grid-cols-1">
                <div className=" mb-3 col-span-2">Job Details</div>
                <div className=" mb-3 col-span-5">
                  <p>{j.job_title}</p>
                  <div className="flex gap-5 items-center">
                    <p className="text-ash_400 mb-[8px]">
                      posted
                      {datePosted(j.created_at!)}
                    </p>
                  </div>
                  <p className="text-ash_400 -translate-y-1">
                    Deadline:
                    {closingDate(j.job_deadline!)}
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-7 grid-cols-1">
                <div className="col-span-2 sm:mb-3">Applied</div>
                <div className="col-span-5 mb-3">{j?.applied_count}</div>
              </div>
              <div className="grid sm:grid-cols-7 grid-cols-1">
                <div className="col-span-2 sm:mb-3">Matched</div>
                <Link to={`/dashboard/school/manage/${j.job_id}`}>{j.match_count}</Link>
              </div>
              <div className="grid sm:grid-cols-7 grid-cols-1">
                <div className="col-span-2 sm:mb-3">Selected</div>
                <div className="col-span-5 mb-3">
                  {' '}
                  <Link to={`/dashboard/school/manage/${j.job_id}?default=3`}>
                    {j.selected_count}
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div> */}
        {schJobList && schJobList.length === 0 && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </CardWrapper>
    </div>
  )
}

export default SchoolAnalytics
