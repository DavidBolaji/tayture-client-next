import type { NextApiRequest, NextApiResponse } from 'next'
import verifyToken from '@/middleware/verifyToken'
import db from '@/db/db'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PATCH')
    return res.status(405).json({ message: 'Method not allowed' })
  const processId = req.query.processId as string

  try {
    await db.cVDownloadProcess.update({
      where: {
        id: processId,
      },
      data: {
        ended: true,
      },
    })

    res.status(200).json({
      message: 'success',
    })
  } catch (error: any) {
    res.status(400).json({
      message: `An error occurred: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
