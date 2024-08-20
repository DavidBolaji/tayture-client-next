import db from '@/db/db'
import { Blog, Categories } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  blog?: Blog[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  const blog = await db.blog.findMany({
    where: {
      published: true
    },
    include: {
      categories: {
        select: {
          id: true,
          title: true,
          createdAt: true,
          blog: true
        },
      },
      likes: true,
      comment: true
    },
    orderBy: {
        clicks: 'desc'
    },
    take: 6
  })

  res.status(200).json({ message: 'Succesful', blog })
}