import { useGlobalContext } from '@/Context/store'
import { regularFont } from '@/assets/fonts/fonts'
import BtnDashboard from '@/components/JobPoster/BtnDashboard'
import { IJobSchDb } from '@/pages/api/job/types'
import { IUser } from '@/pages/api/users/types'
import { datePosted, salaryOutput } from '@/utils/helpers'
import { useQueryClient } from '@tanstack/react-query'
import { Empty, Skeleton, Space } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaLocationDot } from 'react-icons/fa6'

const JobHiredPage:React.FC = (props) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const data = queryClient.getQueryData(['activeHiredJob']) as any
  const user = queryClient.getQueryData(['user']) as IUser
  const { count, setUI } = useGlobalContext()
  const [reset, setReset] = useState(0)

  useEffect(() => {
    setReset((prev) => prev + 1)
  }, [data, count])

//   const handleShow = () => {
//     setUI((prev) => {
//       return {
//         ...prev,
//         applyModal: {
//           ...prev.applyModal,
//           visibility: true,
//         },
//       }
//     })
//   }

//   useEffect(() => {
//     if (router.query.job === '1') {
//       if (user.validated) {
//         handleShow()
//       }
//     }
//   }, [router.query])

  console.log(data);

  return !data ? null : Object.keys(data).length > 0 ? (
    <div className={`m-0 p-0 ${regularFont.className}`}>
      <h2
        className={`text-[24px] ${regularFont.className} text-black mb-[16px]`}
      >
        {data.job.job_title}
      </h2>
      <Space className="space-x-[24px]">
        <span className="flex gap-2 items-center">
          <FaLocationDot className="text-orange" />
          <span>{data.job.school.sch_city}</span>
        </span>
        <span className="text-ash_400">
          Posted:&nbsp;
          {datePosted(data.job.createdAt as string)}
        </span>
        
      </Space>
      <BtnDashboard />
      
      <h3 className="text-[20px] mb-[12px]">Job Details</h3>
      <p className="mb-[10px]">
        {' '}
        Salary range: #{`${salaryOutput(data.job.job_min_sal, data.job.job_max_sal)}`}
      </p>
      <p className="mb-[10px]">
        Minimum educational qualification : {data.job.job_qual}
      </p>
      <p className="mb-[10px]">
        Minimum years of experience: {data.job.job_exp} Year(s)
      </p>
      {data.job.job_role === 'teacher' && (
        <>
          <h3 className="mb-[18px] text-[20px]">Subjects</h3>
          <h4 className="mb-2">{data.job.job_title}</h4>
          <Space>
            {(JSON.parse(data.job.job_active.replace("'", '')) as string[]).map(
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
      {data.job.job_desc && (
        <>
          <h3 className="mb-[8px] text-[20px]">Description</h3>
          <p className="mb-[28px]">{data.job.job_desc}</p>
        </>
      )}
    </div>
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} />
  )
}

export default JobHiredPage
