import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import verifyToken from '@/middleware/verifyToken'

const env = process.env.NEXT_PUBLIC_ENV === 'prod'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  let userObj: any

  userObj = {
    email: req.authUser?.email,
    first_name: req.authUser?.fname,
    middle_name: '',
    last_name: req.authUser?.fname,
    phone: req.authUser?.phone,
    preferred_bank: 'test-bank',
    country: 'NG',
  }
  if (env) {
    // const randomOption = Math.floor(Math.random() * 2);
    userObj = {
      email: req.authUser?.email,
      first_name: req.authUser?.fname,
      middle_name: '',
      last_name: req.authUser?.fname,
      phone: req.authUser?.phone,
      // preferred_bank: ,
      country: 'NG',
    }
  }

  try {
    await axios.post(
      'https://api.paystack.co/dedicated_account/assign',
      userObj,
      {
        headers: {
          Authorization: `Bearer `,
        },
      },
    )

    return res.status(200).json({
      message: 'Successful',
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error })
  }
}

export default verifyToken(handler)
