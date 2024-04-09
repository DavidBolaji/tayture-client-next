'use client'
import React from 'react'
import JobCard from '@/components/JobCard/JobCard'
import JobPoster from '@/components/JobPoster/JobPoster'
import { IJobSchDb } from '@/pages/api/job/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getClientJobs, getClientJobsByType } from '@/lib/api/job'
import { Empty, Skeleton } from 'antd'
import { cn } from '@/utils/helpers'
import { useRouter } from 'next/router'

interface JobApplicationProps {
  className?: string
  progress?: boolean
  type?: string
}

const JobApplication: React.FC<JobApplicationProps> = ({
  className,
  progress,
  type,
}) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { isLoading, data } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      let req
      if (type) {
        req = await getClientJobsByType(type!)
      } else {
        req = await getClientJobs()
      }

      if (router.query.jobz === '1') {
        const cur = queryClient.getQueryData(['activeJob'])
        queryClient.setQueryData(['activeJob'], cur)
      } else {
        queryClient.setQueryData(
          ['activeJob'],
          typeof req.data.job[0] === 'undefined' ? {} : req.data.job[0],
        )
      } 
      return req.data.job
    },
  })


  return data && Object.keys(data).length > 0 ? (
    <div className="grid grid-cols-12 md:gap-10">
      <div className={`md:col-span-6 max-h-[500px] pt-2 overflow-auto no-s col-span-12`}>
        {!data && isLoading ? (
          <div className="space-y-3">
            {['1x', '2y', '3z'].map((loader) => (
              <Skeleton
                key={loader}
                className="border p-3 rounded-[10px]"
                loading={isLoading}
                active={isLoading}
              />
            ))}
          </div>
        ) : (
          data?.map((job: IJobSchDb) => <JobCard key={job.job_id} job={job} copy />)
        )}
      </div>
      <div
        className={cn(
          'bg-white w-full col-span-6 rounded-[10px] border px-[32px] pt-[40px] h-[500px] pb-20 overflow-auto md:block hidden no-s',
          className,
        )}
      >
        <JobPoster progress={progress} />
      </div>
      
    </div>
  ) : (
    <div className="flex w-full items-center justify-center flex-col pb-[100px]">
      <div className="bg-white w-full py-10">
        <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} />
      </div>
    </div>
  )
}

export default JobApplication
