import React from 'react'
import CVInfoGraphic from '../../components/charts/CVInfoGraphic'

import { useCVDownloads } from '@/hooks/useCVDownloads'
import CVDownloadTable from '../../components/charts/CVDownloadTable'
import CVDateRangeFilter from '../../components/charts/CVDataRangeFilter'

const CVSection: React.FC = () => {
  const {
    cvStats,
    cvDownloads,
    dateRange,
    setDateRange,
    isLoading,
    error
  } = useCVDownloads()

  if (error) return <div>Error loading CV download data</div>

  return (
    <section>
      <CVInfoGraphic stats={cvStats} />
      <CVDateRangeFilter dateRange={dateRange} setDateRange={setDateRange} />
      <CVDownloadTable data={cvDownloads} isLoading={isLoading} />
    </section>
  )
}

export default CVSection