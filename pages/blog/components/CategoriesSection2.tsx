import React from 'react'
import ArticlesCatCard from './ArticlesCatCard'
import { getRandomColor } from '@/utils/helpers'
import { Blog, Categories } from '@prisma/client'
import Link from 'next/link'

const CategoriesSection2: React.FC<{
  trending: (Blog & {
    categories: Partial<Categories> & { blog: Blog[] }
  })[]
}> = ({ trending }) => {
  return (
    <div className="relative whitespace-nowrap -mx-2 xl:-mx-4 overflow-hidden">
      {trending.map((blog, idx) => (
          <ArticlesCatCard
            id={blog.id}
            key={blog.id}
            category={blog.categories.title!}
            totalCatArticles={`${blog.categories.blog.length} Articles`}
            categoryColor={getRandomColor()}
            rank={String(idx + 1)}
            bg_image_url={blog.banner}
            authImgCont_wi_hei="2.5rem"
            authImgCont_is_image={false}
          />
      ))}
    </div>
  )
}

export default CategoriesSection2
