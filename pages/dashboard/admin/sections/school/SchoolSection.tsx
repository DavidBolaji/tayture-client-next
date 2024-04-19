import useSchool from '@/hooks/useSchool'
import { Table } from 'antd'
import React from 'react'

const SchoolSection = () => {
  const { admin_schools, columns } = useSchool()

  return (
   <section>
      <div>
        {admin_schools && (
          <Table
            rowKey="sch_id"
            scroll={{ x: 700 }}
            dataSource={admin_schools}
            columns={columns}
          />
        )}
      </div>
    </section>
  )
}

export default SchoolSection
