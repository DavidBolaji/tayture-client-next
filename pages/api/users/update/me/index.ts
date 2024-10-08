import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  user?: any
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })
  const holder = ['email']
  const keys = Object.keys(req.body)
  const data: { [key: string]: string } = {}

  keys.forEach((key) => {
    if (!holder.includes(key)) {
      data[key] = req.body[key]
    }
  })

  try {
    const user = await db.user.update({
      where: {
        id: req.authUser?.id,
      },
      data,
    })
  
    return res.status(200).json({ message: 'User Updated', user })
    
  } catch (error) {
    console.log('[ERROR_UPDATE]', (error as Error).message)
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }

}

export default verifyToken(handler)
