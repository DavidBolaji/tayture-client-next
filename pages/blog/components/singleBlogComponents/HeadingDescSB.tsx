import React from 'react'

interface HeadingDescSBProps {
  heading: string
  description: string
  class_name?: string
}

const HeadingDescSB = ({ heading, description,class_name }: HeadingDescSBProps) => {
  return (
    <div className={`relative flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-12 text-neutral-900 ${class_name}`}>
      <div className="max-w-2xl">
        <h2 className="text-neutral-900 font-black text-3xl md:text-4xl md:!leading-[120%] lg:text-5xl dark:text-neutral-100 max-w-4xl">
          {heading}
        </h2>
        <span className=" text-normal text-neutral-500 leading-relaxed py-1 my-4  line-clamp-2">
          {/* the number of topics will be length of articles array + 1 */}
          {description}
        </span>
      </div>
    </div>
  )
}

export default HeadingDescSB
