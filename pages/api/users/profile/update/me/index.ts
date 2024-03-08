import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })
    const obj = {}
    const keys = Object.keys(req.body)
    keys.forEach((key) => {
        //@ts-ignore
        obj[keys] = req.body[key]
    })

    
  const profile = await db.profile.upsert({
    where: {
      id: req.authUser?.id,
    },
    update: obj,
    create: {
        ...obj,
        userId: req.authUser!.id
    }
  })
  return res.status(200).json({
    message: `Profile updated`,
    profile,
  })
}

export default verifyToken(handler)
