import db from '@/db/db'
import { IUser } from '@/pages/api/users/types'
import jwt from 'jsonwebtoken'

import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
declare module 'next' {
  interface NextApiRequest {
    authUser: IUser | null
    token: string
  }
}
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}


const verifyToken =
  (next: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
      console.log(req.cookies.token);
      console.log(req.headers.authorization?.split(' ')[1]);

      if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token is missing' })
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

      if (!user) {
        return res.status(401).json({ error: 'Unauthorized: User not found' })
      }

      req.authUser! = user
      req.token = token
      next(req, res)
    } catch (error) {
      console.error('Error during token verification:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

export default verifyToken
