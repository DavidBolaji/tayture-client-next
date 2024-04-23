import { useGlobalContext } from '@/Context/store'
import { boldFont, regularFont } from '@/assets/fonts/fonts'
import Button from '@/components/Button/Button'
import {  salaryOutput } from '@/utils/helpers'
import { useQueryClient } from '@tanstack/react-query'
import { Empty, Space } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'

const JobHiredPage:React.FC = (props) => {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData(['activeHiredJob']) as any
  const { count, setUI } = useGlobalContext()
  const [, setReset] = useState(0)

  useEffect(() => {
    setReset((prev) => prev + 1)
  }, [data, count])

  return !data ? null : Object.keys(data).length > 0 ? (
    <div className={`m-0 px-5 py-3 bg-white ${regularFont.className} border`}>
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
          Resumption:&nbsp;
          {moment(data.job.job_resumption).format("DD MMM YYYY")}
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
                <span>Hired</span>
              </div>
            </>
          }
          bold={false}
        />
      </div>
      
      <h3 className={`text-[12px] md:text-[16px] mb-[10px] ${boldFont.className}`}>Job Details</h3>
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
