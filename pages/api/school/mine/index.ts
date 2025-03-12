import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    let schools

    if (req.authUser?.role === 'SUPER_ADMIN') {
      // Fetch all schools if user is SUPER_ADMIN
      schools = await db.school.findMany({
        include: {
          sch_admin: true,
          wallet: true,
          job: {
            include: {
              hired: true,
            },
          },
        },
      })
    } else {
      // Fetch only schools assigned to the user
      schools = await db.school.findMany({
        where: {
          schUserId: req.authUser?.id,
        },
        include: {
          sch_admin: true,
          wallet: true,
          job: {
            include: {
              hired: true,
            },
          },
        },
      })
    }

    return res.status(200).json({
      message: 'Successful',
      school: schools,
    })
  } catch (error) {
    console.log('[API/SCHOOL/MINE]', (error as Error).message)
    return res.status(400).json({
      message: `${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
