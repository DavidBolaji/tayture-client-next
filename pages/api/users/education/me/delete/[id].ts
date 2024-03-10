import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
  if (req.method !== 'DELETE')
    return res.status(405).json({ message: 'Method not allowed' })

  
  try {
      const result = await db.education.delete({
       where: {
        id: req.query.id as string,
        userId: req.authUser!.id
       }
      })

      return res.status(200).json({
        message: 'Education deleted successfully',
        profile: result,
      })

  } catch (error) {
    res.status(500).send({ message: (error as Error).message })
  }
}

export default verifyToken(handler)