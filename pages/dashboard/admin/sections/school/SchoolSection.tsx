import useSchool from '@/hooks/useSchool'
import { Drawer, Empty, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import CreateSchoolCard from '../../components/schools/CreateSchoolCard'
import EditSchoolCard from '../../components/schools/EditSchoolCard'
import InfoGraphicSchool from '../../components/charts/InfoGraphicSchool'
import useAnalyticsSchool from '@/hooks/useAnalyticsSchool'

const SchoolSection = () => {
  const { admin_schools, columns, count, setCount } = useSchool()
  const {
    allSchools,
    analytics_columns,
    analytics_pending,
    isSchoolPending,
    drawer,
    drawerContent,
    setDrawer,
    title
  } = useAnalyticsSchool()

  return (
    <section>
      <InfoGraphicSchool />
      <Table
        loading={analytics_pending || isSchoolPending}
        rowKey="sch_id"
        scroll={{ x: 700 }}
        dataSource={allSchools}
        columns={analytics_columns}
      />
      <div className="grid md:grid-cols-10 gap-5 mb-5">
        <div className="col-span-5">
          <CreateSchoolCard />
        </div>
        <div className="col-span-5">
          <EditSchoolCard count={count} setCount={setCount} />
        </div>
      </div>
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
      <Drawer open={drawer} onClose={() => setDrawer(false)} title={title}>
        {drawerContent?.map((con) => (
          //@ts-ignore
          // <JobCard job={con.job} />
          <h1>hi</h1>
        ))}
        {drawerContent?.length === 0 && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Drawer>
    </section>
  )
}

export default SchoolSection
