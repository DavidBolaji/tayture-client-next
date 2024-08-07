import db from '@/db/db'
import {  User, School } from '@prisma/client'
import jwt from 'jsonwebtoken'

import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

declare module 'next' {
  interface NextApiRequest {
    authUser: (User & { school: { sch_id: string }[] }) | null
    token: string;
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

const verifyToken2 =
  (next: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token =
        req.cookies.token || req.headers.authorization?.split(' ')[1]

        console.log('[TOKEN]', token)

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
      console.log('[DECODED_USER]', decodedUser)


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
      
      console.log('[SCHOOL]', school)
     
      const allSchId2 = !school ? [] : school.map((s) => {
        return {
          sch_id: s.school.sch_id
        }
      })

      // Merge both arrays
      const mergedArray = [...allSchId2];

      // Create a set of unique sch_id objects
      const uniqueSchIdSet = new Set(mergedArray.map((item) => JSON.stringify(item)));

      // Convert back to array format
      const uniqueSchIdArray = Array.from(uniqueSchIdSet).map((item) => JSON.parse(item));

      if (!user) {
        return res.status(401).json({ error: 'Unauthorized: User not found' })
      }

        const newUser = {
          ...user,
          school: uniqueSchIdArray
        } as User & { school: { sch_id: string }[] }
        
        console.log('[NEW_USER]', newUser)

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
