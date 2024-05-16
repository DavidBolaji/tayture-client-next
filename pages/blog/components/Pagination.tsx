import React from 'react'
import BtnPagination from './BtnPagination'

interface PaginationProps {
  total_pages: number
  currentPage: number
  onPageChange: (pageNumber: number) => void
}

function Pagination({
  total_pages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <nav className="nc-Pagination inline-flex space-x-1 text-base font-medium">
      {[...Array(total_pages)].map((_, index) => (
        <BtnPagination
          key={index}
          page_num={index + 1}
          isActive={currentPage === index + 1}
          onClick={() => onPageChange(index + 1)}
        />
      ))}
    </nav>
  )
}

export default Pagination
