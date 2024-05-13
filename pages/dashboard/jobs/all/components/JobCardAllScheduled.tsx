import React, { useEffect, useState } from 'react'
import { Drawer, Empty, Space, Tag, Grid } from 'antd'
import { useQueryClient } from '@tanstack/react-query'
import { boldFont, regularFont } from '@/assets/fonts/fonts'
import { FaLocationDot } from 'react-icons/fa6'
import { salaryOutput } from '@/utils/helpers'
import { IJobSchDb } from '@/pages/api/job/types'
import { useGlobalContext } from '@/Context/store'
import JobSchedulePage from './JobSchedulePage'
const {useBreakpoint} = Grid

const JobCardAllScheduled: React.FC<{
  job: { job: IJobSchDb, jobId: string }
  idx: number
}> = ({ job: jobData, idx }) => {
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
  const { setCount } = useGlobalContext()
  const data = queryClient.getQueryData(['activeScheduledJob']) as IJobSchDb

  const setPage = () => {
    queryClient.setQueryData(['activeScheduledJob'], jobData)
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
    if (idx === 0) {
      queryClient.setQueryData(['activeScheduledJob'], jobData)
    }
  }, [idx, queryClient, jobData])


 
  return (
    <>
      <div
        onClick={handleClick}
        key={`${id}`}
        className={`transition-all rounded-md cursor-pointer hover:shadow-md p-[24px] border mb-5 ${
          data?.jobId === id ? 'border-orange' : 'border-ash_400 '
        } ${regularFont.className}`}
      >
        <h2 className={`mb-3 text-[14px] ${boldFont.className}`}>{title}</h2>
        <Space>
          <FaLocationDot className="text-orange" />
          <span>
            {lga}, {city}, {state}
          </span>
        </Space>
        <div className=" mt-[10px] whitespace-break-spaces space-y-2 ">
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
          <JobSchedulePage />  
      </Drawer>
    </>
  )
}

export default JobCardAllScheduled
