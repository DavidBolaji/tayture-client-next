import { FC } from 'react'
import { MdLocationOn } from 'react-icons/md'
import { easeIn, motion } from 'framer-motion'
import { salaryOutput } from '@/utils/helpers'

const InterviewJobDropdown: FC<{ data: any }> = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, height: 0, y: -30 }}
    animate={{ opacity: 1, height: 190, y: -15 }}
    transition={{
      duration: 0.5,
      ease: easeIn,
    }}
    exit={{
      y: -20,
      height: 0,
      opacity: 0,
      transition: { duration: 0.5, ease: easeIn },
    }}
    className='space-y-2'
  >
    <div className="md:flex flex-col md:items-start items-center gap-[4px]">
      <div className='md:block hidden'>
        {/* <MdLocationOn color="#FF7517" size={20} /> */}
      </div>
      <p className="text-ash_400">Location:</p>
      <span className="inline-block -ml-0 ">
        {data.school.sch_lga}, {data.school.sch_city}, {data.school.sch_state}
      </span>
    </div>
    <div className="md:flex flex-col items-center md:items-start gap-[4px]">
      <p className="text-ash_400">Salary Range:</p>
      <span className="inline-block -ml-0 ">
      #{salaryOutput(data.job_min_sal, data.job_max_sal)}
      </span>
    </div>

    <div className="space-y-2">
      <div className="flex flex-col">
        <span className="text-[14px] font-bold text-black_200">
          Minimum qualification
        </span>
        <span className="text-ash_400 text-[12px]">{data.job_qual}</span>
      </div>

      <div className="flex flex-col">
        <span className="text-[14px] font-bold text-black_200">
          Experience length
        </span>
        <span className="text-ash_400 text-[12px]">{data.job_exp} years</span>
      </div>
    </div>
  </motion.div>
)

export default InterviewJobDropdown
