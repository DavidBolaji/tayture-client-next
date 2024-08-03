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

  const { page = 1, perPage = DEFAULT_POSTS_PER_PAGE, categoryId, except } = req.query
  const currentPage = parseInt(page as string, 10)
  const postsPerPage = parseInt(perPage as string, 10)
  const offset = (currentPage - 1) * postsPerPage

  let blogs; 
  let totalBlogsCount;
  let totalPages;

  if (categoryId !== "all") {
    blogs = await db.blog.findMany({
      where: {
        categories: {
          id: categoryId as string
        },
        id: {
          not: {
            equals: except as string 
          }
        }
      },
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

    totalBlogsCount = await db.blog.count({
      where: {
        categories: {
          id: categoryId as string
        }
      }
    })
    totalPages = Math.ceil(totalBlogsCount / postsPerPage)

  } else {
    blogs = await db.blog.findMany({
      where: {
        id: {
          not: {
            equals: except as string 
          }
        }
      },
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

    totalBlogsCount = await db.blog.count()
    totalPages = Math.ceil(totalBlogsCount / postsPerPage)

  }

  res.status(200).json({ message: 'Successful', blogs, totalPages })
}
