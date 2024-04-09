import React, { useCallback, useEffect, useState } from 'react'
import { Space, Tag, message, Grid, Drawer } from 'antd'
import { useQueryClient } from '@tanstack/react-query'
import { regularFont } from '@/assets/fonts/fonts'
import { FaLocationDot } from 'react-icons/fa6'
import { salaryOutput } from '@/utils/helpers'
import { IJobSchDb } from '@/pages/api/job/types'
import { useGlobalContext } from '@/Context/store'
import { AiOutlineCopy } from 'react-icons/ai';
import JobPoster from '../JobPoster/JobPoster'
const {useBreakpoint} = Grid

const JobCard: React.FC<{ job: IJobSchDb, copy?: boolean }> = ({ job, copy = false }) => {
  const {
    job_title: title,
    school: { sch_lga: lga, sch_city: city, sch_state: state },
    job_min_sal: min,
    job_max_sal: max,
    job_exp: exp,
    job_qual: qual,
    job_id: id,
  } = job
  const [open, setOpen] = useState(false)
  const screens = useBreakpoint()
  const queryClient = useQueryClient()
  const { count, setCount } = useGlobalContext()
  const data = queryClient.getQueryData(['activeJob']) as IJobSchDb
  
  const handleClick = () => {
    queryClient.setQueryData(['activeJob'], job)
    setCount((prev) => prev + 1)
    if (screens.xs || (screens.sm && !screens.md)) {
      if(!open) {
        setOpen(true)
      } else {
        setOpen(false)
      }
    } 
  }

  return (
    <div
      onClick={handleClick}
      key={id}
      className={`transition-all relative -z-[0] rounded-md cursor-pointer hover:shadow-md p-[24px] border mb-5 ${
        data?.job_id === id ? 'border-orange' : 'border-ash_400 '
      } ${regularFont.className}`}
    >
      {copy && <div 
      onClick={() => {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FRONTEND_API}/find_job?find=${id}`);
        message.success('Link copied to clipboard');
      }}
      className='absolute top-1 right-1'>
        <AiOutlineCopy />
      </div>}
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
      <Drawer
        closable
        open={open}
        onClose={handleClick}
        placement='bottom'
        height={'80%'}
        
      >
        <JobPoster progress={!copy} />
      </Drawer>
    </div>
  )
}

export default JobCard
