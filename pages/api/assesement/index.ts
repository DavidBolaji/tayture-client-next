import db from '@/db/db'
import sendAssesementResultMail from '@/mail/sendAssessmentResult'
import { handleFormat, handlePath, handleResult } from '@/utils/helpers'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  const formatBody = handleFormat(req.body)

  const result = await db.assesement.findFirst({
    where: {
      a_email: formatBody!.email as string,
    },
  })

  const path = Object.values(req.body).map((e: any) =>
    Object.keys(e).find((key) => key !== 'total'),
  ) as unknown as string[]

  let taken = 1

  if (result !== null) {
    taken = result.taken + 1
    const mergePath = handlePath(result.path, taken, path)
    const mergeResult = handleResult(result.result, taken, req.body)
    await db.assesement.updateMany({
      where: {
        a_email: formatBody!.email as string,
      },
      data: {
        path: mergePath,
        result: mergeResult,
        taken,
      },
    })
  } else {
    await db.assesement.create({
      data: {
        a_email: formatBody?.email,
        a_name: formatBody?.firstName!,
        taken,
        result: JSON.stringify([{ [taken]: req.body }]),
        path: JSON.stringify([{ [taken]: path }]),
      },
    })
  }
  sendAssesementResultMail({
    email: formatBody?.email,
    firstName: formatBody?.firstName,
    data: req.body,
  })

  return res.status(200).json({ message: 'Succesful' })
}
