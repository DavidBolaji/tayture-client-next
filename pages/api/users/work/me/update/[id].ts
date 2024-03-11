import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    await db.workRole.deleteMany({
      where: {
        workId: req.query.id as string,
      },
    })

    const result = await db.workHistory.update({
      where: {
        id: req.query.id as string,
        userId: req.authUser!.id,
      },
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
      },
    })

    await db.workRole.createMany({
      data: req.body['roles'].map((role: { role: string }) => ({
        ...role,
        workId: result.id,
      })),
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
