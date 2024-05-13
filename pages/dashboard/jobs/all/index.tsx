'use client'
import { regularFont } from '@/assets/fonts/fonts'

import { useQuery } from '@tanstack/react-query'
import { Badge, ConfigProvider, Skeleton, Tabs, TabsProps } from 'antd'
import { FC, useState } from 'react'
import JobAppliedPage from './components/JobAppliedPage'
import JobSchedulePage from './components/JobSchedulePage'
import JobHiredPage from './components/JobHiredPage'
import JobCardAll2 from './components/JobCardAll2'
import JobCardAllApplied from './components/JobCardAllApplied'
import JobCardAllScheduled from './components/JobCardAllScheduled'
import JobCardAllHired from './components/JobCardAllHired'
import { getUser2 } from '@/lib/api/user'
import Spinner from '@/components/Spinner/Spinner'

const UserJobPage: FC = (props) => {
 const [type, setType] = useState<'applied' | 'scheduled' | 'hired'>('applied')
 const {data: user, isPending} = useQuery({
  queryKey: ['user'],
  queryFn: async () => { const req = await getUser2();
    const user = req.data.user
    return user
  }
 })

  const items: TabsProps['items'] = [
    {
      key: 'applied',
      label: 'Applied',
      children: (
        <>
          {isPending ? <Skeleton loading={isPending} active />: user?.applied!.length > 0 ? (
            user.applied!.map((applied: any, idx: number) => (
              <Badge.Ribbon
                color="black"
                text="Applied"
                key={`${applied.jobId}_applied`}
              >
                <JobCardAllApplied job={applied} idx={idx} />
              </Badge.Ribbon>
            ))
          ):<JobCardAll2 type={type} />}
        </>
      ),
    },
    {
      key: 'scheduled',
      label: 'Scheduled',
      children: (
        <>
          {isPending ? <Skeleton loading={isPending} active /> : user?.schedule!.length > 0 ? (
            user.schedule!.map((schedule: any, idx: number) => (
              <Badge.Ribbon
                key={`${schedule.jobId}_scheduled`}
                color="grey"
                text="Scheduled"
              >
                <JobCardAllScheduled job={schedule} idx={idx} />
              </Badge.Ribbon>
            ))
          ):<JobCardAll2 type={type} />}
        </>
      ),
    },
    {
      key: 'hired',
      label: 'Hired',
      children: (
        <>
          {isPending ? <Spinner /> : user?.hired!.length > 0 ? (
            user.hired!.map((hired: any, idx: number) => (
              <Badge.Ribbon
                key={`${hired.job.job_id}_hired`}
                color="green"
                text="Hired"
              >
                <JobCardAllHired job={hired} idx={idx} />
              </Badge.Ribbon>
            ))
          ): <JobCardAll2 type={type} />}
        </>
      ),
    },
  ]
  const handleChange = (page: any) => {
    setType(page)
  }
  return (
    <div className={regularFont.className}>
      <h2 className="border-b mb-2">Jobs</h2>
      <div className="grid grid-cols-6 md:grid-cols-12 gap-5">
        <div className="col-span-6 space-y-2">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#FF7517',
              },
            }}
          >
            <Tabs  type="card" items={items} onChange={handleChange} />
          </ConfigProvider>
        </div>
        <div className="md:block hidden col-span-6 mt-14 rounded-md w-full">
          {type === 'applied' && <JobAppliedPage />}
          {type === 'scheduled' && <JobSchedulePage />}
          {type === 'hired' && <JobHiredPage />}
        </div>
      </div>
    </div>
  )
}

export default UserJobPage
