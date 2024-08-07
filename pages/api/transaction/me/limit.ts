import db from '@/db/db'
import verifyToken2 from '@/middleware/verifyToken2'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  if (
    typeof req.authUser!.school[+req.query.defaultSchool!]?.sch_id ===
    'undefined'
  ) {
    return res.status(200).json({
      message: `Succesful`,
      transaction: [],
    })
  }
  try {
    const transaction = await db.transaction.findMany({
      where: {
        school: {
          sch_id: req.authUser!.school[+req.query.defaultSchool!].sch_id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return res.status(200).json({
      message: `Succesful`,
      transaction,
    })
  } catch (error) {
    console.log('[API/TRANSACTION/ME]', (error as Error).message)
    return res.status(400).json({
      message: `${(error as Error).message}`,
    })
  }
}

export default verifyToken2(handler)
