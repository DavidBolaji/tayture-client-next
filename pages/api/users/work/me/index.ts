import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import verifyToken from '@/middleware/verifyToken'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    await db.workHistory.create({
      data: {
        title: req.body['title'],
        startMonth: req.body['startMonth'],
        startYear: String(req.body['startYear']),
        endMonth: req.body['endMonth'],
        endDate:
          typeof req.body['endMonth'] !== 'undefined'
            ? req.body['endMonth']
            : undefined,
        endYear: String(req.body['endYear']),
        location: req.body['location'],
        city: req.body['city'],
        state: req.body['state'],
        lga: req.body['lga'],
        address: req.body['address'],
        userId: req.authUser!.id,
        roles: {
          create: req.body['roles'].map((role: { role: string }) => ({
            ...role,
          })),
        },
      },
    })

    return res.status(200).json({
      message: 'Work Hitory Created',
    })
  } catch (error) {
    if ((error as Error).name === 'PrismaClientKnownRequestError') {
      return res.status(400).json({
        message: `An error occured: ${(error as Error).message}`,
      })
    }
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
