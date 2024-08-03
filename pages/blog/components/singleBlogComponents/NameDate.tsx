import React from 'react'

interface NameDateProps {
  commentorName: string;
  commentDate: string;
}

function NameDate({ commentorName, commentDate }: NameDateProps) {
  return (
    <div className='flex pr-6 items-center'>
      <p className="flex-shrink-0 font-semibold text-neutral-800">
        {commentorName}
      </p>
      <p className="mx-2">-</p>
      <p className="text-neutral-500 text-xs line-clamp-1 sm:text-sm">
        {commentDate}
      </p>
    </div>
  )
}

export default NameDate
