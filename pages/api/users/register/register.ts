import { registerUserSchema } from './Schema/schema'
import bcrypt from 'bcryptjs'
import { getUserByEmail } from '@/lib/services/user'
import db from '@/db/db'
import jwt from 'jsonwebtoken'
import { setCookie } from 'nookies'

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  user?: any
}

type verifyField = 'email' | 'phone' | 'fname' | 'lname' | 'password' | 'skip'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const body = req.body
  const validation = registerUserSchema.safeParse(body)

  if (!validation.success) {
    const errorList = validation.error.format()
    const field = Object.keys(errorList)[1] as verifyField
    return res.send({
      message: `Validation Error (${field}): ${errorList[field]?._errors}`,
    })
  }

  const { email, password, fname, lname, phone, skip, path } = validation.data

  const existingUser = await getUserByEmail(email)

  if (existingUser) return res.send({ message: 'Email already in use!' })

  const hash = await bcrypt.hash(password, 10)

  const user = await db.user.create({
    data: {
      email,
      password: hash,
      fname,
      lname,
      phone,
      path: !path ? undefined : path,
    },
  })

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
      sameSite: 'none',
      secure: process.env.NEXT_PUBLIC_ENV === 'dev' ? false : true,
      // domain: process.env.NEXT_PUBLIC_ENV === "dev" ? "localhost:5000": "tayture-client-next.vercel.app"
    })

    // Set the cookie containing the token
    setCookie({ res }, 'refreshToken', rToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 6min
      path: '/', // Set the cookie path to '/'
      // domain: process.env.NEXT_PUBLIC_ENV === "dev" ? "localhost:5000": "tayture-client-next.vercel.app"
    })

    if (skip) {
      return res.status(200).send({
        message: 'User Created!',
        user: { ...user, pass: password },
      })
    }

    return res.status(200).send({
      message: 'User Created!',
      user: { ...user, pass: password },
    })
  } catch (error: unknown) {
    return res.status(400).send({ message: (error as Error).message })
  }
}
