import { useGlobalContext } from '@/Context/store'
import { boldFont, regularFont } from '@/assets/fonts/fonts'
import Button from '@/components/Button/Button'
import { IJobSchDb } from '@/pages/api/job/types'
import { IUser } from '@/pages/api/users/types'
import { datePosted, salaryOutput } from '@/utils/helpers'
import { useQueryClient } from '@tanstack/react-query'
import { Empty, Skeleton, Space } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'

const JobAppliedPage:React.FC = (props) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const data = queryClient.getQueryData(['activeAppliedJob']) as IJobSchDb
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

  console.log(data)

  return !data ? null: Object.keys(data).length > 0 ? (
    <div className={`m-0 px-5 py-3 bg-white ${regularFont.className}`}>
      <h2
        className={`text-[24px] ${regularFont.className} text-black mb-[16px]`}
      >
        {data?.job_title}
      </h2>
      <Space className="space-x-[24px]">
        <span className="flex gap-2 items-center">
          <FaLocationDot className="text-orange" />
          <span>{data?.school?.sch_city}</span>
        </span>
        <span className="text-ash_400">
          Posted:&nbsp;
          {datePosted(data.createdAt as string)}
        </span>
        
      </Space>
      <div className='my-[24px] ml-1'>
      <Button
          disabled
          render="dark"
          text={
            <>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-orange inline-block p-1">
                  <FaCheck color="#000" size={10} />
                </span>
                <span>Applied</span>
              </div>
            </>
          }
          bold={false}
        />
      </div>
      {/* <p className="mb-[32px]">Your profile matches 8 out of 10 of the skill</p> */}
      <h3 className={`text-[12px] md:text-[16px] mb-[10px] ${boldFont.className}`}>Job Details</h3>
      <p className="mb-[10px]">
        {' '}
        Salary range: #{`${salaryOutput(data.job_min_sal, data.job_max_sal)}`}
      </p>
      <p className="mb-[10px]">
        Minimum educational qualification : {data?.job_qual}
      </p>
      <p className="mb-[10px]">
        Minimum years of experience: {data?.job_exp} Year(s)
      </p>
      {data?.job_role === 'teacher' && (
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
    </div>
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} />
  )
}

export default JobAppliedPage
