import { Table, Tabs } from 'antd'
import React from 'react'
import { UnorderedListOutlined, TagOutlined } from '@ant-design/icons'
import useCoupoun from '../../hooks/useCoupoun'
import CreateCoupounCard from '../../components/jobs/coupoun/CreateCoupounCard'
import JobLogSection from './JobLogSection'

const { TabPane } = Tabs

const JobsSection = () => {
  const {
    coupoun,
    columns,
    isPending,
    isDeleting,
  } = useCoupoun()

  return (
    <div>
      <Tabs defaultActiveKey="job-log" type="card">
        <TabPane 
          tab={
            <span>
              <UnorderedListOutlined />
              Job Log
            </span>
          } 
          key="job-log"
        >
          <JobLogSection />
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <TagOutlined />
              Coupons
            </span>
          } 
          key="coupons"
        >
          <section className="grid grid-cols-10 gap-5">
            <div className="col-span-10 md:col-span-5">
              <CreateCoupounCard />
            </div>
            <div className="col-span-10">
              <Table
                rowKey="id"
                scroll={{ x: 700 }}
                dataSource={coupoun}
                columns={columns}
                loading={isPending || isDeleting}
                size="small"
              />
            </div>
          </section>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default JobsSection