import { Table } from 'antd'
import React from 'react'
import useCoupoun from '../../hooks/useCoupoun'
import CreateCoupounCard from '../../components/jobs/coupoun/CreateCoupounCard'

const JobsSection = () => {
  const {
    coupoun,
    columns,
    isPending,
    isDeleting,
  } = useCoupoun()
  return (
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
  )
}

export default JobsSection