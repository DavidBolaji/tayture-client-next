import React from 'react'

interface WidgetHeadingProps {
  heading_text: string;
  view_all_link: string;
}

function WidgetHeading({ heading_text,view_all_link }:WidgetHeadingProps) {
  return (
    <div className="flex items-center justify-between p-4 xl:p-5 border-b border-neutral-200 dark:border-neutral-700 ">
      <h2 className="text-lg text-neutral-900 font-semibold flex-grow">
        {heading_text}
      </h2>
      <a href={view_all_link} className='flex-shrink-0 block text-[rgb( 67,56,202)] font-semibold text-sm' style={{color:'rgb( 67,56,202)'}}>View all</a>
    </div>
  )
}

export default WidgetHeading