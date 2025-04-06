import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    // If user is SUPER_ADMIN, fetch all schools
    if (req.authUser?.role === 'SUPER_ADMIN') {
      const allSchools = await db.school.findMany({
        include: {
          sch_admin: true,
          wallet: true,
          account: true,
          job: {
            include: {
              hired: true,
            },
          },
        },
      })
      return res.status(200).json({
        message: `Successful`,
        school: allSchools,
      })
    }

    /**
     * Check if email exists as an admin
     */
    const schoolAdminSchool = await db.schoolAdmin.findFirst({
      where: {
        sch_admin_email: req.authUser?.email,
      },
    })

    /**
     * If not an admin, fetch user's assigned schools
     */
    const reqSch = db.school.findMany({
      where: {
        schUserId: req.authUser?.id,
      },
      include: {
        sch_admin: true,
        wallet: true,
        account: true,
        job: {
          include: {
            hired: true,
          },
        },
      },
    })

    const [school] = await Promise.all([reqSch])

    let uniqueSchools = school.slice() // Copy the school array
    if (schoolAdminSchool) {
      const adminSchool = await db.school.findMany({
        where: {
          sch_id: schoolAdminSchool?.schoolId,
        },
        include: {
          sch_admin: true,
          wallet: true,
          account: true,
          job: {
            include: {
              hired: true,
            },
          },
        },
      })
      uniqueSchools = uniqueSchools.concat(adminSchool) // Merge adminSchool data
    }

    // Remove duplicates using Set
    const uniqueSchoolSet = new Set(
      uniqueSchools.map((school) => JSON.stringify(school)),
    )
    const uniqueSchoolArray = Array.from(uniqueSchoolSet).map((school) =>
      JSON.parse(school),
    )

    return res.status(200).json({
      message: `Successful`,
      school: uniqueSchoolArray,
    })
  } catch (error) {
    console.log('[API/SCHOOL/ME]', (error as Error).message)
    return res.status(400).json({
      message: `${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
