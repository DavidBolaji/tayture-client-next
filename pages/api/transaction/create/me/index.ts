import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  const { noPaid, amount, schoolId, jobId } = req.body
  if (!noPaid || !amount || !schoolId || !jobId)
    return res
      .status(400)
      .json({ message: 'Validation error all fields are required' })

  try {
    await db.$transaction(async (tx) => {
      const req1 = tx.transaction.create({
        data: {
          noPaid,
          amount,
          userId: req.authUser!.id,
          jobId,
          schoolId,
        },
      })
      const req2 = await tx.job.update({
        where: {
          job_id: jobId,
        },
        data: {
          status: true,
        },
      })
      await Promise.all([req1, req2])
    })

    return res.status(200).json({
      message: 'Transaction succesfull',
    })
  } catch (error) {
    console.log('[TRANSACTION_POST]', (error as Error).message)
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
