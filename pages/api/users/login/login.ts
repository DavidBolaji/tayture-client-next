import { loginUserSchema } from './Schema/loginSchema'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { setCookie } from 'nookies'

import { NextApiRequest, NextApiResponse } from 'next'
import {
  getUserByEmail,
  sendWelcome,
} from '@/lib/services/user'
import db from '@/db/db'

type Data = {
  message?: string
  user?: any
  error?: string
}

type verifyField = 'email' | 'password'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  const body = req.body

  const validation = loginUserSchema.safeParse(body)
  if (!validation.success) {
    const errorList = validation.error.format()
    const field = Object.keys(errorList)[1] as verifyField
    return res.send({
      message: `Validation Error (${field}): ${errorList[field]?._errors}`,
    })
  }

  const { email, password } = validation.data

  const user = await getUserByEmail(email)

  if (!user) return res.status(401).json({ error: 'Invalid credentials' })
  const passMatch = await bcrypt.compare(password, user.password)
  if (!passMatch) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.NEXT_PUBLIC_NEXTAUTH_SECRET!,
  )

  const rToken = jwt.sign(
    { id: user.id },
    process.env.NEXT_PUBLIC_NEXTAUTH_SECRET_TWO!,
  )

  const sessionData = {
    userId: user.id,
    // expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    expires: new Date(Date.now() + 900000), // 15 min
    sessionToken: token,
  }

  try {
    const session = await db.session.create({
      data: sessionData,
    })
    
    // Set the cookie containing the token
    setCookie({ res }, 'token', session.sessionToken, {
      expires: session.expires,
      path: '/', // Set the cookie path to '/'
      sameSite: "none",
      secure: process.env.NEXT_PUBLIC_SECURE === "true",
      domain: process.env.NEXT_PUBLIC_DOMAIN
    })

    // Set the cookie containing the token
    setCookie({ res }, 'refreshToken', rToken, {
     httpOnly: true,
     expires: new Date(Date.now() + 24 * 60 * 60 * 1000),// 6min
     path: '/', // Set the cookie path to '/'
     domain: process.env.NEXT_PUBLIC_DOMAIN
    })

    if (user?.first_time) {
      await sendWelcome({
        firstName: user.fname,
        email: user.email,
      })
    }

    let pinId

    return res
      .status(200)
      .json({ message: 'Signed In!', user: { ...user, pinId } })
  } catch (error: any) {
    return res.json({ error: error.message })
  }
}
