import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  const { value, amount } =
    req.body

  try {
    const coupoun = await db.coupoun.create({
      data: {
       value,
       amount: +amount
      },
    })
    return res.status(200).json({
      message: 'Coupoun Created succesfully',
      coupoun,
    })
  } catch (error) {
    console.log('[COUPOUN_POST]', (error as Error).message)
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)