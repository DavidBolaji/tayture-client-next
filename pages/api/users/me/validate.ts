import db from '@/db/db'
import { sendTextMessageOTP, sendWelcome } from '@/lib/services/user'
import verifyToken from '@/middleware/verifyToken'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

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
            },
          },
        },
      },
      school: true,
      schedule: {
        include: {
          job: {
            select: {
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

  if (user?.first_time) {
    await sendWelcome({
      firstName: user.fname,
      email: user.email,
    })
  }

  let pinId

  if (!user?.validated) {
    // const reqOTP = await sendTextMessageOTP(user?.phone as string)
    // if (reqOTP.data.pinId) {
    //   pinId = reqOTP.data.pinId
    // }
  }

  return res.status(200).json({
    message: `Succesful`,
    user: { ...user, pinId },
  })
}

export default verifyToken(handler)
