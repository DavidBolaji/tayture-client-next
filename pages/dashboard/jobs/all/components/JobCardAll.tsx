import React, { useEffect, useState } from 'react'
import { Drawer, Empty, Space, Tag, Grid } from 'antd'
import { useQueryClient } from '@tanstack/react-query'
import { regularFont } from '@/assets/fonts/fonts'
import { FaLocationDot } from 'react-icons/fa6'
import { salaryOutput } from '@/utils/helpers'
import { IJobSchDb } from '@/pages/api/job/types'
import { useGlobalContext } from '@/Context/store'
import JobAppliedPage from './JobAppliedPage'
import JobSchedulePage from './JobSchedulePage'
import JobHiredPage from './JobHiredPage'
const {useBreakpoint} = Grid

const JobCardAll: React.FC<{
  job: { job: IJobSchDb }
  type: 'applied' | 'scheduled' | 'hired'
}> = ({ job: jobData, type }) => {
  const {
    job_title: title,
    school: { sch_lga: lga, sch_city: city, sch_state: state },
    job_min_sal: min,
    job_max_sal: max,
    job_exp: exp,
    job_qual: qual,
    job_id: id,
  } = jobData.job
  const [open, setOpen] = useState(false)
  const screens = useBreakpoint()
  const queryClient = useQueryClient()
  const { count, setCount } = useGlobalContext()
  const data = queryClient.getQueryData(['activeJob']) as IJobSchDb

  const setPage = () => {
    if (type === 'applied') {
      queryClient.setQueryData(['activeAppliedJob'], jobData.job)
    } else if (type === 'scheduled') {
      queryClient.setQueryData(['activeScheduledJob'], jobData)
    } else if (type === 'hired') {
      console.log('hired')
      console.log(jobData)
      queryClient.setQueryData(['activeHiredJob'], jobData)
    } 
  }
  const handleClick = () => {
    setPage();
    setCount((prev) => prev + 1)
    if (screens.xs || (screens.sm && !screens.md)) {
      if(!open) {
        setOpen(true)
      } else {
        setOpen(false)
      }
    } 
  }

  useEffect(() => {
    setPage()
    if(!open) return;
    handleClick()
  }, [type])

  return (
    <>
      <div
        onClick={handleClick}
        key={`${id}_${type}`}
        className={`transition-all relative -z-[0] min-w-[350px] rounded-md cursor-pointer hover:shadow-md p-[24px] border mb-5 ${
          data?.job_id === id ? 'border-orange' : 'border-ash_400 '
        } ${regularFont.className}`}
      >
        <h2 className="mb-[16px]">{title}</h2>
        <Space>
          <FaLocationDot className="text-orange" />
          <span>
            {lga}, {city}, {state}
          </span>
        </Space>
        <div className=" mt-[24px] whitespace-break-spaces space-y-2 ">
          <Tag className="bg-ash_600 text-black">#{salaryOutput(min, max)}</Tag>
          <Tag className="bg-ash_600 text-black">{qual}</Tag>
          <Tag className="bg-ash_600 text-black">{exp} years Experience</Tag>
        </div>
      </div>
      <Drawer
        closable
        open={open}
        onClose={handleClick}
        placement='bottom'
        height={'80%'}
      >
         {type === 'applied' && <JobAppliedPage />}
          {type === 'scheduled' && <JobSchedulePage />}
          {type === 'hired' && <JobHiredPage />}
      </Drawer>
    </>
  )
}

export default JobCardAll
