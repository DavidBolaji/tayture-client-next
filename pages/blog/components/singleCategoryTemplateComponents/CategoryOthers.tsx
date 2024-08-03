import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'

function CategoryOthers() {
  return (
    <div>
        <button className='flex-shrink-0 relative h-auto inline-flex items-center justify-center rounded-full transition-colors border-transparent bg-white ring-1 ring-neutral-300 hover:ring-neutral-400 text-sm font-medium py-3 px-4 sm:py-3.5 sm:px-6'>
            <div ><span className="hidden sm:inline">Other </span>Categories</div>
            <span ><IoIosArrowDown className='w-4 h-4 ml-2 -mr-1 text-[1.5rem]'/></span>
        </button>
    </div>
  )
}

export default CategoryOthers