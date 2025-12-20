import React from 'react'
import { Card, Statistic, Row, Col, Skeleton } from 'antd'
import { FileTextOutlined, UserOutlined, BankOutlined, EyeOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

interface ApplicationsStatsProps {
  stats: {
    totalApplications: number
    applicationsWithCV: number
    applicationsWithoutCV: number
    uniqueSchools: number
    cvPercentage: number
    currentPageTotal: number
  } | null
  currentPage: number
  totalPages: number
  loading?: boolean
}

const ApplicationsStats: React.FC<ApplicationsStatsProps> = ({
  stats,
  currentPage,
  totalPages,
  loading = false
}) => {
  if (loading) {
    return (
      <Row gutter={16} className="mb-6">
        {[1, 2, 3, 4].map((i) => (
          <Col xs={24} sm={12} md={6} key={i}>
            <Card>
              <Skeleton active paragraph={{ rows: 1 }} />
            </Card>
          </Col>
        ))}
      </Row>
    )
  }

  if (!stats) {
    return null
  }

  return (
    <Row gutter={16} className="mb-6">
      <Col xs={24} sm={12} lg={6}>
        <Card className="hover:shadow-md transition-shadow">
          <Statistic
            title="Total Applications"
            value={stats.totalApplications}
            prefix={<FileTextOutlined className="text-blue-600" />}
            valueStyle={{ color: '#1890ff' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card className="hover:shadow-md transition-shadow">
          <Statistic
            title="With CV (Total)"
            value={stats.applicationsWithCV}
            suffix={`(${stats.cvPercentage}%)`}
            prefix={<UserOutlined className="text-green-600" />}
            valueStyle={{ color: '#52c41a' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card className="hover:shadow-md transition-shadow">
          <Statistic
            title="Without CV (Total)"
            value={stats.applicationsWithoutCV}
            suffix={`(${100 - stats.cvPercentage}%)`}
            prefix={<ExclamationCircleOutlined className="text-red-600" />}
            valueStyle={{ color: '#ff4d4f' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card className="hover:shadow-md transition-shadow">
          <Statistic
            title="Unique Schools (Total)"
            value={stats.uniqueSchools}
            prefix={<BankOutlined className="text-purple-600" />}
            valueStyle={{ color: '#722ed1' }}
          />
        </Card>
      </Col>
    </Row>
  )
}

export default ApplicationsStats