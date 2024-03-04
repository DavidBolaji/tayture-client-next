import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import { ViewedMatch } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  const { viewed: dataViewed } = req.body
  /** current time + 24hrs */
  const time = new Date(
    new Date().getTime() + 24 * 60 * 60 * 1000,
  ).toISOString()

  try {
    const viewed = await db.viewedMatch.createMany({
      data: dataViewed.map((view: ViewedMatch) => ({
        ...view,
        viewed: time,
      })),
    })

    return res.status(200).json({
      message: 'Successfullyy created viewed',
      viewed,
    })
  } catch (error) {
    console.log('[VIEWED_SINGLE]', (error as Error).message)
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
