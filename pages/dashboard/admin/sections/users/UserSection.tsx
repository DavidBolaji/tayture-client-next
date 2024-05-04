import useUser from '@/hooks/useUser'
import { Drawer, Table, Input, Empty } from 'antd'
import React from 'react'
import InfoGraphicUser from '../../components/charts/InfoGraphicUser'
import JobCard from '@/components/JobCard/JobCard'

const UserSection = () => {
  const {
    allUsers,
    isUserPending,
    isPending,
    columns,
    drawer,
    setDrawer,
    title,
    drawerContent,
    val,
    handleSearch,
    refetch
  } = useUser()

  return (
    <section>
      <InfoGraphicUser />
      
      <div className='bg-white p-3'>
        <div className='mb-2 flex gap-3'>
          <Input.Search 
            onChange={(e: { target: { value: string } }) => handleSearch(e.target.value)}
            value={val}
          />
          <button onClick={() => refetch()} className='px-2 py-1 bg-orange rounded-md'>Refetch</button>
        </div>
        <Table
          loading={isUserPending || isPending}
          rowKey="id"
          scroll={{ x: 700 }}
          dataSource={allUsers}
          columns={columns}
        />
        <Drawer
          open={drawer}
          onClose={() => setDrawer(false)}
          title={title}
        >
          {drawerContent?.map((con) => (
            //@ts-ignore
            <JobCard job={con.job} />
          ))}
          {drawerContent?.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        </Drawer>
      </div>
    </section>
  )
}

export default UserSection
