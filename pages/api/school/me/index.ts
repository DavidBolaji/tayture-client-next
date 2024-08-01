import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    /**
     * check if email exist as admin
     */
    const schoolAdminSchool = await db.schoolAdmin.findFirst({
      where: {
        sch_admin_email: req.authUser?.email,
      },
    })

    /**
     * is not an admin
     * fetch school
     */
    const reqSch = db.school.findMany({
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

    const [school] = await Promise.all([reqSch])

    let uniqueSchools = school.slice() // Copying the school array
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
      uniqueSchools = uniqueSchools.concat(adminSchool) // Concatenating adminSchool to uniqueSchools
    }

    // Using Set to get unique schools
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
