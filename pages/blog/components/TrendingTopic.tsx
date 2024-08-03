import React from 'react'
import ImgNameDate from './NameDate'
import FetchBlogs from '../data/FetchBlogs';

const blogs = FetchBlogs()

interface TrendingTopicProps {
  topic_bg_color: string;
  category: string;
}

function getTotalArticleCategory(blogs: any[],category:string) {
  // Filter the blogs array to include only those with the category "admin"
  const articleCategory = blogs.filter(blog => blog.category === category);

  // Return the length of the filtered array
  return articleCategory.length;
}

function TrendingTopic({
  topic_bg_color,
  category,
  }: TrendingTopicProps) {
  return (
    <a
      href="#"
      className="flex items-center p-4 xl:p-5 hover:bg-neutral-200 dark:hover:bg-neutral-700"
    >
      {/* Img */}
      <ImgNameDate
        authImgCont_wi_hei="2.7rem"
        bg_color={topic_bg_color}
        authName={category}
        date={`${getTotalArticleCategory(blogs,category)} Articles`}
        isColumn={true}
        enableDash={false}
        is_image = {false}
      />
    </a>
  )
}

export default TrendingTopic
