import db from '@/db/db'

import verifyToken2 from '@/middleware/verifyToken2'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    /**
     * check admin to get all schools associated with email
     */
    const schoolAdminSchool = await db.schoolAdmin.findFirst({
      where: {
        sch_admin_email: req.schEmail,
      },
    })

    let uniqueSchools // Copying the school array
    if (schoolAdminSchool) {
      const adminSchool = await db.school.findMany({
        where: {
          sch_id: schoolAdminSchool?.schoolId,
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
      uniqueSchools = adminSchool
    }

    return res.status(200).json({
      message: `Successful`,
      school: uniqueSchools,
    })
  } catch (error) {
    console.log('[API/SCHOOL/ME]', (error as Error).message)
    return res.status(400).json({
      message: `${(error as Error).message}`,
    })
  }
}

export default verifyToken2(handler)
