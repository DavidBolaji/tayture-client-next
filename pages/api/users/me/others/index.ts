import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })

  const user = await db.others.findFirst({
    where: {
      userId: req.authUser?.id,
    },
  })

  if (user) {
    await db.others.deleteMany({
      where: {
        userId: req.authUser?.id,
      },
    })
  }

  await db.others.createMany({
    data: req.body['others'].map((e: string) => {
      return {
        text: e,
        userId: req.authUser?.id,
      }
    }),
  })

  return res.status(200).json({
    message: `Succesful created others`,
    user,
  })
}

export default verifyToken(handler)
