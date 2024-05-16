import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  const { blogId, comment: com, parentId } = req.body

  try {
    const comment = await db.comment.create({
      data: {
        comment: com,
        blogId,
        userId: req?.authUser?.id as string,
        parentId: !parentId ? undefined : parentId
      },
    })

    return res.status(200).json({
      message: '',
      comment,
    })
  } catch (error) {
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
