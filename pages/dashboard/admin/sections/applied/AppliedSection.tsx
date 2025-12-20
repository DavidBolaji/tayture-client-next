import React, { useState, useCallback, useMemo } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Field, Form, Formik } from 'formik'
import { Tabs } from 'antd'
import { DownloadOutlined, TableOutlined } from '@ant-design/icons'
import DateInput from '@/components/Form/DateInput/DateInput'
import * as Yup from 'yup'
import Button from '@/components/Button/Button'
import Spinner from '@/components/Spinner/Spinner'
import useDownloadCSV from '../../hooks/useDownloadCSV'
import useApplicationsList from '../../hooks/useApplicationsList'
import { SelectInput } from '@/components/Form/SelectInput/SelectInput'
import { useQueryClient } from '@tanstack/react-query'
import { School } from '@prisma/client'
import ApplicationsTable from '../../components/ApplicationsTable'
import ApplicationsFilters from '../../components/ApplicationsFilters'
import ApplicationsStats from '../../components/ApplicationsStats'

dayjs.extend(utc)
dayjs().utcOffset('local')

export const ValidationSchema = Yup.object().shape({
  start: Yup.date().required('Start date is required'),
  end: Yup.date()
    .required('End date is required')
    .min(Yup.ref('start'), 'End date must be later than start date'),
  school: Yup.string().notRequired()
})

const AppliedSection = () => {
  // CSV Download state
  const { isPending, handleSubmit } = useDownloadCSV()
  const queryClient = useQueryClient()
  const schools = queryClient.getQueryData(['allSchools']) as School[]

  // Table view state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState('')
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null])

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState('')
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setCurrentPage(1) // Reset to first page on search
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  // Applications list query
  const { data: applicationsData, isLoading } = useApplicationsList({
    page: currentPage,
    limit: pageSize,
    search: debouncedSearch,
    startDate: dateRange[0]?.format('YYYY-MM-DD'),
    endDate: dateRange[1]?.format('YYYY-MM-DD')
  })

  const schoolList = schools?.map(sch => ({
    label: sch.sch_id,
    value: sch.sch_name,
    key: sch.sch_id
  })) || []

  const handlePageChange = useCallback((page: number, size: number) => {
    setCurrentPage(page)
    setPageSize(size)
  }, [])

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
  }, [])

  const handleDateRangeChange = useCallback((dates: [Dayjs | null, Dayjs | null]) => {
    setDateRange(dates)
    setCurrentPage(1) // Reset to first page on filter change
  }, [])

  const handleClearFilters = useCallback(() => {
    setSearch('')
    setDateRange([null, null])
    setCurrentPage(1)
  }, [])

  // Statistics - now using total stats from API instead of current page data
  const stats = useMemo(() => {
    if (!applicationsData) return null
    
    const { totalStats } = applicationsData
    const cvPercentage = totalStats.totalApplications > 0 
      ? Math.round((totalStats.applicationsWithCV / totalStats.totalApplications) * 100) 
      : 0
    
    return {
      totalApplications: totalStats.totalApplications,
      applicationsWithCV: totalStats.applicationsWithCV,
      applicationsWithoutCV: totalStats.applicationsWithoutCV,
      uniqueSchools: totalStats.uniqueSchools,
      cvPercentage,
      currentPageTotal: applicationsData.applications.length
    }
  }, [applicationsData])

  const tabItems = [
    {
      key: 'table',
      label: (
        <span>
          <TableOutlined /> {' '}
          Applications Log
        </span>
      ),
      children: (
        <div className="space-y-4">
          {/* Statistics Cards */}
          <ApplicationsStats
            stats={stats}
            currentPage={currentPage}
            totalPages={applicationsData?.pagination.totalPages || 1}
            loading={isLoading}
          />

          {/* Filters */}
          <ApplicationsFilters
            search={search}
            dateRange={dateRange}
            onSearchChange={handleSearchChange}
            onDateRangeChange={handleDateRangeChange}
            onClearFilters={handleClearFilters}
            loading={isLoading}
          />

          {/* Applications Table */}
          <ApplicationsTable
            applications={applicationsData?.applications || []}
            loading={isLoading}
            pagination={{
              current: currentPage,
              pageSize,
              total: applicationsData?.pagination.totalCount || 0,
              showSizeChanger: true,
              showQuickJumper: true,
              onChange: handlePageChange,
            }}
          />
        </div>
      ),
    },
    {
      key: 'download',
      label: (
        <span>
          <DownloadOutlined />
          Download CSV
        </span>
      ),
      children: (
        <div>
          <h2 className="mb-4 ml-1 uppercase">Download CSV</h2>
          <Formik
            enableReinitialize
            validateOnMount
            onSubmit={handleSubmit}
            validationSchema={ValidationSchema}
            initialValues={{
              start: '',
              end: '',
              school: ''
            }}
          >
            {({ handleSubmit, isValid }) => (
              <Form onSubmit={handleSubmit} className="w-96 -space-y-4">
                <div>
                  <label htmlFor="start" className="ml-1">
                    Start Date
                  </label>
                  <Field
                    name="start"
                    as={DateInput}
                    picker="date"
                    format="YYYY-MM-DD"
                    disabled={false}
                    minDate={null}
                    placeholder="MM/DD/YYYY"
                  />
                </div>
                <div>
                  <label htmlFor="end" className="ml-1">
                    End Date
                  </label>
                  <Field
                    name="end"
                    as={DateInput}
                    picker="date"
                    format="YYYY-MM-DD"
                    disabled={false}
                    minDate={null}
                    placeholder="MM/DD/YYYY"
                  />
                </div>
                <div>
                  <label htmlFor="school" className="ml-1">
                    School
                  </label>
                  <Field
                    name="school"
                    option={schoolList}
                    as={SelectInput}
                    placeholder={'Select School'}
                  />
                </div>
                <Button
                  disabled={!isValid}
                  bold={false}
                  hover={isValid}
                  text={isPending ? <Spinner /> : 'Download CSV'}
                  render="light"
                  full={false}
                  type="submit"
                />
              </Form>
            )}
          </Formik>
        </div>
      ),
    },
  ]

  return (
    <div>
      <Tabs
        defaultActiveKey="table"
        items={tabItems}
        className="bg-white rounded-lg px-4"
      />
    </div>
  )
}

export default AppliedSection
