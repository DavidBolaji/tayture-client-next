import React, { useState } from 'react'
import BtnPagination from './BtnPagination'

interface PaginationProps {}

function Pagination({}: PaginationProps) {
  const [activeButton, updateActiveButton] = useState(1)

  function handleClick(btnPos) {
    updateActiveButton(btnPos)
  }

  return (
    <nav className="nc-Pagination inline-flex space-x-1 text-base font-medium">
      <BtnPagination
        class_name={
          activeButton === 1
            ? 'bg-black text-white'
            : 'bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000'
        }
        page_num="1"
        onClick={() => handleClick(1)}
      />
      <BtnPagination
        class_name={
          activeButton === 2
            ? 'bg-black text-white'
            : 'bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000'
        }
        page_num="2"
        onClick={() => handleClick(2)}
      />
      <BtnPagination
        class_name={
          activeButton === 3
            ? 'bg-black text-white'
            : 'bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000'
        }
        page_num="3"
        onClick={() => handleClick(3)}
      />
      <BtnPagination
        class_name={
          activeButton === 4
            ? 'bg-black text-white'
            : 'bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000'
        }
        page_num="4"
        onClick={() => handleClick(4)}
      />
    </nav>
  )
}

export default Pagination
