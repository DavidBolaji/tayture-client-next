import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { MdDeleteOutline } from 'react-icons/md'
import { useState } from 'react'


function SubMenuComment() {
  const [is_subMenu, updateSubMenu] = useState(false)

  function handleContCLick(){
    updateSubMenu(!is_subMenu)
  }
  return (
    <div className="absolute -right-3" onClick={handleContCLick}>
      <div className="relative inline-block text-left">
        {/* menu button */}
        <button onClick={handleContCLick} className="p-2 text-neutral-500 flex items-center justify-center rounded-lg hover:text-neutral-800 sm:hover:bg-neutral-100 focus:outline-none">
          <HiOutlineDotsHorizontal />
        </button>

        {/* menu */}
        {is_subMenu && <div className="absolute origin-top-right right-0 w-56 mt-2 bg-white rounded-2xl divide-y divide-neutral-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30 transform opacity-100 scale-100">
          <div className="px-1 py-3 text-sm text-neutral-6000">
            <div>
              <button className="flex items-center rounded-xl w-full px-3 py-2 hover:bg-neutral-100  hover:text-neutral-900 truncate focus:outline-none text-[18px] text-neutral-600">
                <FaEdit />
                <span className="ml-3 text-[12px]">Edit</span>
              </button>
            </div>
            <div>
              <button className="flex items-center rounded-xl w-full px-3 py-2 hover:bg-neutral-100  hover:text-neutral-900 truncate focus:outline-none text-[20px] text-neutral-600">
                <MdDeleteOutline />
                <span className="ml-3 text-[12px]">Delete</span>
              </button>
            </div>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default SubMenuComment
