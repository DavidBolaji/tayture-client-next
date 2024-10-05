import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    const user = await db.education.findMany({
      where: {
        userId: req.body['userId'],
      },
    })

    if (user) {
      await db.education.deleteMany({
        where: {
          userId: req.body['userId'],
        },
      })
    }

    const result = await db.education.createMany({
      data: req.body['education'].map(
        ({
          degree,
          year,
          school,
          startYear,
          endYear
        }: {
          degree: string
          year: string
          school: string
          startYear: string
          endYear: string
        }) => {
        
          return {
            degree: degree,
            field: undefined,
            startYear: startYear,
            startMonth: undefined,
            endMonth: undefined,
            endYear: endYear,
            school,
            userId: req.body['userId'],
          }
        },
      ),
    })

    return res.status(200).json({
      message: 'Education Created',
      education: result,
    })
  } catch (error) {
    console.log('[ERROR_WDUCATION]', (error as Error).message)
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
