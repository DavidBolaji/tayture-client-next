import db from '@/db/db'
import { getJobById } from '@/lib/api/job'
import verifyToken from '@/middleware/verifyToken'

import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })

  if (!req.query.scheduleId)
    return res.status(400).json({ message: 'Schedule id is required' })
  console.log(req.query.scheduleId)

  try {
    /** get applied */
    await db.schedule.update({
      where: {
        id: req.query.scheduleId as string,
      },
      data: { ...req.body },
    })
    return res.status(200).json({
      message: 'Schedule updated succesfully',
    })
  } catch (error) {
    console.log('[PUT_SCHEDULED]', error as Error)
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
