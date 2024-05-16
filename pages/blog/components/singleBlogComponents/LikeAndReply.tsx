import React from 'react'
import { CiHeart } from 'react-icons/ci'
import { VscReply } from 'react-icons/vsc'

interface LikeAndReplyProps{
    like_num:string|number
    showReply: () => void
}

function LikeAndReply({like_num, showReply}:LikeAndReplyProps) {
  return (
    <div className="flex items-center space-x-2 ">
      
      {/* like button */}
      <button className="min-w-[68px] flex items-center rounded-full leading-none px-3 h-8 text-xs focus:outline-none text-neutral-700 bg-neutral-100 hover:bg-rose-50 hover:text-rose-600">
        <CiHeart className="h-5 w-5 mr-1" />
        <span className="text-neutral-900 dark:text-neutral-200">{like_num}</span>
      </button>

      {/* Reply button */}
      <button type='button' onClick={showReply}  className="flex items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-100 px-3 h-8 hover:bg-teal-50 hover:text-teal-600 focus:outline-none ">
        <VscReply className="h-[18px] w-[18px] mr-2" />
        <span className="text-xs leading-none text-neutral-900 dark:text-neutral-200">
          Reply
        </span>
      </button>
    </div>
  )
}

export default LikeAndReply
