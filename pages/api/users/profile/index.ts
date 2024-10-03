import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const profile = await db.user.findUnique({
    where: {
      id: req.authUser?.id,
    },
    select: {
      fname: true,
      lname: true,
      path: true,
      email: true,
      phone: true,

      summary: true,
      work: {
        include: {
          roles: true,
        },
      },
      education: true,
      skills: true,
      profile: {
        select: {
          picture: true,
          cv: true,
          cover: true,
          address: true,
          lga: true,
          state: true,
          city: true,
          country: true,
          available: true,
          workplace: true,
        },
      },
    },
  })
  return res.status(200).json({
    message: `Succesful`,
    profile,
  })
}

export default verifyToken(handler)
