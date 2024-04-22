import ScheduledCard from '@/components/Dashboard/ScheduledCard/ScheduledCard'
import AllJobCard from '@/components/JobCard/AllJobCard'

import { Hired, Job, School } from '@prisma/client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ConfigProvider, Tabs, TabsProps } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

const ManageAllPage:React.FC = (props) => {
    const router = useRouter() 
    const queryClient = useQueryClient();
    const school = queryClient.getQueryData(['school']) as School & {job: (Job & {hired: Hired[]})[]}
    const onChange = () => {}
  
    const items: TabsProps['items'] = [
      {
        key: 'all',
        label: 'All jobs',
        children: (
          <AllJobCard job={school.job} />
        ),
      }
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
        <Tabs
          defaultActiveKey={'all'}
          items={items}
          onChange={onChange}
        />
      </ConfigProvider>
    )
}

export default ManageAllPage