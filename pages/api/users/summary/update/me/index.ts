import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    const summary = await db.summary.findUnique({
      where: {
        userId: req.authUser?.id,
      },
    })

    if (summary) {
      await db.summary.delete({
        where: {
          userId: req.authUser?.id,
        },
      })
    }

    const result = await db.summary.create({
      data: {
        text: req.body['text'],
        userId: req.authUser!.id,
      },
    })

    return res.status(200).json({
      message: 'User Summary Created',
      summary: result,
    })
  } catch (error) {
    res.status(500).send({ message: (error as Error).message })
  }
}

export default verifyToken(handler)
