import React from 'react'
import { Input, DatePicker, Space, Button } from 'antd'
import { SearchOutlined, ClearOutlined } from '@ant-design/icons'
import dayjs, { Dayjs } from 'dayjs'

const { RangePicker } = DatePicker

interface ApplicationsFiltersProps {
  search: string
  dateRange: [Dayjs | null, Dayjs | null]
  onSearchChange: (value: string) => void
  onDateRangeChange: (dates: [Dayjs | null, Dayjs | null]) => void
  onClearFilters: () => void
  loading?: boolean
}

const ApplicationsFilters: React.FC<ApplicationsFiltersProps> = ({
  search,
  dateRange,
  onSearchChange,
  onDateRangeChange,
  onClearFilters,
  loading = false
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm mb-4">
      <Space direction="vertical" size="middle" className="w-full">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="flex-1 min-w-0">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Applications
            </label>
            <Input
              placeholder="Search by first name, last name, or school name..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              prefix={<SearchOutlined className="text-gray-400" />}
              allowClear
              size="large"
              className="w-full"
            />
          </div>
          
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <RangePicker
              value={dateRange}
              onChange={(dates) => onDateRangeChange(dates as [Dayjs | null, Dayjs | null])}
              format="YYYY-MM-DD"
              size="large"
              placeholder={['Start Date', 'End Date']}
              className="w-full sm:w-auto"
            />
          </div>
          
          <Button
            icon={<ClearOutlined />}
            onClick={onClearFilters}
            disabled={loading}
            size="large"
            className="w-full sm:w-auto"
          >
            Clear Filters
          </Button>
        </div>
        
        {(search || (dateRange[0] && dateRange[1])) && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Active filters:</span>
            {search && <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded">Search: "{search}"</span>}
            {dateRange[0] && dateRange[1] && (
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded">
                Date: {dateRange[0].format('MMM DD, YYYY')} - {dateRange[1].format('MMM DD, YYYY')}
              </span>
            )}
          </div>
        )}
      </Space>
    </div>
  )
}

export default ApplicationsFilters