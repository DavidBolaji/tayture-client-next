import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })


  try {

      const result = await db.education.create({
        data: {
            school: req.body['school'],
            degree: req.body['degree'],
            startMonth: req.body['startMonth'],
            startYear: String(req.body['startYear']),
            endMonth: req.body['endMonth'],
            endYear: String(req.body['endYear']),
            field: req.body['field'],
            userId: req.authUser!.id
        },
      })

      return res.status(200).json({
        message: 'Education added successfully',
        profile: result,
      })

  } catch (error) {
    res.status(500).send({ message: (error as Error).message })
  }
}

export default verifyToken(handler)
