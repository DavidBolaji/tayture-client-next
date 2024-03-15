import { registerUserSchema } from './Schema/schema'
import bcrypt from 'bcryptjs'
import { getUserByEmail, sendTextMessageOTP } from '@/lib/services/user'
import db from '@/db/db'

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

  if (skip) {
    return res.status(200).send({
      message: 'User Created!',
      user: { ...user, pass: password },
    })
  }

  const req2 = await sendTextMessageOTP(phone)

  try {
    return res.status(200).send({
      message: 'User Created!',
      user: { ...user, pass: password, pinId: req2.data.pinId },
    })
  } catch (error: unknown) {
    return res.status(400).send({ message: (error as Error).message })
  }
}
