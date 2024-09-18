import ScheduledCard from '@/components/Dashboard/ScheduledCard/ScheduledCard'
import AllJobCard from '@/components/JobCard/AllJobCard'

import { Hired, Job, School } from '@prisma/client'
import {  useQuery, useQueryClient } from '@tanstack/react-query'
import { ConfigProvider, Tabs, TabsProps } from 'antd'
import React from 'react'

const ManageAllPage:React.FC = (props) => {
    const queryClient = useQueryClient();
    const {data: school} = useQuery({
      queryKey: ['school'],
      queryFn: () => queryClient.getQueryData(['school']) as School & {job: (Job & {hired: Hired[]})[]}
    })
 
  
    const items: TabsProps['items'] = [
      {
        key: 'all',
        label: 'All jobs',
        children: (
          <AllJobCard job={school!.job} />
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
          onChange={() => {}}
        />
      </ConfigProvider>
    )
}

export default ManageAllPage