import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

let url =
  process.env.NEXT_PUBLIC_ENV === 'prod'
    ? process.env.JELO_API_LIVE
    : process.env.JELO_API_DEV

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  const assessmentId = req.query.assessmentId;
  const orgId = req.query.orgId;

  const assessment = await axios.get(
    `${url}/assesement/${assessmentId}/tayture`,
    { headers: { Authorization: `Bearer api_live_${orgId}` } },
  )

  res
    .status(200)
    .json({ message: 'Succesful', assessment: assessment.data })
}
