import db from '@/db/db'
import { getUserById } from '@/lib/services/user'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  school?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })

  if (!req?.query.id) return res.status(400).json({ message: 'Bad Request' })

  const xUser = await getUserById(req.query.id as string)

  if (!xUser) return res.status(400).json({ message: 'Bad Request' })

  if (!(xUser.role === 'SUPER_ADMIN'))
    return res
      .status(401)
      .json({ message: 'Unauthorized, only admin can change school status' })

  const school = await db.school.update({
    where: {
      sch_id: req.query.schId as string,
    },
    data: {
      sch_verified: req.body.sch_verified,
    },
  })

  res.status(200).json({ message: 'School Updated', school })
}
