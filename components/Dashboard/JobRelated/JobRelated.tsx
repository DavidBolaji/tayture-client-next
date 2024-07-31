'use client'
import React, { useEffect, useState } from 'react'
import JobCard from '@/components/JobCard/JobCard'
import JobPoster from '@/components/JobPoster/JobPoster'
import { IJobSchDb } from '@/pages/api/job/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Empty, Skeleton } from 'antd'
import { cn } from '@/utils/helpers'
import { boldFont } from '@/assets/fonts/fonts'
import { useRouter } from 'next/router'
import { Axios } from '@/request/request'

interface JobRelatedProps {
  className?: string
  progress?: boolean
  type?: string
}

const JobRelated: React.FC<JobRelatedProps> = ({
  className,
  progress,
  type,
}) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data, isPending } = useQuery({
    queryKey: ['relatedJobs'],
    queryFn: async () => {
      if (router.query.find) {
        const res = await Axios.get<{ job: IJobSchDb; relatedJob: IJobSchDb[] }>(
          `/job/${router.query.find}`,
        )
        queryClient.setQueryData(['relatedJob'], () => res.data.relatedJob[0])
        return res.data.relatedJob;
      }
    },
    enabled: !!router.query.find
  })

  return (
    <div className="mt-2 h-full scale-90">
      {data && data.length ? (
        <>
          <h2 className={`mb-3 text-[14px] md:text-2xl ${boldFont.className}`}>
            Related Job
          </h2>
          <div className="grid grid-cols-12 md:gap-10">
            <div
              className={`md:col-span-6 max-h-[500px] pt-2 overflow-auto no-s col-span-12 md:pb-20`}
            >
              {!data.length && isPending ? (
                <div className="space-y-3">
                  {['1x', '2y', '3z'].map((loader) => (
                    <Skeleton
                      key={loader}
                      className="border p-3 rounded-[10px]"
                      loading={true}
                      active={true}
                    />
                  ))}
                </div>
              ) : (
                data?.map((job: IJobSchDb) => (
                  <JobCard key={job.job_id} job={job} copy related />
                ))
              )}
            </div>
            <div
              className={cn(
                'w-full col-span-6 md:block hidden no-s',
                className,
              )}
            >
              <JobPoster progress={progress} related />
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default JobRelated
