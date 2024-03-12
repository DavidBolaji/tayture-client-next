import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import { NextApiRequest, NextApiResponse } from 'next'
import {v4 as uuid} from 'uuid'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    const skill = await db.skills.findMany({
        where: {
            userId: req.authUser?.id
        }
    })

    if (skill.length > 0) {
        await db.skills.deleteMany({
            where: {
                userId: req.authUser?.id
            }
        }) 
    }

    const skills = await db.skills.createMany({
        data: req.body['skill'].map((el: string) => {
            return {
                id: uuid(),
                skill: el,
                userId: req.authUser?.id
            }
        })
    })


    return res.status(200).json({
      message: `Skill ${skill.length ? "updated": "added"} successfully`,
      profile: skills,
    })
  } catch (error) {
    res.status(500).send({ error: (error as Error).message })
  }
}

export default verifyToken(handler)