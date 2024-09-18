import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'

import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })

  if (!req.query.applyId)
    return res.status(400).json({ message: 'apply id is required' })

  try {
    /** update applied */
    await db.applied.update({
      where: {
        id: req.query.applyId as string
      },
      data: {
        rating: req.body["rating"]
      }
     
    })
    return res.status(200).json({
      message: 'Rating Updated succesfully',
    })
  } catch (error) {
    console.log('[UPDATE_APPLIED]', error as Error)
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
