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
        }: {
          degree: string
          year: string
          school: string
        }) => ({
          degree: degree.split(',')[0],
          field: degree.split(',')[1],
          startYear: year.split('-')[0].split(',')[1],
          startMonth: year.split('-')[0].split(',')[0],
          endMonth: year.split('-')[1].split(',')[0],
          endYear: year.split('-')[1].split(',')[1],
          school,
          userId: req.body['userId'],
        }),
      ),
    })

    return res.status(200).json({
      message: 'Education Created',
      education: result,
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
