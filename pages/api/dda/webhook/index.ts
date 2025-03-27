import { NextApiRequest, NextApiResponse } from 'next'

export async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    return res.status(200).json({
      message: 'Successful',
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error })
  }
}
