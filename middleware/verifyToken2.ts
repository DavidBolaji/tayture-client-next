import db from '@/db/db'
import { User, School } from '@prisma/client'
import jwt from 'jsonwebtoken'

import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

declare module 'next' {
  interface NextApiRequest {
    authUser: (User & { school: { sch_id: string }[] }) | null
    token: string
    schEmail: string
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

/**
 * Middleware function that verifies JWT token and attaches user data with limited permission to request
 * @param next - The next API handler function to be called after token verification
 * @returns A middleware function that:
 * - Extracts JWT token from cookies or Authorization header
 * - Verifies token validity and expiration
 * - Fetches associated user data from database
 * - Fetches schools associated with user's email (for school admins)
 * - Attaches decoded user data, token and email to request object
 * - Handles various auth error cases (missing token, expired token, invalid token, user not found)
 */

const verifyToken2 =
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
            .status(401)
            .json({ error: 'Unauthorized: Token has expired' })
        } else {
          return res.status(401).json({ error: 'Unauthorized: Invalid token' })
        }
      }

      const user = await db.user.findUnique({
        where: { id: (decodedUser as unknown as { id: string }).id },
      })

      const school = await db.schoolAdmin.findMany({
        where: {
          sch_admin_email: (decodedUser as unknown as { email: string }).email,
        },
        include: {
          school: {
            select: {
              sch_id: true,
            },
          },
        },
      })

      const allSchId2 = !school
        ? []
        : school.map((s) => {
            return {
              sch_id: s.school.sch_id,
            }
          })

      // Merge both arrays
      const mergedArray = [...allSchId2]

      // Create a set of unique sch_id objects
      const uniqueSchIdSet = new Set(
        mergedArray.map((item) => JSON.stringify(item)),
      )

      // Convert back to array format
      const uniqueSchIdArray = Array.from(uniqueSchIdSet).map((item) =>
        JSON.parse(item),
      )

      if (!user) {
        return res.status(401).json({ error: 'Unauthorized: User not found' })
      }

      const newUser = {
        ...user,
        school: uniqueSchIdArray,
      } as User & { school: { sch_id: string }[] }

      req.authUser! = newUser
      req.token = token
      req.schEmail = (decodedUser as unknown as { email: string }).email
      next(req, res)
    } catch (error) {
      console.error('Error during token verification:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

export default verifyToken2
