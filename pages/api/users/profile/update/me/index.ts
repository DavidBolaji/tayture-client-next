import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })
  const obj = {}
  const keys = Object.keys(req.body)
  keys.forEach((key: string) => {
    //@ts-ignore
    obj[key] = req.body[key]
  })
  console.log(keys)
  console.log(obj)
  try {
    const profile = await db.profile.findUnique({
      where: {
        userId: req.authUser?.id,
      },
    })

    if (profile) {
      const result = await db.profile.update({
        where: {
          userId: req.authUser?.id,
        },
        data: obj,
      })

      return res.status(200).json({
        message: 'User profile Created',
        profile: result,
      })
    }

    const result = await db.profile.create({
      data: {
        ...obj,
        userId: req.authUser!.id,
      },
    })

    return res.status(200).json({
      message: 'User profile Created',
      profile: result,
    })
  } catch (error) {
    res.status(500).send({ message: (error as Error).message })
  }
}

export default verifyToken(handler)
