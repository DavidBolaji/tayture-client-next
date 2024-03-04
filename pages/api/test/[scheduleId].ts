import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'

import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  if (!req.query.scheduleId)
    return res.status(400).json({ message: 'schedule id is required' })

  try {
    const req1 = db.test.findMany({
      where: {
        scheduleId: req.query.scheduleId as string,
      },
    })

    const [test] = await Promise.all([req1])
    console.log(test)
    return res.status(200).json({
      message: 'Test fetched succesfully',
      test,
    })
  } catch (error) {
    console.log('[GET_TEST]', error as Error)
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
