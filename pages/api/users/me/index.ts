// pages/api/users/me/index.ts
// Updated to use database-stored OTP

import db from '@/db/db'
import { generateAndSendOTP } from '@/lib/services/otp'

import verifyToken from '@/middleware/verifyToken'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    const userId = req.authUser?.id

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const user = await db.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        applied: {
          select: {
            jobId: true,
            job: {
              select: {
                job_id: true,
                job_title: true,
                job_role: true,
                job_desc: true,
                job_exp: true,
                job_qual: true,
                job_min_sal: true,
                job_max_sal: true,
                job_resumption: true,
                job_active: true,
                applied: {
                  select: {
                    id: true,
                  },
                },
                school: {
                  select: {
                    sch_id: true,
                    sch_lga: true,
                    sch_city: true,
                    sch_state: true,
                  },
                },
                createdAt: true,
              },
            },
          },
        },
        school: true,
        schedule: {
          include: {
            job: {
              select: {
                job_id: true,
                job_title: true,
                job_role: true,
                job_desc: true,
                job_exp: true,
                job_qual: true,
                job_min_sal: true,
                job_max_sal: true,
                job_resumption: true,
                job_active: true,
                createdAt: true,
                applied: {
                  select: {
                    id: true,
                  },
                },
                school: {
                  select: {
                    sch_id: true,
                    sch_lga: true,
                    sch_city: true,
                    sch_state: true,
                  },
                },
              },
            },
          },
        },
        profile: true,
        others: true,
        hired: {
          include: {
            job: {
              select: {
                job_id: true,
                job_title: true,
                job_role: true,
                job_desc: true,
                job_exp: true,
                job_qual: true,
                job_min_sal: true,
                job_max_sal: true,
                job_resumption: true,
                job_active: true,
                createdAt: true,
                applied: {
                  select: {
                    id: true,
                  },
                },
                school: {
                  select: {
                    sch_id: true,
                    sch_lga: true,
                    sch_city: true,
                    sch_state: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const { add } = req.query

    // Send OTP if requested and user is not validated
    if (add === '1' && !user.validated) {
      try {
        // Validate phone number
        // if (!user.phone || user.phone.trim().length === 0) {
        //   return res.status(400).json({
        //     message: 'Phone number is required to send OTP',
        //   })
        // }

        // Generate and send OTP
        const otpResult = await generateAndSendOTP(user.id, user.phone)

        console.log('OTP sent successfully to user:', user.id)

        return res.status(200).json({
          message: 'OTP sent successfully',
          user: {
            ...user,
            otp: undefined, // Never send OTP to client
            otpExpiry: undefined,
            otpAttempts: undefined,
          },
          otpSent: true,
          otpExpiresAt: otpResult.expiresAt,
        })
      } catch (otpError: any) {
        console.error('Error sending OTP:', otpError)
        return res.status(500).json({
          message: otpError.message || 'Failed to send OTP. Please try again later.',
        })
      }
    }

    // Return user data without OTP fields
    return res.status(200).json({
      message: 'Successful',
      user: {
        ...user,
        otp: undefined, // Never expose OTP
        otpExpiry: undefined,
        otpAttempts: undefined,
      },
    })
  } catch (error: any) {
    console.error('Error in /users/me handler:', error)
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    })
  }
}

export default verifyToken(handler)