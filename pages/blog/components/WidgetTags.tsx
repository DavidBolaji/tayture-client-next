import React from 'react'
import FetchBlogs from '../data/FetchBlogs';

interface WidgetTagsProps {
  tag_text: string;
  tag_link: string;
}

const blog = FetchBlogs()

function getTotalArticleCategory(blog,category:string) {
  // Filter the blogs array to include only those with the category "admin"
  const articleCategory = blog.filter(blog => blog.category === category);

  // Return the length of the filtered array
  return articleCategory.length;
}

function WidgetTags({ tag_text,tag_link }: WidgetTagsProps) {
  return (
    <a
      href={tag_link}
      className=" inline-block bg-white hover:bg-neutral-50 text-sm text-neutral-600 py-2 px-3 rounded-lg md:py-2.5 md:px-4 mr-2 mb-2"
    >
      {tag_text}
      <span className="text-xs font-normal"> ( {getTotalArticleCategory(blog,tag_text)} ) </span>
    </a>
  )
}

export default WidgetTags
