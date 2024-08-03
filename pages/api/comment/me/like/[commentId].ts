import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid} from 'uuid'

type Data = {
  message: string
  job?: any
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })

  
  
  try {
    const liked = await db.commentLike.findFirst({
      where: {
        AND: [
          {
            commentId: req.query.commentId as string
          },
          {
            userId: req.authUser?.id 
          }
        ]
      }
    })

    if(liked?.commentId) {
      await db.commentLike.delete({
        where: {
          id: liked.id as string
        }
      })
      return res.status(200).json({
        message: 'UnLike',
      })
    }

    await db.commentLike.create({
      data: {
        userId: req.authUser?.id as string,
        commentId: req.query.commentId as string 
      }
    })
  
    return res.status(200).json({
      message: 'Liked',
    })
  } catch (error) {
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
