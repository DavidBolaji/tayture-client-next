import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    const summary = await db.summary.findUnique({
      where: {
        userId: req.body['userId'],
      },
    })

    if (summary) {
      await db.summary.delete({
        where: {
          userId: req.body['userId'],
        },
      })
    }

    const result = await db.summary.create({
      data: {
        text: req.body['summary'],
        userId: req.body['userId'],
      },
    })

    return res.status(200).json({
      message: 'User Summary Created',
      summary: result,
    })
  } catch (error) {
    console.log('[ERROR_UPDATE]', (error as Error).message)
   
    if ((error as Error).name === 'PrismaClientKnownRequestError') {
      return res.status(400).json({
        message: `An error occured: ${(error as Error).message}`,
      })
    }
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default handler
