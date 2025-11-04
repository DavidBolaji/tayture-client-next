import db from '@/db/db'
import { sendTextMessageOTP } from '@/lib/services/user'
import verifyToken from '@/middleware/verifyToken'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    const user = await db.user.findFirst({
      where: {
        id: req.authUser?.id,
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

    let pinId = user.pinId // Fixed: Use existing pinId from database first
    const { add } = req.query

    // Fixed: Only send new OTP if explicitly requested and user is not validated
    if (add === '1' && !user?.validated) {
      try {
        // Fixed: Validate phone number before sending OTP
        if (!user.phone || user.phone.trim().length === 0) {
          return res.status(400).json({ 
            message: 'Phone number is required to send OTP' 
          })
        }

        console.log('Sending OTP to:', user.phone)
        const reqOTP = await sendTextMessageOTP(user.phone)
        
        // Fixed: Better error handling for OTP service
        if (reqOTP?.pinId) {
          pinId = reqOTP.pinId
          
          // Fixed: Update user with new pinId in database
          await db.user.update({
            where: { id: user.id },
            data: { pinId },
          })
          
          console.log('OTP sent successfully, pinId:', pinId?.substring(0, 10) + '...')
        } else {
          console.error('Failed to get pinId from OTP service:', reqOTP)
          return res.status(500).json({ 
            message: 'Failed to send OTP. Please try again.' 
          })
        }
      } catch (otpError: any) {
        console.error('Error sending OTP:', otpError)
        return res.status(500).json({ 
          message: 'Failed to send OTP. Please try again later.',
          error: otpError.message 
        })
      }
    }

    return res.status(200).json({
      message: 'Successful',
      user: { ...user, pinId },
    })
  } catch (error: any) {
    console.error('Error in /users/me handler:', error)
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    })
  }
}

export default verifyToken(handler)