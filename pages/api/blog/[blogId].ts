import db from '@/db/db';
import { Blog, Categories, Like, Comment } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
  blog?: Blog & { categories: Categories } & { likes: Like[] } & {
    comment: Comment[];
  };
  blogs?: (Blog & { categories: Categories } & { likes: Like[] } & {
    comment: Comment[];
  })[];
  total_pages?: number;
  currentPage?: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' });

  try {
    const blogId = req.query.blogId as string;
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = 4;

    const [blogRes, blogsRes] = await Promise.all([
      db.blog.findUnique({
        where: { id: blogId },
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
          comment: {
            where: {
              blogId
            }
          },
        },
      }),
      db.blog.findMany({
        where: {
          NOT: { id: blogId },
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
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    const blog = blogRes as unknown as  Blog & { categories: Categories } & { likes: Like[] } & {
        comment: Comment[];
      };
    const blogs = blogsRes as unknown as (Blog & { categories: Categories } & { likes: Like[] } & {
        comment: Comment[];
      })[];
    const total_blogs_count = await db.blog.count();
    const total_pages = Math.ceil(total_blogs_count / pageSize);

    res.status(200).json({
      message: 'Successful',
      blog,
      blogs,
      total_pages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
