import React from 'react'

interface WidgetTagsProps {
  tag_text: string
  tot_articles: string
  tag_link: string
}

function WidgetTags({ tag_text, tot_articles, tag_link }: WidgetTagsProps) {
  return (
    <a
      href={tag_link}
      className=" inline-block bg-white hover:bg-neutral-50 text-sm text-neutral-600 py-2 px-3 rounded-lg md:py-2.5 md:px-4 mr-2 mb-2"
    >
      {tag_text}
      <span className="text-xs font-normal"> ( {tot_articles} ) </span>
    </a>
  )
}

export default WidgetTags
