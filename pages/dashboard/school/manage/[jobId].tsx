'use client'
import React, { useEffect } from 'react'
import { ConfigProvider, Space, Tabs, TabsProps, Tag } from 'antd'

import { PiCaretDownLight } from 'react-icons/pi'

import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import MatchedCard from '@/components/Dashboard/MatchedCard/MatchedCard'
import { getAppliedJobUsers } from '@/lib/api/matched'
import ScheduledCard from '@/components/Dashboard/ScheduledCard/ScheduledCard'
import { getScheduledJobUsers } from '@/lib/api/schedule'

const ManageJobTable = () => {
  const router = useRouter()
  const jobId = router.query.jobId
  const defaultKey = router.query.default

  const { data: mJob, isLoading } = useQuery({
    queryKey: [`job/${jobId}`],
    queryFn: async () => {
      const req = await getAppliedJobUsers(jobId as string)
      return req.data.applied
    },
  })
  const { data: sJob, isLoading: sLoading } = useQuery({
    queryKey: [`job/scheduled/${jobId}`],
    queryFn: async () => {
      const req = await getScheduledJobUsers(jobId as string)
      return req.data.scheduled
    },
  })

  const onChange = () => {}

  const items: TabsProps['items'] = [
    {
      key: '2',
      label: 'Matched',
      children: (
        <MatchedCard
          loading={isLoading}
          matchedJob={mJob}
          params={{ jobId: jobId as string }}
        />
      ),
    },
    {
      key: '3',
      label: 'Scheduled',
      children: (
        <ScheduledCard
          loading={isLoading}
          matchedJob={sJob}
          params={{ jobId: jobId as string }}
        />
      ),
    },
  ]

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            horizontalItemGutter: 52,
            titleFontSize: 14,
          },
        },
        token: {
          colorPrimary: '#050505',
          lineWidth: 0,
          lineWidthBold: 2,
        },
      }}
    >
      <Tag color="#E9E8E8" className="mb-5">
        <Space size={15} align="center">
          <span className="text-black">
            {mJob?.applied && mJob?.applied.length > 0
              ? mJob?.job?.job_title
              : ''}
          </span>
          <span>
            <PiCaretDownLight color="#000" />
          </span>
        </Space>
      </Tag>
      <Tabs
        defaultActiveKey={!defaultKey ? '2' : (defaultKey as string)}
        items={items}
        onChange={onChange}
      />
    </ConfigProvider>
  )
}

export default ManageJobTable
