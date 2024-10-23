import React from 'react'
import { DatePicker } from 'antd'

const { RangePicker } = DatePicker

interface Props {
  dateRange: [Date | null, Date | null]
  setDateRange: (dates: [Date | null, Date | null]) => void
}

const CVDateRangeFilter: React.FC<Props> = ({ dateRange, setDateRange }) => {
  return (
    <div className="mb-4">
      <RangePicker
        value={dateRange as any}
        onChange={(dates) => setDateRange(dates as [Date | null, Date | null])}
      />
    </div>
  )
}

export default CVDateRangeFilter