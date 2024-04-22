import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    const school = await db.school.findUnique({
      where: {
        schUserId: req.authUser?.id,
      },
      include: {
        sch_admin: true,
        wallet: true,
        job: {
          include: {
            hired: true
          }
        }
      },
    })

    return res.status(200).json({
      message: `Succesful`,
      school,
    })
  } catch (error) {
    console.log('[API/SCHOOL/ME]', (error as Error).message)
    return res.status(400).json({
      message: `${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
