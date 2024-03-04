'use client'
import { regularFont } from '@/assets/fonts/fonts'
import { IJobSchDb } from '@/pages/api/job/types'
import { ConfigProvider, Empty, Progress, Skeleton, Space } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import Button from '../Button/Button'
import { datePosted, salaryOutput } from '@/utils/helpers'
import { useQueryClient } from '@tanstack/react-query'
import { useGlobalContext } from '@/Context/store'
import { IUser } from '@/pages/api/users/types'
import { usePathname } from 'next/navigation'
import BtnDashboard from './BtnDashboard'
import BtnLanding from './BtnLanding'
import { useRouter } from 'next/router'

interface JobPosterProps {
  progress?: boolean
}

const JobPoster: React.FC<JobPosterProps> = ({ progress }) => {
  const queryClient = useQueryClient()
  const path = usePathname()
  const router = useRouter()
  const isDashboard = path === '/dashboard/jobs'

  const data = queryClient.getQueryData(['activeJob']) as IJobSchDb
  const user = queryClient.getQueryData(['user']) as IUser
  const { count, setUI } = useGlobalContext()
  const [reset, setReset] = useState(0)

  useEffect(() => {
    setReset((prev) => prev + 1)
  }, [data, count])

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
    if (router.query.job === '1') {
      if (user.validated) {
        handleShow()
      }
    }
  }, [router.query])

  return !data ? (
    <div className="w-full h-full space-y-4">
      <Skeleton loading={true} active={true} />
      <Skeleton loading={true} active={true} />
      <Skeleton loading={true} active={true} />
    </div>
  ) : Object.keys(data).length > 0 ? (
    <div className={`m-0 p-0 ${regularFont.className}`}>
      <h2
        className={`text-[24px] ${regularFont.className} text-black mb-[16px]`}
      >
        {data.job_title}
      </h2>
      <Space className="space-x-[24px]">
        <span className="flex gap-2 items-center">
          <FaLocationDot className="text-orange" />
          <span>{data.school.sch_city}</span>
        </span>
        <span className="text-ash_400">
          posted:&nbsp;
          {datePosted(data.createdAt as string)}
        </span>
        <span className="text-ash_400">{data.applied.length} Applicant(s)</span>
      </Space>
      {isDashboard ? <BtnDashboard /> : <BtnLanding />}
      <p className="mb-[32px]">Your profile matches 8 out of 10 of the skill</p>
      <h3 className="text-[20px] mb-[24px]">Job Details</h3>
      <p className="mb-[40px]">
        {' '}
        Salary range: #{`${salaryOutput(data.job_min_sal, data.job_max_sal)}`}
      </p>
      <p className="mb-[40px]">
        Minimum educational qualification : {data.job_qual}
      </p>
      <p className="mb-[40px]">
        Minimum years of experience: {data.job_exp} Year(s)
      </p>
      {data.job_role === 'teacher' && (
        <>
          <h3 className="mb-[18px] text-[20px]">Subjects</h3>
          <h4 className="mb-2">{data.job_title}</h4>
          <Space>
            {(JSON.parse(data.job_active.replace("'", '')) as string[]).map(
              (e: string) => {
                return (
                  <span
                    key={e}
                    className="ml-1 text-[12px] text-ash_400 inline-block mb-[24px]"
                  >
                    - {e}
                  </span>
                )
              },
            )}
          </Space>
        </>
      )}
      {data.job_desc && (
        <>
          <h3 className="mb-[8px] text-[20px]">Description</h3>
          <p className="mb-[28px]">{data.job_desc}</p>
        </>
      )}

      {progress && (
        <div className="grid grid-cols-10 gap-2 border rounded-lg border-ash_600 overflow-hidden">
          <div className="col-span-4 bg-orange justify-center items-center flex">
            <ConfigProvider
              theme={{
                token: {
                  colorInfo: '#000',
                },
              }}
            >
              <Progress percent={50} type="circle" />
            </ConfigProvider>
          </div>
          <div className="col-span-6 py-[24px]">
            <h3 className="text-[16px] text-black_200">
              Complete your profile
            </h3>
            <p className="text-ash_400 text-[12px] ml-1">
              Add more skills you have to your profile to rate higher for jobs
            </p>
            <div className="scale-75 -ml-8 mt-1">
              <Button render="light" text="Complete setup" bold={false} />
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} />
  )
}

export default JobPoster
