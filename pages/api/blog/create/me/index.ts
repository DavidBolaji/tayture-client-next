import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  const { except, text, updatedIsEditor, blogCategoryId, picture, title } =
    req.body

  try {
    const blog = await db.blog.create({
      data: {
        except,
        text,
        banner: picture,
        title,
        updatedIsEditor,

        categories: { connect: { id: blogCategoryId } },
        user: { connect: { id: req.authUser?.id } },
      },
    })
    return res.status(200).json({
      message: 'Blog Created succesfully',
      blog,
    })
  } catch (error) {
    console.log('[BLOG_POST]', (error as Error).message)
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
