import React from 'react'

interface HeadingDescProps {
  heading: string
  description: string
}

const HeadingDesc = ({ heading, description }: HeadingDescProps) => {
  return (
    <div className="relative flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-12 text-neutral-900 dark:text-neutral-50">
      <div className="max-w-2xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
          {heading}
        </h2>
        <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">
          {/* the number of topics will be length of articles array + 1 */}
          {description}
        </span>
      </div>
    </div>
  )
}

export default HeadingDesc
