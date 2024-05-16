import React from 'react'
import ArticlesCatCard from './ArticlesCatCard'
import { useQuery } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { Blog, Categories } from '@prisma/client'
import { getRandomColor } from '@/utils/helpers'

function CategoriesSection2() {
  const { data: blogs } = useQuery({
    queryKey: ['trending'],
    queryFn: async () => {
      const req = await Axios.get('/blog/trending')
      return req.data.blog as (Blog & {
        categories: Partial<Categories> & { blog: Blog[] }
      })[]
    },
  })

  return (
    <div className="relative whitespace-nowrap -mx-2 xl:-mx-4 overflow-hidden">
      {!blogs
        ? []
        : blogs.map((blog, idx) => (
            <ArticlesCatCard
              key={`${blog.id}`}
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
