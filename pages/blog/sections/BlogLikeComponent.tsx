"use client"
import React, { useEffect, useState } from 'react'
import LikesCom from '../components/LikesCom'
import { Blog, Categories, Like } from '@prisma/client'

const BlogLikeComponent: React.FC<{
  top?: boolean
  blog: Blog & { categories: Categories } & { likes: Like[] } & {
    comment: Comment[]
  }
}> = ({ top = true, blog }) => {
  const [likes, setLikes] = useState(blog.likes.length)
  const [comments, setComments] = useState(blog.comment.length)

  useEffect(() => {
    setComments(blog.comment.length)
  }, [blog])

  return (
    <>
      {top && (
        <LikesCom
          likes_num={`${likes}`}
          comments_num={`${comments}`}
          bg_color="none"
          is_share={true}
          update={(like) => setLikes(like)}
        />
      )}

    </>
  )
}

export default BlogLikeComponent
