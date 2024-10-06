import useUser from '@/hooks/useUser'
import { Drawer, Table, Input, Empty, Select, Pagination } from 'antd'
import React from 'react'
import InfoGraphicUser from '../../components/charts/InfoGraphicUser'
import JobCard from '@/components/JobCard/JobCard'
import { IJobSchDb } from '@/pages/api/job/types'
import useAssign from '@/hooks/useAssign'

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
    refetch,
    jobDrawer,
    setJobDrawer,
    setUser,
    user,
  } = useUser()

  const {
    jobList,
    jobPending,
    handleFilterChange,
    onSearchChange,
    pageSize,
    onPageChange,
    currentPage,
    filterBy,
  } = useAssign()

  return (
    <section>
      <InfoGraphicUser />

      <div className="bg-white p-3">
        <div className="mb-2 flex gap-3">
          <Input.Search
            onChange={(e: { target: { value: string } }) =>
              handleSearch(e.target.value)
            }
            value={val}
          />
          <button
            onClick={() => refetch()}
            className="px-2 py-1 bg-orange rounded-md"
          >
            Refetch
          </button>
        </div>
        <Table
          loading={isUserPending || isPending}
          rowKey="id"
          scroll={{ x: 700 }}
          dataSource={allUsers}
          columns={columns}
        />
        <Drawer open={drawer} onClose={() => setDrawer(false)} title={title}>
          {drawerContent?.map((con, idx) => (
            //@ts-ignore
            <JobCard key={idx} job={con.job} />
          ))}
          {drawerContent?.length === 0 && (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </Drawer>
        <Drawer
          open={jobDrawer}
          onClose={() => {
            setUser(null)
            setJobDrawer(false)
          }}
          extra={
            <div
              className="flex justify-between items-center"
              style={{ marginBottom: 16 }}
            >
              <Input
                placeholder={`Search by ${filterBy}`}
                onChange={onSearchChange}
                allowClear
              />
              <Select
                defaultValue="job"
                style={{ width: 120, marginLeft: 8 }}
                onChange={handleFilterChange}
              >
                <Select.Option value="school">School</Select.Option>
                <Select.Option value="job">Job Name</Select.Option>
              </Select>
            </div>
          }
          footer={
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={jobList?.data?.total || 0}
              onChange={onPageChange}
              showSizeChanger
            />
          }
        >
          {jobList?.data?.job.length > 0 ? (
            jobList?.data?.job.map((j: IJobSchDb) => (
              <JobCard key={j.job_id} job={j} assign user={user} />
            ))
          ) : (
            <Empty description="No jobs found" />
          )}
        </Drawer>
      </div>
    </section>
  )
}

export default UserSection
