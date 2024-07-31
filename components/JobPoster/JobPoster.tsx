'use client'
import { regularFont } from '@/assets/fonts/fonts'
import { IJobSchDb } from '@/pages/api/job/types'
import { ConfigProvider, Empty, Progress, Skeleton, Space, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import Button from '../Button/Button'
import {  datePosted, salaryOutput } from '@/utils/helpers'
import { useQueryClient } from '@tanstack/react-query'
import { useGlobalContext } from '@/Context/store'
import { IUser } from '@/pages/api/users/types'
import { usePathname } from 'next/navigation'
import BtnDashboard from './BtnDashboard'
import BtnLanding from './BtnLanding'
import { useRouter } from 'next/router'

interface JobPosterProps {
  progress?: boolean
  related?: boolean
}

const JobPoster: React.FC<JobPosterProps> = ({ progress, related = false }) => {
  const queryClient = useQueryClient()
  const path = usePathname()
  const router = useRouter()
  const isDashboard = path === '/dashboard/jobs'


  const data = queryClient.getQueryData(['activeJob']) as IJobSchDb
  const data2 = queryClient.getQueryData(['relatedJob']) as IJobSchDb
  const user = queryClient.getQueryData(['user']) as IUser
  const prog = queryClient.getQueryData(['profileDetails'])
  const { count, setUI } = useGlobalContext()
  const [reset, setReset] = useState(0)

  useEffect(() => {
    setReset((prev) => prev + 1)
  }, [data, count, data2])

  const handleShow = () => {
    setUI((prev) => {
      return {
        ...prev,
        applyModal: {
          ...prev.applyModal,
          visibility: true,
        },
      }
    })
  }

  useEffect(() => {
    if (router.query.jobz === '1') {
      const appliedJobIds = typeof user !== "undefined" ? user?.applied!.flatMap(applied => applied.jobId): [];
      const isJobApplied = appliedJobIds.some((id: string) => id === data.job_id);
      if (user.validated) {
        if(!isJobApplied) {
          handleShow()
        } else {
          message.success("User has already applied for job")
        }
      }
    }
  }, [router.query.jobz])

  return related ? (!data2  ? (
    <div className="w-full h-full space-y-4">
      <Skeleton loading={true} active={true} />
      <Skeleton loading={true} active={true} />
      <Skeleton loading={true} active={true} />
    </div>
  ) : Object.keys(data2).length > 0 ? (
    <div className={`m-0 pb-[20px] bg-white rounded-[10px] border px-[32px] pt-[20px] ${regularFont.className}`}>
      <h2
        className={`text-[24px] ${regularFont.className} text-black mb-[16px]`}
      >
        {data2.job_title}
      </h2>
      <Space className="md:space-x-[24px] md:text-md sm:text-sm text-xs space-x-2">
        <span className="flex gap-2 items-center">
          <FaLocationDot className="text-orange" />
          <span>{data2.school.sch_city}</span>
        </span>
        <span className="text-ash_400">
          Posted:&nbsp;
          {datePosted(data2.createdAt as string)}
        </span>
        <span className="text-ash_400">{data2.applied.length} Applicant(s)</span>
      </Space>
      {isDashboard ? <BtnDashboard /> : <BtnLanding related />}
      {/* <p className="mb-[32px]">Your profile matches 8 out of 10 of the skill</p> */}
      <h3 className="text-[20px] mb-2 -ml-1">Job Details</h3>
      <div className='space-y-2 mb-4'>
      <p>
        {' '}
        Salary range: #{`${salaryOutput(data2.job_min_sal, data2.job_max_sal)}`}
      </p>
      <p>
        Minimum educational qualification : {data2.job_qual}
      </p>
      <p>
        Minimum years of experience: {data2.job_exp} Year(s)
      </p>
      </div>
      {data2.job_role === 'teacher' && (
        <div className='mb-3'>
          <h3 className="mb-2 text-[20px]">Role</h3>
          <h4 className="mb-2">{data2.job_title}</h4>
          <Space>
            {(JSON.parse(data2.job_active.replace("'", '')) as string[]).map(
              (e: string) => {
                return (
                  <span
                    key={e}
                    className="ml-1 text-[12px] text-ash_400 inline-block"
                  >
                    - {e}
                  </span>
                )
              },
            )}
          </Space>
        </div>
      )}
      {data2.job_desc && (
        <>
          <h3 className="mb-[8px] text-[20px]">Description</h3>
          <p className="mb-[28px]">{data.job_desc}</p>
        </>
      )}

      {isDashboard && (
        <div className="grid grid-cols-10 gap-2 border rounded-lg border-ash_600 overflow-hidden">
          <div className="col-span-4 bg-orange justify-center items-center flex">
            <ConfigProvider
              theme={{
                token: {
                  colorInfo: '#000',
                },
              }}
            >
              <div className='md:scale-0 scale-75'>
              {typeof prog !== "number" ? <Progress percent={0} type="circle" />:<Progress percent={prog as number} type="circle" />}

              </div>
            </ConfigProvider>
          </div>
          <div className="col-span-6 py-[24px]">
            <h3 className="md:text-[16px] text-black_200 text-sm md:ml-0 ml-1">
              Complete your profile
            </h3>
            <p className="text-ash_400 text-[12px] ml-1">
              Add more skills you have to your profile to rate higher for jobs
            </p>

            <div className="scale-75 md:-ml-8 -ml-5 mt-1">
              <Button render="light" text="Complete setup" bold={false} onClick={() => router.push('/dashboard/profile')} />
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} />
  )) : (!data  ? (
    <div className="w-full h-full space-y-4">
      <Skeleton loading={true} active={true} />
      <Skeleton loading={true} active={true} />
      <Skeleton loading={true} active={true} />
    </div>
  ) : Object.keys(data).length > 0 ? (
    <div className={`m-0 pb-[20px] bg-white rounded-[10px] border px-[32px] pt-[20px] ${regularFont.className}`}>
      <h2
        className={`text-[24px] ${regularFont.className} text-black mb-[16px]`}
      >
        {data.job_title}
      </h2>
      <Space className="md:space-x-[24px] md:text-md sm:text-sm text-xs space-x-2">
        <span className="flex gap-2 items-center">
          <FaLocationDot className="text-orange" />
          <span>{data.school.sch_city}</span>
        </span>
        <span className="text-ash_400">
          Posted:&nbsp;
          {datePosted(data.createdAt as string)}
        </span>
        <span className="text-ash_400">{data.applied.length} Applicant(s)</span>
      </Space>
      {isDashboard ? <BtnDashboard /> : <BtnLanding />}
      {/* <p className="mb-[32px]">Your profile matches 8 out of 10 of the skill</p> */}
      <h3 className="text-[20px] mb-2 -ml-1">Job Details</h3>
      <div className='space-y-2 mb-4'>
      <p>
        {' '}
        Salary range: #{`${salaryOutput(data.job_min_sal, data.job_max_sal)}`}
      </p>
      <p>
        Minimum educational qualification : {data.job_qual}
      </p>
      <p>
        Minimum years of experience: {data.job_exp} Year(s)
      </p>
      </div>
      {data.job_role === 'teacher' && (
        <div className='mb-3'>
          <h3 className="mb-2 text-[20px]">Role</h3>
          <h4 className="mb-2">{data.job_title}</h4>
          <Space>
            {(JSON.parse(data.job_active.replace("'", '')) as string[]).map(
              (e: string) => {
                return (
                  <span
                    key={e}
                    className="ml-1 text-[12px] text-ash_400 inline-block"
                  >
                    - {e}
                  </span>
                )
              },
            )}
          </Space>
        </div>
      )}
      {data.job_desc && (
        <>
          <h3 className="mb-[8px] text-[20px]">Description</h3>
          <p className="mb-[28px]">{data.job_desc}</p>
        </>
      )}

      {isDashboard && (
        <div className="grid grid-cols-10 gap-2 border rounded-lg border-ash_600 overflow-hidden">
          <div className="col-span-4 bg-orange justify-center items-center flex">
            <ConfigProvider
              theme={{
                token: {
                  colorInfo: '#000',
                },
              }}
            >
              <div className='md:scale-0 scale-75'>
              {typeof prog !== "number" ? <Progress percent={0} type="circle" />:<Progress percent={prog as number} type="circle" />}

              </div>
            </ConfigProvider>
          </div>
          <div className="col-span-6 py-[24px]">
            <h3 className="md:text-[16px] text-black_200 text-sm md:ml-0 ml-1">
              Complete your profile
            </h3>
            <p className="text-ash_400 text-[12px] ml-1">
              Add more skills you have to your profile to rate higher for jobs
            </p>

            <div className="scale-75 md:-ml-8 -ml-5 mt-1">
              <Button render="light" text="Complete setup" bold={false} onClick={() => router.push('/dashboard/profile')} />
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} />
  ))
}

export default JobPoster
