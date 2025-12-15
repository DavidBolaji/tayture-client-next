import React, { useState } from 'react'
import { Table, Modal, Button, Tag, Space, Tooltip, Spin } from 'antd'
import { EyeOutlined, FileTextOutlined, LoadingOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import type { Application } from '../hooks/useApplicationsList'
import styles from './ApplicationsTable.module.css'

interface ApplicationsTableProps {
  applications: Application[]
  loading: boolean
  pagination: {
    current: number
    pageSize: number
    total: number
    showSizeChanger: boolean
    showQuickJumper: boolean
    onChange: (page: number, pageSize: number) => void
  }
}

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
  applications,
  loading,
  pagination
}) => {
  const [cvModalVisible, setCvModalVisible] = useState(false)
  const [selectedCv, setSelectedCv] = useState<string | null>(null)
  const [cvLoading, setCvLoading] = useState(false)

  const handleViewCV = (cvUrl: string | null) => {
    if (cvUrl && cvUrl.trim() !== '') {
      setCvLoading(true)
      setCvModalVisible(true)
      
      // Ensure the URL is properly formatted for viewing, not downloading
      let viewUrl = cvUrl.trim()
      
      // If it's a Cloudinary URL, add view parameters
      if (viewUrl.includes('cloudinary.com')) {
        viewUrl = viewUrl.replace('/upload/', '/upload/fl_attachment/')
      }
      
      // For other URLs, try to prevent download by adding view parameters
      if (viewUrl.includes('.pdf')) {
        viewUrl = `${viewUrl}#view=FitH&toolbar=0`
      }
      
      setSelectedCv(viewUrl)
    } else {
      // Handle case where CV URL is empty or null
      console.warn('Attempted to view CV but URL is empty or null')
    }
  }

  const handleModalClose = () => {
    setCvModalVisible(false)
    setCvLoading(false)
    setSelectedCv(null)
  }

  const columns = [
    {
      title: 'Applicant',
      key: 'name',
      width: 140,
      render: (record: Application) => (
        <div>
          <div className="font-medium text-sm">
            {record.applicantFirstName} {record.applicantLastName}
          </div>
          <div className="text-xs text-gray-500">{record.applicantEmail}</div>
        </div>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'applicantPhone',
      key: 'phone',
      width: 110,
      render: (text: string) => (
        <span className="text-xs">{text}</span>
      ),
    },
    {
      title: 'School',
      dataIndex: 'schoolName',
      key: 'school',
      width: 160,
      ellipsis: {
        showTitle: false,
      },
      render: (text: string) => (
        <Tooltip placement="topLeft" title={text}>
          <span className="text-xs">{text}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Job Title',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      width: 180,
      ellipsis: {
        showTitle: false,
      },
      render: (text: string) => (
        <Tooltip placement="topLeft" title={text}>
          <span className="text-xs">{text}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Created',
      key: 'jobCreated',
      width: 100,
      render: (record: Application) => (
        <div>
          <div className="text-xs">
            {dayjs(record.jobCreatedAt).format('MMM DD, YYYY')}
          </div>
          <div className="text-xs text-gray-500">
            {dayjs(record.jobCreatedAt).format('HH:mm')}
          </div>
        </div>
      ),
    },
    {
      title: 'Deadline',
      key: 'deadline',
      width: 100,
      render: (record: Application) => {
        const isOverdue = dayjs(record.jobDeadline).isBefore(dayjs())
        return (
          <div>
            <div className={`text-xs ${isOverdue ? 'text-red-500' : ''}`}>
              {dayjs(record.jobDeadline).format('MMM DD, YYYY')}
            </div>
            <div className="text-xs text-gray-500">
              {dayjs(record.jobDeadline).format('HH:mm')}
            </div>
            {isOverdue && (
              <Tag color="red" className="text-xs">Overdue</Tag>
            )}
          </div>
        )
      },
    },
    {
      title: 'Applied',
      key: 'applied',
      width: 100,
      render: (record: Application) => (
        <div>
          <div className="text-xs">
            {dayjs(record.applicationDate).format('MMM DD, YYYY')}
          </div>
          <div className="text-xs text-gray-500">
            {dayjs(record.applicationDate).format('HH:mm')}
          </div>
        </div>
      ),
    },
    {
      title: 'CV',
      key: 'cv',
      width: 80,
      align: 'center' as const,
      render: (record: Application) => (
        <Space>
          {record.cv && record.cv.trim() !== '' ? (
            <Tooltip title="Click to view CV">
              <Button
                type="text"
                icon={<EyeOutlined />}
                onClick={() => handleViewCV(record.cv)}
                className="text-blue-600 hover:text-blue-800"
                size="small"
              />
            </Tooltip>
          ) : (
            <Tooltip title="No CV uploaded">
              <div className="flex items-center justify-center">
                <FileTextOutlined className="text-gray-400" />
                <span className="text-xs text-red-500 ml-1">Missing</span>
              </div>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={applications}
        loading={loading}
        pagination={pagination}
        rowKey="id"
        scroll={{ x: 1000 }}
        size="small"
        className={`bg-white rounded-lg shadow-sm ${styles.compactTable}`}
      />

      <Modal
        title="CV Preview"
        open={cvModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width="90%"
        style={{ top: 20 }}
        styles={{ body: { padding: 0, height: '85vh' } }}
        destroyOnClose
      >
        {cvLoading && (
          <div className={styles.loadingContainer}>
            <Spin 
              size="large" 
              indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            />
            <div className={styles.loadingText}>Loading CV...</div>
          </div>
        )}
        {selectedCv && (
          <div style={{ width: '100%', height: '100%' }}>
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(selectedCv)}&embedded=true`}
              style={{ 
                width: '100%', 
                height: '100%', 
                border: 'none',
                display: cvLoading ? 'none' : 'block'
              }}
              title="CV Preview"
              onLoad={() => setCvLoading(false)}
              onError={() => {
                setCvLoading(false)
                // Fallback to direct view if Google Viewer fails
                const iframe = document.querySelector('iframe[title="CV Preview"]') as HTMLIFrameElement
                if (iframe) {
                  iframe.src = selectedCv
                }
              }}
            />
          </div>
        )}
      </Modal>
    </>
  )
}

export default ApplicationsTable