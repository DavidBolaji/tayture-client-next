import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  const user = await db.user.findFirst({
    where: {
      id: req.authUser?.id,
    },
    include: {
     education: true,
     summary: true,
     work: true,
     skills: true,
     profile: true
    },
  })

  return res.status(200).json({
    message: `Succesful`,
    user,
  })
}

export default verifyToken(handler)
