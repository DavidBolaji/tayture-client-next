// JobFooter.tsx
import React from 'react'
import { Job, Hired } from '@prisma/client'
import { regularFont } from '@/assets/fonts/fonts'
import { formatNumberToK, salaryOutput } from '@/utils/helpers'
import { Switch } from 'antd'

import { useJobSwitch } from '@/Context/job-switch-context'

interface IJobFooter {
  job: Job & { hired: Hired[] }
  access: boolean
}

const JobFooter: React.FC<IJobFooter> = ({ job, access }) => {
    const { handleSwitch, isPending} = useJobSwitch()

  return (
    <div className="absolute bottom-0 border-t px-3 py-2 w-full flex items-center justify-between">
      <div className={`${regularFont.className} text-xs`}>
        {formatNumberToK(
          salaryOutput(job.job_min_sal, job.job_max_sal) as string,
        )}
      </div>
      <div className={`space-x-1 ${regularFont.className} text-xs`}>
        <Switch
          disabled={!access}
          onClick={() => access && handleSwitch(!job.active, job)}
          loading={isPending}
          checked={job.active}
          checkedChildren={
            <span className={`${regularFont.className} text-[10px] block`}>
              ON
            </span>
          }
          unCheckedChildren={
            <span className={`${regularFont.className} block text-[10px]`}>
              OFF
            </span>
          }
          className="bg-[#8a8a8a]"
        />
      </div>
    
    </div>
  )
}

export default JobFooter
