import db from '@/db/db'
import sendJobPosted from '@/mail/sendJobPosted'
import verifyToken from '@/middleware/verifyToken'
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

let url =
  process.env.NEXT_PUBLIC_ENV === 'prod'
    ? process.env.JELO_API_LIVE
    : process.env.JELO_API_DEV

type Data = {
  message: string
  job?: any
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  const holder = ['job_resumption']

  const keys = Object.keys(req.body)
  const data: any = {}

  keys.forEach((key) => {
    if (!holder.includes(key)) {
      data[key] = req.body[key]
    }
  })

  const { assessment, 
    assessmentId,
    enable_assessment, 
    ...rest 
  } = data;

  let createAssessment: any

  if (req.body?.enable_assessment) {
    try {
      createAssessment = await axios.post(
        `${url}/assesement`,
        {
          ...assessment,
          questions: assessment.questions,
          introContent: assessment.introContent[0].content.trim().length > 0 ? assessment.introContent : [],
        },
        { headers: { Authorization: `Bearer api_live_${req.body.jobSchoolId}` } }
      )

    } catch (err) {
      console.error('Assessment creation failed:', (err as Error).message)
      createAssessment = null // continue gracefully
    }
  }

  try {
    const job = await db.job.create({
      data: {
        ...rest,
        job_no_hires: String(req.body.job_no_hires),
        job_active: Array.isArray(req.body.job_active)
          ? JSON.stringify(req.body.job_active)
          : req.body.job_active,
        job_resumption: new Date(req.body.job_resumption.trim()),
        jobUserzId: req.authUser!.id,
        assessmentId: createAssessment?.data?.assesement.id ?? undefined,
      },
    })

    const note = db.notifcation.create({
      data: {
        msg: `Hurray!!! you have succesfully created a job`,
        notificationUser: req.authUser?.id as string,
        caption: 'Job created',
      },
    })
    const sch = await db.school.findFirst({
      where: {
        sch_id: job.jobSchoolId,
      },
    })

    const [, school] = await Promise.all([note, sch])

    await sendJobPosted({
      job_title: job.job_title,
      school: school?.sch_name as string,
    })

    return res.status(200).json({
      message: school?.sch_verified
        ? 'You have successfully posted a vacancy. All our users have been notified. You can also copy and share the link to the job on your social media handles'
        : 'You have successfully posted a vacancy. All our users will be notified shortly. You will be contacted for school verification.',
      job: job,
    })
  } catch (error) {
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
