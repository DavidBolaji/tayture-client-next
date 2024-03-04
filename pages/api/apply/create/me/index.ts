import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  const { qual, exp, schoolId, cv, jobId } = req.body
  if (!qual || !exp || !schoolId || !jobId)
    return res
      .status(400)
      .json({ message: 'Validation error all fields are required' })

  try {
    const applied = await db.applied.create({
      data: {
        exp,
        qual,
        schoolId,
        cv: cv ? cv : undefined,
        userId: req.authUser!.id,
        jobId,
      },
    })
    return res.status(200).json({
      message: 'Application succesfull',
      applied,
    })
  } catch (error) {
    console.log('[APPLY_POST]', (error as Error).message)
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
