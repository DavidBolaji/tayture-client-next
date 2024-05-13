import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie, parseCookies} from 'nookies'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.session.deleteMany({
    where: { userId: req.authUser?.id },
  })
  const cookies = parseCookies(res)
  const rToken = cookies.refreshToken
  res.setHeader('Authorization', 'Bearer ')
  setCookie({ res }, 'token', req.token, {
    expires: new Date(Date.now() - 60000),
    path: '/'
  })
  setCookie({ res }, 'refreshToken', rToken, {
    expires: new Date(Date.now() - 60000),
    path: '/'
  })

  return res.status(200).json({
    message: `Signout successfull`,
  })
}

export default verifyToken(handler)
