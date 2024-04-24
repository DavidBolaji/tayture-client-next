import React from 'react'
import NameDate from './NameDate'
import SubMenuComment from './SubMenuComment'
import LikeAndReply from './LikeAndReply'

interface CommentProps{

}

function Comment({}:CommentProps) {
  return (
    <div className="flex my-8">
      {/* Image */}
      <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-6 w-6 text-base sm:text-lg sm:h-8 sm:w-8 mt-4 bg-black">
        {/* <img
          sizes="100px"
          src= ''
          className="absolute inset-0 w-full h-full object-cover object-cover absolute inset-0 w-full h-full"
          alt="John"
        /> */}
      </div>

      {/* Comment */}
      {/* comment block grid */}
      <div className="flex-grow flex flex-col p-4 ml-2 text-sm border border-neutral-200 rounded-xl sm:ml-3 sm:text-base">
        {/* top name date and sub menu */}
        <div className="relative flex items-center ">
          <NameDate
            commentorName="Boluwatife Adewole"
            commentDate="April 22, 2024"
          />
          <SubMenuComment />
        </div>
        {/* paragraph */}
        <span className="block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
          Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo.
          Morbi ut odio.
        </span>
        {/* like and reply */}
        <LikeAndReply like_num = {14} />
      </div>
    </div>
  )
}

export default Comment
