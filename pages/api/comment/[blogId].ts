import { NextApiRequest, NextApiResponse } from 'next'
import { Comment } from '@prisma/client'
import db from '@/db/db'

type CommentWithSubcomments = Comment & {
  subcomments?: CommentWithSubcomments[] // Define the subcomments property
}

type Data = {
  message: string
  comment?: CommentWithSubcomments[] // Use CommentWithSubcomments type
  total?: number
  nextCursor?: number | null
}

async function fetchSubcomments(db: any, parentId: string): Promise<CommentWithSubcomments[]> {
  const subcomments = await db.comment.findMany({
    where: {
      parentId: parentId,
    },
    include: {
      user: {
        select: {
          fname: true,
          lname: true,
        },
      },
    },
    orderBy: { createdAt: 'asc' },
  });

  const subcommentsWithSubcomments: CommentWithSubcomments[] = [];
  for (const subcomment of subcomments) {
    const subcommentWithSubcomments: CommentWithSubcomments = {...subcomment};
    subcommentWithSubcomments.subcomments = await fetchSubcomments(db, subcomment.id);
    subcommentsWithSubcomments.push(subcommentWithSubcomments);
  }

  return subcommentsWithSubcomments;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    const blogId = req.query.blogId as string
    const pageSize = parseInt(req.query.limit as string, 10) || 2;
    const page = parseInt(req.query.page as string, 10) || 1;

    const { comment, total, nextCursor } = await db.$transaction(
      async (db) => {
        // Fetch top-level comments for the given blog post
        const topLevelComments = await db.comment.findMany({
          where: {
            blogId: blogId,
            parentId: null, // Fetch only top-level comments
          },
          include: {
            user: {
              select: {
                fname: true,
                lname: true,
              },
            },
          },
          take: pageSize,
          skip: (page - 1) * pageSize, // Calculate skipping based on page and page size
          orderBy: { createdAt: 'asc' }, // Order by creation time to ensure consistency
        })

        const total = await db.comment.count({
          where: {
            AND: [
              { blogId: blogId },
              { parentId: null }
            ]
          },
        })

        // Fetch subcomments for each top-level comment recursively
        const commentsWithSubcomments: CommentWithSubcomments[] = [];
        for (const comment of topLevelComments) {
          const commentWithSubcomments: CommentWithSubcomments = {...comment};
          commentWithSubcomments.subcomments = await fetchSubcomments(db, comment.id);
          commentsWithSubcomments.push(commentWithSubcomments);
        }

        let nextCursor: number | null = null; // Initialize nextCursor

        if (commentsWithSubcomments.length === pageSize) {
          // If number of comments fetched equals page size, there might be more comments
          nextCursor = page + 1; // Set next cursor to the timestamp of last comment
        }

        return { comment: commentsWithSubcomments, total, nextCursor }
      },
    )

    return res.status(200).json({
      message: 'Successful',
      comment,
      total,
      nextCursor
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
