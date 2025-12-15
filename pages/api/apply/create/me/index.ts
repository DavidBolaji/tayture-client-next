import db from '@/db/db'
import sendAppliedEmail from '@/mail/sendAppliedEmail'
import sendAppliedEmail2 from '@/mail/sendAppliedEmail2'
import sendAppliedEmail3 from '@/mail/sendAppliedEmail3'
import verifyToken from '@/middleware/verifyToken'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export const calculateSubmittedAt = (
  currentDate: Date,
  expiryDays: number
): Date => {
  const result = new Date(currentDate)
  result.setDate(result.getDate() + expiryDays)
  return result
}

const isProd = process.env.NEXT_PUBLIC_ENV === 'prod'

const apiUrl = isProd
  ? process.env.JELO_API_LIVE
  : process.env.JELO_API_DEV

const baseUrl = isProd
  ? 'https://jelo.live'
  : 'http://localhost:3000'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { qual, exp, schoolId, cv, jobId, userId, assessmentId } = req.body

  if (!qual || !exp || !schoolId || !jobId) {
    return res.status(400).json({
      message: 'Validation error: all fields are required',
    })
  }

  const authUserId = userId ?? req.authUser?.id
  const authUser = req.authUser

  try {
    /** ----------------------------
     *  Parallel reads
     * ---------------------------- */
    const [existingApplication, job] = await Promise.all([
      db.applied.findFirst({
        where: {
          jobId,
          userId: authUserId,
        },
      }),
      db.job.findUnique({
        where: { job_id: jobId },
      }),
    ])

    if (existingApplication) {
      return res.status(200).json({
        message: 'User applied already',
        applied: existingApplication,
      })
    }

    /** ----------------------------
     *  Create application
     * ---------------------------- */
    const applied = await db.applied.create({
      data: {
        exp,
        qual,
        schoolId,
        cv: cv || undefined,
        userId: authUserId,
        jobId,
      },
    })

    /** ----------------------------
     *  Assessment flow (non-blocking)
     * ---------------------------- */
    if (assessmentId && authUser?.email) {
      ; (async () => {
        try {
          const { data: assessment } = await axios.get(
            `${apiUrl}/assesement/${assessmentId}/tayture`,
            {
              headers: {
                Authorization: `Bearer api_live_${schoolId}`,
              },
            }
          )

          const token = `${assessment.id}-${Date.now()}`
          const [, curTime] = token.split('-')
          const currentDate = new Date(Number(curTime))
          const assessmentLink = `${baseUrl}/candidate/${token}`

          await axios.post(
            `${apiUrl}/mail`,
            {
              content:
                'You are invited to take the assessment. Please complete it before the deadline.',
              type: 'invitation',
              email: authUser.email,
              firstName: authUser.fname,
              lastName: authUser.lname,
              title: assessment.title,
              estimatedTime: assessment.hasDuration
                ? `${assessment.duration} minute(s)`
                : 'None',
              questionCount: assessment.questions.length,
              expiryDays: 7,
              assessmentLink,
              assessmentId,
              token,
              submittedAt: calculateSubmittedAt(currentDate, 7),
            },
            {
              headers: {
                Authorization: `Bearer api_live_${schoolId}`,
              },
            }
          )
        } catch (err) {
          console.error('[ASSESSMENT_EMAIL_FAILED]', err)
        }
      })()
    }

    /** ----------------------------
     *  School email lookup
     * ---------------------------- */
    const school = await db.school.findUnique({
      where: { sch_id: applied.schoolId },
      select: {
        sch_name: true,
        user: { select: { email: true } },
      },
    })

      /** ----------------------------
       *  Fire-and-forget emails
       * ---------------------------- */
      ; (async () => {
        try {
          await Promise.allSettled([
            sendAppliedEmail({
              email: school?.user?.email as string,
            }),
            sendAppliedEmail2({
              email: 'hello@tayture.com',
              job: job?.job_title || '',
              school: school?.sch_name || '',
            }),

            sendAppliedEmail3({ email: authUser?.email || '', fname: authUser?.fname || '', job: job?.job_title || ''})

          ])
        } catch (err) {
          console.error('[APPLICATION_EMAIL_FAILED]', err)
        }
      })()

    /** ----------------------------
     *  Final response
     * ---------------------------- */
    return res.status(200).json({
      message: assessmentId
        ? 'Your application has been received. An assessment invitation will be sent to your email by Jelo.'
        : 'Your application has been received successfully.',
      applied,
    })
  } catch (error) {
    console.error('[APPLY_POST]', error)
    return res.status(500).json({
      message: 'An unexpected error occurred while applying',
    })
  }
}

export default verifyToken(handler)
