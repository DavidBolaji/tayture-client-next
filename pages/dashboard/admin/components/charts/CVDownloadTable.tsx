import React from 'react'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'

interface CVDownload {
  userId: string
  userName: string
  downloadCount: number
  completedCount: number
}

interface Props {
  data: CVDownload[]
  isLoading: boolean
}

const CVDownloadTable: React.FC<Props> = ({ data, isLoading }) => {
  const columns: ColumnsType<CVDownload> = [
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Download Count',
      dataIndex: 'downloadCount',
      key: 'downloadCount',
    },
    {
      title: 'Completed Count',
      dataIndex: 'completedCount',
      key: 'completedCount',
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={isLoading}
      rowKey="userId"
    />
  )
}

export default CVDownloadTable