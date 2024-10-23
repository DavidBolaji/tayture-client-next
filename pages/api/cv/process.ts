import type { NextApiRequest, NextApiResponse } from 'next'
import verifyToken from '@/middleware/verifyToken'
import db from '@/db/db'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    const process = await db.cVDownloadProcess.create({
      data: {
        userId: req?.authUser?.id as string,
      },
    })

    res.status(200).json({
      message: 'success',
      processId: process.id,
    })
  } catch (error: any) {
    // Return error response to client
    res.status(400).json({
      message: `An error occurred: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
