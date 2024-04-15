import React from 'react'

interface BtnPaginationProps extends React.HTMLAttributes<HTMLDivElement>{
    page_num:string;
    class_name: string;
}

function BtnPagination({page_num,class_name, onClick}:BtnPaginationProps) {
  return (
    <span onClick={onClick} className={`inline-flex w-11 h-11 items-center justify-center rounded-full focus:outline-none ${class_name}`}>{page_num}</span>
)
}

export default BtnPagination