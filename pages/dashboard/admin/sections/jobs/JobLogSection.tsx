import React, { useState } from 'react'
import { Card, Input, Select, Space, Typography, Statistic, Row, Col, Tag, Pagination, Table, Button, Tooltip } from 'antd'
import { SearchOutlined, EyeOutlined, EyeInvisibleOutlined, CalendarOutlined, UserOutlined, BankOutlined, DollarOutlined, AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { format } from 'date-fns'
import useJobLog from '../../hooks/useJobLog'

const { Title, Text } = Typography
const { Option } = Select

const JobLogSection = () => {
  const { jobs: rawJobs, isLoading, error, columns } = useJobLog()
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [schoolFilter, setSchoolFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

  // Ensure jobs is always an array
  const jobs = rawJobs || []

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = searchText === '' || 
                         job.job_title.toLowerCase().includes(searchText.toLowerCase()) ||
                         job.school.sch_name.toLowerCase().includes(searchText.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'visible' && job.isVisible) ||
                         (statusFilter === 'hidden' && !job.isVisible)
    
    const matchesSchool = schoolFilter === 'all' ||
                         (schoolFilter === 'approved' && job.schoolStatus === 'Approved') ||
                         (schoolFilter === 'pending' && job.schoolStatus === 'Pending')
    
    return matchesSearch && matchesStatus && matchesSchool
  })

  // Debug logging
  console.log('Jobs data:', jobs.length)
  console.log('Filtered jobs:', filteredJobs.length)
  console.log('Search text:', searchText)
  console.log('Status filter:', statusFilter)
  console.log('School filter:', schoolFilter)

  // Paginate filtered jobs
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex)

  // Calculate statistics
  const stats = {
    total: jobs.length,
    visible: jobs.filter(job => job.isVisible).length,
    hidden: jobs.filter(job => !job.isVisible).length,
  }

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page)
    if (size) setPageSize(size)
  }

  if (error) {
    return (
      <Card>
        <div className="text-center text-red-500 py-8">
          Error loading job log. Please try again.
        </div>
      </Card>
    )
  }

  // Table columns configuration
  const tableColumns = [
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      key: 'job_title',
      width: 200,
      render: (text: string) => (
        <Tooltip title={text}>
          <Text className="font-medium" style={{ maxWidth: 180 }}>
            {text}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: 'School',
      dataIndex: ['school', 'sch_name'],
      key: 'school_name',
      width: 180,
      render: (text: string, record: any) => (
        <div>
          <Text className="block font-medium" style={{ maxWidth: 160 }}>
            {text}
          </Text>
          <Tag 
            color={record.schoolStatus === 'Approved' ? 'green' : 'orange'}
          >
            {record.schoolStatus}
          </Tag>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isVisible',
      key: 'status',
      width: 100,
      render: (isVisible: boolean) => (
        <Tag 
          icon={isVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          color={isVisible ? 'green' : 'red'}
        >
          {isVisible ? 'Visible' : 'Hidden'}
        </Tag>
      ),
    },
    {
      title: 'Experience',
      dataIndex: 'job_exp',
      key: 'experience',
      width: 120,
      render: (text: string) => (
        <Text className="text-green-600 font-medium">{text}</Text>
      ),
    },
    {
      title: 'Qualification',
      dataIndex: 'job_qual',
      key: 'qualification',
      width: 150,
      render: (text: string) => (
        <Tooltip title={text}>
          <Text className="text-purple-600" style={{ maxWidth: 130 }}>
            {text}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: 'Salary Range',
      key: 'salary',
      width: 150,
      render: (record: any) => (
        <Text className="text-gray-900 font-medium">
          ₦{parseInt(record.job_min_sal).toLocaleString()} - ₦{parseInt(record.job_max_sal).toLocaleString()}
        </Text>
      ),
    },
    {
      title: 'Vacancy',
      dataIndex: 'job_no_hires',
      key: 'vacancy',
      width: 80,
      render: (text: number) => (
        <Text className="text-blue-600 font-medium">{text}</Text>
      ),
    },
    {
      title: 'Applications',
      dataIndex: 'applicationCount',
      key: 'applications',
      width: 100,
      render: (count: number) => (
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
          {count}
        </span>
      ),
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      width: 120,
      render: (date: string) => (
        <div className="flex items-center">
          <CalendarOutlined className="text-red-500 mr-1" />
          <Text className="text-red-600 font-medium">
            {format(new Date(date), 'MMM dd, yyyy')}
          </Text>
        </div>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'created',
      width: 120,
      render: (date: string) => (
        <div>
          <div className="text-sm">{format(new Date(date), 'MMM dd, yyyy')}</div>
          <div className="text-xs text-gray-400">{format(new Date(date), 'HH:mm')}</div>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Jobs"
              value={stats.total}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Visible Jobs"
              value={stats.visible}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Hidden Jobs"
              value={stats.hidden}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters and Search */}
      <Card className="mb-6">
        <div className="mb-4">
          <Title level={4} className="mb-4">Job Log</Title>
          
          {/* Filters */}
          <Space className="mb-4" wrap>
            <Input
              placeholder="Search jobs or schools..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 250 }}
              allowClear
            />
            
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 150 }}
              placeholder="Filter by status"
            >
              <Option value="all">All Status</Option>
              <Option value="visible">Visible</Option>
              <Option value="hidden">Hidden</Option>
            </Select>
            
            <Select
              value={schoolFilter}
              onChange={setSchoolFilter}
              style={{ width: 150 }}
              placeholder="Filter by school"
            >
              <Option value="all">All Schools</Option>
              <Option value="approved">Approved</Option>
              <Option value="pending">Pending</Option>
            </Select>

            <button
              onClick={() => {
                setSearchText('')
                setStatusFilter('all')
                setSchoolFilter('all')
                setCurrentPage(1)
              }}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded border"
            >
              Clear Filters
            </button>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded">
              <Button
                type={viewMode === 'grid' ? 'primary' : 'default'}
                icon={<AppstoreOutlined />}
                onClick={() => setViewMode('grid')}
                size="small"
                className="border-0 rounded-r-none"
              >
                Grid
              </Button>
              <Button
                type={viewMode === 'table' ? 'primary' : 'default'}
                icon={<UnorderedListOutlined />}
                onClick={() => setViewMode('table')}
                size="small"
                className="border-0 rounded-l-none"
              >
                Table
              </Button>
            </div>
          </Space>

          <div className="text-sm text-gray-600 mb-2">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </div>
        </div>
      </Card>

      {/* Job Cards Grid - 3 Columns */}
      {isLoading ? (
        <Card>
          <div className="text-center py-12">
            <div className="text-gray-500">Loading jobs...</div>
          </div>
        </Card>
      ) : error ? (
        <Card>
          <div className="text-center py-12">
            <div className="text-red-500">Error loading jobs: {typeof error === 'string' ? error : 'Unknown error'}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </Card>
      ) : viewMode === 'grid' ? (
        <>
          <Row gutter={[16, 16]}>
            {paginatedJobs.map((job) => (
              <Col xs={24} sm={24} md={8} key={job.job_id}>
                <Card
                  className="h-full hover:shadow-lg transition-shadow duration-200"
                  styles={{ body: { padding: '16px' } }}
                >
                  {/* Header with Status and Date */}
                  <div className="flex justify-between items-start mb-3">
                    <Tag 
                      icon={job.isVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      color={job.isVisible ? 'green' : 'red'}
                    >
                      {job.isVisible ? 'Visible' : 'Hidden'}
                    </Tag>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">
                        {format(new Date(job.createdAt), 'MMM dd, yyyy')}
                      </div>
                      <div className="text-xs text-gray-400">
                        {format(new Date(job.createdAt), 'HH:mm')}
                      </div>
                    </div>
                  </div>

                  {/* Job Title */}
                  <Title level={5} className="mb-3 line-clamp-2" title={job.job_title}>
                    {job.job_title}
                  </Title>

                  {/* School Info */}
                  <div className="flex items-center mb-3 pb-2 border-b border-gray-100">
                    <BankOutlined className="text-gray-400 mr-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <Text className="text-sm font-medium block truncate" title={job.school.sch_name}>
                        {job.school.sch_name}
                      </Text>
                      <Tag 
                        color={job.schoolStatus === 'Approved' ? 'green' : 'orange'}
                        className="mt-1"
                      >
                        {job.schoolStatus}
                      </Tag>
                    </div>
                  </div>

                  {/* Job Details Grid */}
                  <div className="space-y-2">
                    {/* Experience & Vacancy */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Text className="text-xs text-gray-500 block">Experience</Text>
                        <Text className="text-sm font-medium text-green-600">{job.job_exp}</Text>
                      </div>
                      <div>
                        <Text className="text-xs text-gray-500 block">Vacancy</Text>
                        <Text className="text-sm font-medium text-blue-600">{job.job_no_hires}</Text>
                      </div>
                    </div>

                    {/* Qualification */}
                    <div>
                      <Text className="text-xs text-gray-500 block">Qualification</Text>
                      <Text className="text-sm font-medium text-purple-600 truncate block" title={job.job_qual}>
                        {job.job_qual}
                      </Text>
                    </div>

                    {/* Deadline */}
                    <div>
                      <Text className="text-xs text-gray-500 block">Deadline</Text>
                      <div className="flex items-center">
                        <CalendarOutlined className="text-red-500 mr-1" />
                        <Text className="text-sm font-medium text-red-600">
                          {format(new Date(job.deadline), 'MMM dd, yyyy')}
                        </Text>
                      </div>
                    </div>

                    {/* Salary Range */}
                    <div>
                      <Text className="text-xs text-gray-500 block">Salary Range</Text>
                      <div className="flex items-center">
                        <DollarOutlined className="text-green-500 mr-1" />
                        <Text className="text-sm font-medium text-gray-900">
                          ₦{parseInt(job.job_min_sal).toLocaleString()} - ₦{parseInt(job.job_max_sal).toLocaleString()}
                        </Text>
                      </div>
                    </div>

                    {/* Applications Count */}
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <UserOutlined className="text-gray-400 mr-1" />
                          <Text className="text-xs text-gray-500">Applications</Text>
                        </div>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          {job.applicationCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Empty State */}
          {filteredJobs.length === 0 && (
            <Card>
              <div className="text-center py-12">
                <Text className="text-gray-500">No jobs found matching your criteria.</Text>
              </div>
            </Card>
          )}
        </>
      ) : (
        /* Table View */
        <Card>
          <Table
            columns={tableColumns}
            dataSource={paginatedJobs}
            rowKey="job_id"
            pagination={false}
            loading={isLoading}
            scroll={{ x: 1200 }}
            size="small"
            locale={{
              emptyText: filteredJobs.length === 0 ? 'No jobs found matching your criteria.' : 'No data'
            }}
          />
        </Card>
      )}

      {/* Pagination */}
      {filteredJobs.length > 0 && (
        <div className="flex justify-center mt-6">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredJobs.length}
            onChange={handlePageChange}
            showSizeChanger
            showQuickJumper
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} jobs`
            }
            pageSizeOptions={['12', '24', '48']}
          />
        </div>
      )}
    </div>
  )
}

export default JobLogSection