import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies, setCookie } from 'nookies'
import jwt from 'jsonwebtoken'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  const cookies = parseCookies(res)
  const rToken = cookies.refreshToken


  try {
    if (!rToken) {
      return res.status(401).json({ error: 'Unauthorized: Token is missing' })
    }

    const decodedUser = jwt.verify(
      rToken,
      process.env.NEXT_PUBLIC_NEXTAUTH_SECRET_TWO!,
    ) as unknown as { id: string }

    const token = jwt.sign(
      { id: decodedUser.id },
      process.env.NEXT_PUBLIC_NEXTAUTH_SECRET!,
    )

    const sessionData = {
      userId: decodedUser.id,
      // expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      expires: new Date(Date.now() + 900000), // 15 min
      sessionToken: token,
    }

    await db.session.deleteMany({
      where: {
        userId: decodedUser.id,
      },
    })
    const session = await db.session.create({
      data: sessionData,
    })

    console.log(session.expires)
    // Set the cookie containing the token
    setCookie({ res }, 'token', session.sessionToken, {
      maxAge: 60, // 1 min
      path: '/', // Set the cookie path to '/'
      sameSite: 'none',
      secure: process.env.NEXT_PUBLIC_ENV === 'dev' ? false : true,
      // domain: process.env.NEXT_PUBLIC_ENV === "dev" ? "localhost:5000": "tayture-client-next.vercel.app"
    })

    return res
      .status(200)
      .json({ message: 'Signed In!', token: session.sessionToken })
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' })
  }
}
