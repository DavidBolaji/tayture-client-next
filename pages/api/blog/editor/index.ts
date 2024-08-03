import db from '@/db/db'
import { Blog, Categories } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  blog?: Blog
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  const blog = await db.blog.findMany({
    include: {
      categories: {
        select: {
          id: true,
          title: true,
          createdAt: true
        },
      },
      likes: true,
      comment: true
    },
    orderBy: {
        createdAt: 'desc'
    },
    take: 1
  })

  res.status(200).json({ message: 'Succesful', blog: blog[0] })
}