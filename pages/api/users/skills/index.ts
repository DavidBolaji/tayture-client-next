import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    const user = await db.skills.findMany({
      where: {
        userId: req.body['userId'],
      },
    })

    if (user) {
      await db.skills.deleteMany({
        where: {
          userId: req.body['userId'],
        },
      })
    }

    const result = await db.skills.createMany({
      data: req.body['skill'].map((skill: {name: string}) => ({
        skill: skill.name,
        userId: req.body['userId'],
      })),
    })

    return res.status(200).json({
      message: 'Skill Created',
      skills: result,
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

export default handler
