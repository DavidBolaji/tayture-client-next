import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })

  
  try {
      const result = await db.education.update({
       where: {
        id: req.query.id as string,
        userId: req.authUser!.id
       },
       data: {...req.body}
      })

      return res.status(200).json({
        message: 'Education updated successfully',
        profile: result,
      })

  } catch (error) {
    res.status(500).send({ message: (error as Error).message })
  }
}

export default verifyToken(handler)