import { getClientJobs } from '@/lib/api/job'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { debounce } from 'lodash'
import React, { useCallback, useState } from 'react'

const useAssign = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBy, setFilterBy] = useState('job') // Default filter by school
  const [currentPage, setCurrentPage] = useState(1) // For pagination
  const [pageSize, setPageSize] = useState(10) // Page size for pagination

  const { data: jobList, isPending: jobPending } = useQuery({
    queryKey: ['jobs', searchTerm, filterBy, currentPage, pageSize],
    queryFn: async () => {
      const result = await getClientJobs({
        searchTerm,
        filterBy,
        currentPage,
        pageSize,
      })
      return result // Return only the data part of the Axios response
    },
    placeholderData: keepPreviousData, // This will now work as expected
  })

 
  // Debounce the search input
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value)
    }, 500),
    [],
  )

  // Handle search input changes
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(currentPage !== 1) {
        setCurrentPage(1)
    }
    debouncedSearch(e.target.value)
  }

  // Handle filter changes (school/job)
  const handleFilterChange = (value: string) => {
    setFilterBy(value)
  }

  // Handle pagination change
  const onPageChange = (page: number, pageSize: number) => {
    setCurrentPage(page)
    setPageSize(pageSize)
  }

  
  return {
    jobList,
    jobPending,
    handleFilterChange,
    onPageChange,
    onSearchChange,
    pageSize,
    currentPage,
    filterBy,
  }
}

export default useAssign
