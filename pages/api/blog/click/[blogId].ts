import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    await db.blog.update({
      where: {
        id: req.query.blogId as string,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    })

    return res.status(200).json({
      message: 'Incremented Blog Click',
    })
  } catch (error) {
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default handler
