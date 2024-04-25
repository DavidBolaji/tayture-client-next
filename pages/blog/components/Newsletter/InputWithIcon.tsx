import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { IoMdArrowForward } from 'react-icons/io'

interface InputWithIconProps{
    Search_Arrow: string;
    is_sm: boolean
}

function InputWithIcon({Search_Arrow,is_sm}:InputWithIconProps) {
  return (
    <form className={`mt-16 relative ${is_sm?'max-w-full':'max-w-sm'} `}>
    <input
      type="email"
      className={`block w-full border-8 border-neutral-100 bg-white rounded-full text-sm font-normal h-11 ${ is_sm ? 'sm:p-8' : ''} px-4 py-6 outline-none hover:border-blog_bg`}
      required
      aria-required="true"
      placeholder="Search Blog"
    />
    <button
      className={`ButtonCircle flex items-center justify-center rounded-full !leading-none bg-slate-900 hover:bg-orange text-slate-50 absolute transform top-1/2 -translate-y-1/2 ${ is_sm ? 'sm:right-10' : 'right-1' } right-4 w-9 h-9 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000`}
      type="submit"
    >
      {Search_Arrow === 'Search'?<FaSearch />:<IoMdArrowForward />}
    </button>


  </form>
  )
}

export default InputWithIcon