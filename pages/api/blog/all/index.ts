import db from '@/db/db'
import { Blog } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const DEFAULT_POSTS_PER_PAGE = 4

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    message: string
    blogs?: Blog[]
    totalPages?: number
  }>,
) {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  const { page = 1, perPage = DEFAULT_POSTS_PER_PAGE } = req.query
  const currentPage = parseInt(page as string, 10)
  const postsPerPage = parseInt(perPage as string, 10)
  const offset = (currentPage - 1) * postsPerPage

  const blogs = await db.blog.findMany({
    include: {
      categories: {
        select: {
          id: true,
          title: true,
          createdAt: true,
          blog: true,
        },
      },
      likes: true,
      comment: true,
    },
    take: postsPerPage,
    skip: offset,
  })

  const totalBlogsCount = await db.blog.count()
  const totalPages = Math.ceil(totalBlogsCount / postsPerPage)

  res.status(200).json({ message: 'Successful', blogs, totalPages })
}
