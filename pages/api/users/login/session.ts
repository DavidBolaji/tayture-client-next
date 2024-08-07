import {  sessionUserSchema } from './Schema/loginSchema'
import { setCookie } from 'nookies'

import { NextApiRequest, NextApiResponse } from 'next'
import { sendWelcome } from '@/lib/services/user'
import db from '@/db/db'
import verifyToken2 from '@/middleware/verifyToken2'

type verifyField = 'session'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  const body = req.body

  const validation = sessionUserSchema.safeParse(body)
  if (!validation.success) {
    const errorList = validation.error.format()
    const field = Object.keys(errorList)[1] as verifyField
    return res.send({
      message: `Validation Error (${field}): ${errorList[field]?._errors}`,
    })
  }

  const { session } = validation.data
  const user = req.authUser

  try {
    const sessionData = await db.session.findUnique({
      where: {
        sessionToken: session,
      },
    })

    console.log('[SESSION_DATA]',sessionData)

    if (!sessionData) {
      return res.json({ error: 'Invalid Session' })
    }

    // Set the cookie containing the token
    setCookie({ res }, 'token', sessionData.sessionToken, {
      expires: sessionData.expires,
      path: '/', // Set the cookie path to '/'
      sameSite: 'lax',
      secure: process.env.NEXT_PUBLIC_SECURE === 'true',
      domain: process.env.NEXT_PUBLIC_DOMAIN,
    })

    // Set the cookie containing the token
    if (user?.first_time) {
      sendWelcome({
        firstName: user.fname,
        email: user.email,
      })
    }

    return res
      .status(200)
      .json({ message: 'Login Succesfull', user: { ...req.authUser } })
  } catch (error: any) {
    return res.json({ error: error.message })
  }
}

export default verifyToken2(handler)
