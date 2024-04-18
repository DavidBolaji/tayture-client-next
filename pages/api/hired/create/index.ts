import db from '@/db/db'
import sendHireTayture from '@/mail/sendHireTayture'
import sendHireUser from '@/mail/sendHireUser'
import verifyToken from '@/middleware/verifyToken'
import type { NextApiRequest, NextApiResponse } from 'next'


const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })


  try {
    const jobCreate = await db.hired.create({
      data: {
       userId: req.body.userId,
       jobId: req.body.jobId
      },
      select:{
        job: {
          select: {
            job_title: true,
            school: {
              select: {
                sch_name: true,
                user: {
                  select: {
                    fname: true,
                    email: true
                  }
                }
              }
            }
          }
        },
      }
    })
    const note = db.notifcation.create({
        data: {
          msg: `Hurray!!! you have been Hired `,
          notificationUser: req.body.userId as string,
          caption: "Job Hire"
        }
      })
    const note2 = db.notifcation.create({
        data: {
          msg: `Hurray!!! you have succesfully Hired `,
          notificationUser: req.authUser?.id as string,
          caption: "Hire Completed"
        }
      })
      await Promise.all([note, note2])

      sendHireTayture({
        job_title: jobCreate.job.job_title,
        school: jobCreate.job.school.sch_name as string
      })

      sendHireUser({
        job_title: jobCreate.job.job_title,
        school: jobCreate.job.school.sch_name as string,
        firstName: jobCreate.job.school.user.fname,
        email: jobCreate.job.school.user.email
      })

    res.status(201).json({
      message: 'Job status updated',
      job: jobCreate,
    })
  } catch (error) {
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)