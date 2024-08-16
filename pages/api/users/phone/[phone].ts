import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message?: string
  user?: any,
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })
  console.log((String(req.query.phone)! as string))

  try {
    const user = await db.user.findFirstOrThrow({
      where: {
        phone: (String(req.query.phone)! as string),
      },
    })
  
    return res.status(200).json({ message: 'Succesful', user })
  } catch (error) {
    console.log(error)
    return res.status(404).json({ error: (error as Error).message })
  }
 
}
