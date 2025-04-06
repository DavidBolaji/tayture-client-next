import type { NextApiRequest, NextApiResponse } from 'next'
import { appendSchoolIdToEmail, createDVA } from '@/utils/helpers'
import { logger } from '@/middleware/logger'
import db from '@/db/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  const { userEmail, schoolId, userId, schoolName, phone } = req.body

  // create unique email
  const email = appendSchoolIdToEmail(userEmail, schoolId)
  // create dedicated virtual account paystack

  try {
    await createDVA(schoolId, userId, schoolName, email, phone)

    // await axios.post(
    //   'https://api.paystack.co/dedicated_account/assign',
    //   userObj,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    //       'Content-Type': 'application/json',
    //     },
    //   },
    // )

    return res.status(200).json({
      message: 'Successful',
    })
  } catch (error) {
    logger.error('Error creating dedicated account:', error)
    return res.status(500).json({ error: 'Failed to create dedicated account' })
  }
}

export default handler
