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
  if (req.method !== 'DELETE')
    return res.status(405).json({ message: 'Method not allowed' })
  console.log(req.query.schId)
  const school = await db.school.delete({
    where: {
      sch_id: req.query.schId as string,
    },
  })

  res.status(200).json({ message: 'Succesful', school })
}
