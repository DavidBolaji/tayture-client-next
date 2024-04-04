'use client'
import { regularFont } from '@/assets/fonts/fonts'
import { IUser } from '@/pages/api/users/types'

import { useQueryClient } from '@tanstack/react-query'
import { Badge, ConfigProvider, Tabs, TabsProps } from 'antd'
import { FC, useState } from 'react'
import JobCardAll from './components/JobCardAll'
import JobAppliedPage from './components/JobAppliedPage'
import JobSchedulePage from './components/JobSchedulePage'

const UserJobPage: FC = () => {
  const queryClient = useQueryClient()
  const [type, setType] = useState<'applied' | 'scheduled' | 'hired'>('applied')
  const user = queryClient.getQueryData(['user']) as unknown as IUser
  const items: TabsProps['items'] = [
    {
      key: 'applied',
      label: 'Applied',
      children: (
        <>
          {user &&
            user.applied!.length > 0 &&
            user.applied!.map((applied: any) => (
              <Badge.Ribbon
                color="black"
                text="Applied"
                key={`${applied.job_id}_applied`}
              >
                <JobCardAll type={type} job={applied} />
              </Badge.Ribbon>
            ))}
        </>
      ),
    },
    {
      key: 'scheduled',
      label: 'Scheduled',
      children: (
        <>
          {user &&
            user.schedule!.length > 0 &&
            user.schedule!.map((schedule: any) => (
              <Badge.Ribbon
                key={`${schedule.job.job_id}_scheduled`}
                color="grey"
                text="Scheduled"
              >
                <JobCardAll type={type} job={schedule} />
              </Badge.Ribbon>
            ))} 
        </>
      ),
    },
    {
      key: 'hired',
      label: 'Hired',
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
            <Tabs type="card" items={items} onChange={handleChange} />
          </ConfigProvider>
        </div>
        <div className="md:block hidden col-span-6 mt-14 bg-white px-5 py-3 rounded-md w-full">
          {type === 'applied' && <JobAppliedPage />}
          {type === 'scheduled' && <JobSchedulePage />}
        </div>
      </div>
    </div>
  )
}

export default UserJobPage
