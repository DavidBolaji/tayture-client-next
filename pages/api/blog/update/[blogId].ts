import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Blog } from '@prisma/client'

type Data = {
  message: string
  blog?: Partial<Blog>
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    const { banner, title, except, text, blogCategoryId } = req.body

    const dataToUpdate: any = {}

    if (banner) dataToUpdate.banner = banner
    if (title) dataToUpdate.title = title
    if (except) dataToUpdate.except = except
    if (text) dataToUpdate.text = text
    if (blogCategoryId) dataToUpdate.categories = { connect: { id: blogCategoryId } }

    const updatedBlog = await db.blog.update({
      where: {
        id: req.query.blogId as string,
      },
      data: dataToUpdate,
    })

    res.status(200).json({ message: 'Blog Updated Successfully', blog: updatedBlog })
  } catch (error) {
    res.status(400).json({ message: `Error: ${(error as Error).message}` })
  }
}

export default verifyToken(handler)
