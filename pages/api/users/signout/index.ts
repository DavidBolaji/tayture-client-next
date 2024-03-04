import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.session.deleteMany({
    where: { userId: req.authUser?.id },
  })
  res.setHeader('Authorization', `Bearer ${null}`)

  return res.status(200).json({
    message: `Signout successfull`,
  })
}

export default verifyToken(handler)
