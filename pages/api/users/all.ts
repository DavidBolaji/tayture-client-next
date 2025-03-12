import type { NextApiRequest, NextApiResponse } from 'next'
import db from '@/db/db'
import { isValidPhoneNumber } from 'react-phone-number-input'

type Data = {
  message: string
  user?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    const user = await db.user.findMany({
      select: {
        fname: true,
        phone: true,
        email: true,
      },
    })

    console.log(user)
    res.status(200).json({
      message: 'Successful',
      user: user.filter((u) => isValidPhoneNumber(u.phone)),
    })
  } catch (error) {
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}
