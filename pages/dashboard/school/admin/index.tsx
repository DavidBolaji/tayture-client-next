import React from 'react'
import CreateSchoolCard from '../../admin/components/schools/CreateSchoolCard'
import useMySchool from '@/hooks/useMySchool'
import { Table } from 'antd'

const SchoolAdminPage = () => {
  const { columns, my_schools, isPending } = useMySchool()
  return (
    <section>
      <div className="grid md:grid-cols-10 gap-5 mb-5">
        <div className="col-span-10">
          <CreateSchoolCard />
        </div>
      </div>
      <div>
        <Table
          loading={isPending}
          rowKey="sch_id"
          scroll={{ x: 700 }}
          dataSource={my_schools}
          columns={columns}
        />
      </div>
    </section>
  )
}

export default SchoolAdminPage
