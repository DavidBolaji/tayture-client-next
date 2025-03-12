import db from '@/db/db'
import { User, School } from '@prisma/client'
import jwt from 'jsonwebtoken'

import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

declare module 'next' {
  interface NextApiRequest {
    authUser: (User & { school: { sch_id: string }[] }) | null
    token: string
  }
}
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

const verifyToken =
  (next: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token =
        req.cookies.token || req.headers.authorization?.split(' ')[1]

      if (!token) {
        return res
          .status(403)
          .json({ error: 'Unauthorized: Token is missing or expired' })
      }

      let decodedUser

      try {
        decodedUser = jwt.verify(
          token,
          process.env.NEXT_PUBLIC_NEXTAUTH_SECRET!,
        )
      } catch (error) {
        if ((error as Error).name === 'TokenExpiredError') {
          await db.session.deleteMany({
            where: { sessionToken: token },
          })
          return res
            .status(403)
            .json({ error: 'Unauthorized: Token has expired' })
        } else {
          return res.status(401).json({ error: 'Unauthorized: Invalid token' })
        }
      }

      const user = await db.user.findUnique({
        where: { id: (decodedUser as unknown as { id: string }).id },
        include: {
          school: {
            select: {
              sch_id: true,
            },
          },
        },
      })

      if (!user) {
        return res.status(401).json({ error: 'Unauthorized: User not found' })
      }

      // If user is SUPER_ADMIN, get all schools
      if (user.role === 'SUPER_ADMIN') {
        const allSchools = await db.school.findMany({
          select: { sch_id: true },
        })
        req.authUser = { ...user, school: allSchools } as User & {
          school: { sch_id: string }[]
        }
        req.token = token
        return next(req, res)
      }

      // If not SUPER_ADMIN, fetch assigned schools
      const schoolAdminSchools = await db.schoolAdmin.findMany({
        where: {
          sch_admin_email: user.email,
        },
        include: {
          school: {
            select: {
              sch_id: true,
            },
          },
        },
      })

      const userSchoolIds = user.school
        ? user.school.map((s) => ({ sch_id: s.sch_id }))
        : []

      const adminSchoolIds = schoolAdminSchools.map((s) => ({
        sch_id: s.school.sch_id,
      }))

      // Merge and remove duplicates
      const uniqueSchoolIds = Array.from(
        new Set(
          [...userSchoolIds, ...adminSchoolIds].map((s) => JSON.stringify(s)),
        ),
      ).map((s) => JSON.parse(s))

      const newUser = {
        ...user,
        school: uniqueSchoolIds,
      } as User & { school: { sch_id: string }[] }

      req.authUser = newUser
      req.token = token
      next(req, res)
    } catch (error) {
      console.error('Error during token verification:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

export default verifyToken
