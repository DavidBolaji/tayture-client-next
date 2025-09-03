import db from '@/db/db'
import { getUserById } from '@/lib/services/user'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IJobSchDb } from '../types'

type Data = {
  message: string
  job?: IJobSchDb
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  const xUser = await getUserById(req.body.jobUserId)

  if (
    !xUser?.path ||
    !(JSON.parse(xUser.path?.replace(/'/g, '"')) as string[]).includes(
      'school admin',
    )
  )
    return res
      .status(401)
      .json({ message: 'Unauthorzed, user is not a school admin' })

  try {
    const jobCreate = await db.job.create({
      data: {
        ...req.body,
        job_resumption: new Date(req.body.job_resumption),
      },
    })

    res.status(201).json({
      message: 'Job Created',
      job: jobCreate as unknown as IJobSchDb,
    })
  } catch (error) {
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}
