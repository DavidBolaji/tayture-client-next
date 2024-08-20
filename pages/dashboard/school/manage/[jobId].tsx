'use client'
import React, { useEffect, useState } from 'react'
import { ConfigProvider, Space, Tabs, TabsProps, Tag } from 'antd'

import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import MatchedCard from '@/components/Dashboard/MatchedCard/MatchedCard'
import { getAppliedJobUsers } from '@/lib/api/matched'
import ScheduledCard from '@/components/Dashboard/ScheduledCard/ScheduledCard'
import { getScheduledJobUsers } from '@/lib/api/schedule'
import { regularFont } from '@/assets/fonts/fonts'
import { useGlobalContext } from '@/Context/store'

const ManageJobTable:React.FC = (props) => {
  const router = useRouter()
  const jobId = router.query.jobId
  const [key, setKey] = useState('2')
  const { access } = useGlobalContext();

  const { data: mJob, isLoading } = useQuery({
    queryKey: [`job/${jobId}`],
    queryFn: async () => {
      const req = await getAppliedJobUsers(jobId as string)
      return req.data.applied
    },
    enabled: !!jobId,
  })
  const { data: sJob, isLoading: sLoading } = useQuery({
    queryKey: [`job/scheduled/${jobId}`],
    queryFn: async () => {
      const req = await getScheduledJobUsers(jobId as string)
      return req.data.scheduled
    },
    enabled: !!jobId
  })

  const onChange = (ke: any) => {
    setKey(ke);
  }

  useEffect(() => {
    if(router.query.default) {
      setKey(router.query.default as string)
    }
    if(!access) {
      router.push('/dashboard/school')
    }
  }, [router, access])



  const items: TabsProps['items'] = [
    {
      key: '2',
      label: "Applicants",
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
      label: 'Interviews',
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
          <span className={` ${regularFont.className} text-black text-[14px]`}>
            {mJob?.applied && mJob?.applied.length > 0
              ? mJob?.job?.job_title
              : ''}
          </span>
        </Space>
      </Tag>
      <Tabs
        key={key}
        defaultActiveKey={key}
        items={items}
        onChange={onChange}
      />
    </ConfigProvider>
  )
}

export default ManageJobTable
