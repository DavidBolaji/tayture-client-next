import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const profile = await db.profile.findUnique({
    where: {
      userId: req.authUser?.id,
    },
  })
  return res.status(200).json({
    message: `Succesful`,
    profile,
  })
}

export default verifyToken(handler)
