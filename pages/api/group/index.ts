import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { logger } from '@/middleware/logger'


let url =
  process.env.NEXT_PUBLIC_ENV === 'prod'
    ? process.env.JELO_API_LIVE
    : process.env.JELO_API_DEV


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const orgId = req.query.orgId

  console.log(orgId);
  

  try {
   
    const getOrgGroup = await axios.get(
      `${url}/group`,
      { headers: { Authorization: `Bearer api_live_${orgId}` } },
    )

    return res.status(200).json({
      message: 'fetch group successfully',
      group: getOrgGroup.data,
    })
  } catch (error) {
    logger.error(error)
    if ((error as Error).name === 'PrismaClientKnownRequestError') {
      return res.status(400).json({
        message: `An error occurred: Client can only create one School`,
      })
    }
    res.status(400).json({ message: `An error occurred: ${(error as Error).message}` })
  }
}
