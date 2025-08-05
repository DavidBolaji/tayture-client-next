
import jwt from 'jsonwebtoken'

import { NextApiRequest, NextApiResponse } from 'next'
import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  
  const userId = req.authUser!.id

  console.log('[SCH_MAIL]', req.body.schEmail)

  const token = jwt.sign(
    { id: userId, email: req.body.schEmail },
    process.env.NEXT_PUBLIC_NEXTAUTH_SECRET!,
  )

  const sessionData = {
    userId: userId,
    expires: new Date(Date.now() +  60 * 60 * 1000 * 24), //24hr,
    sessionToken: token,
  }

  try {

    const session = await db.session.create({
      data: sessionData,
    })

    console.log('[SESSION]', session)

    if (!sessionData) {
      return res.json({ error: 'Invald Session' })
    }

    console.log(session.sessionToken)

    return res
      .status(200)
      .json({ message: 'Session created Succesfull', session: { session: session.sessionToken } })
  } catch (error: any) {
    return res.json({ error: error.message })
  }
}

export default verifyToken(handler)
