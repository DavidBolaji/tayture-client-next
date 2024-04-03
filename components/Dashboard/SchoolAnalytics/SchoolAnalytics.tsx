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
        <div className={`${regularFont.className}`}>
          <div className="grid grid-cols-7 mb-[20px]">
            <div className="col-span-4 ">Job Details</div>
            <div className="col-span-1 text-center">Applied</div>
       
            <div className="col-span-1 text-center">Selected</div>
          </div>
          {schJobList &&
            schJobList.map((j: any) => (
              <div key={j.job_id} className="grid grid-cols-7 mb-[20px]">
                <div className="col-span-4">
                  <p>{j.job_title}</p>
                  <div className="flex md:flex-row flex-col md:gap-5 items-start md:items-center">
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
                    0
                  </Link>
                </div>
              </div>
            ))}
        </div>
       
        {schJobList && schJobList.length === 0 && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </CardWrapper>
    </div>
  )
}

export default SchoolAnalytics
