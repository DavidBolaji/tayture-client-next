import React, { useState } from 'react'
import { Space, Tag, message, Grid, Drawer } from 'antd'
import { useQueryClient } from '@tanstack/react-query'
import { boldFont, regularFont } from '@/assets/fonts/fonts'
import { FaLocationDot } from 'react-icons/fa6'
import { salaryOutput } from '@/utils/helpers'
import { IJobSchDb } from '@/pages/api/job/types'
import { useGlobalContext } from '@/Context/store'
import { AiOutlineCopy } from 'react-icons/ai';
import JobPoster from '../JobPoster/JobPoster'
import { usePathname } from 'next/navigation'
const {useBreakpoint} = Grid

const JobCard: React.FC<{ job: IJobSchDb, copy?: boolean, related?: boolean }> = ({ job, copy = false, related = false }) => {
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
  const data2 = queryClient.getQueryData(['relatedJob']) as IJobSchDb
  const curId = related ? data2?.job_id : data.job_id
  const path = usePathname()
  const isDashboard = path === '/dashboard/jobs'
  const handleClick = () => {
    if(related) {
      queryClient.setQueryData(['relatedJob'], job)
    } else {
      queryClient.setQueryData(['activeJob'], job)
    }

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
    <div className='relative'>
      {copy && 
      <div 
      onClick={() => {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FRONTEND_API}/jobs?find=${id}`);
        message.success('Link copied to clipboard');
      }}
      className='absolute z-[0] top-1 right-1 bg-orange p-3 cursor-pointer'>
        <AiOutlineCopy />
      </div>}
      <div
      onClick={handleClick}
      key={id}
      className={`transition-all rounded-md cursor-pointer hover:shadow-md p-[24px] border mb-5 ${
        curId === id ? 'border-orange' : 'border-ash_400 '
      } ${regularFont.className}`}
    >
      <h2 className={`mb-3 text-[14px] ${boldFont.className}`}>{title}</h2>
      <Space>
        <FaLocationDot className="text-orange" />
        <span className={`${regularFont.className} text-[14px]`}>
          {lga}, {city}, {state}
        </span>
      </Space>
      <div className=" mt-[10px] whitespace-break-spaces space-y-2 ">
        <Tag className={`bg-ash_600 text-black ${regularFont.className} text-[12px]`}>#{salaryOutput(min, max)}</Tag>
        <Tag className={`bg-ash_600 text-black ${regularFont.className} text-[12px]`}>{qual}</Tag>
        <Tag className={`bg-ash_600 text-black ${regularFont.className} text-[12px]`}>{exp} years Experience</Tag>
      </div>
      <Drawer
        closable
        open={open}
        onClose={handleClick}
        placement='bottom'
        height={isDashboard ? '80%': '60%'}
        
      >
        <JobPoster progress={!copy} />
      </Drawer>
    </div>
    </div>
  )
}

export default JobCard
