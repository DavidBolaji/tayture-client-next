import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  school?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  const school = await db.school.findMany({
    include: {
      sch_admin: true,
    },
  })
  // console.log(req.params);
  res.status(200).json({ message: 'Succesful', school })
}
