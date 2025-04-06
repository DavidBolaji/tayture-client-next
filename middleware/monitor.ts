import { NextApiRequest, NextApiResponse } from 'next'
import { withRateLimit } from './rateLimiter'
import db from '@/db/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const stats = await db.$transaction([
      // Get counts for different webhook statuses
      db.webhookEvent.count({ where: { status: 'pending' } }),
      db.webhookEvent.count({ where: { status: 'processed' } }),
      db.webhookEvent.count({ where: { status: 'failed' } }),

      // Get recent failed webhooks
      db.webhookEvent.findMany({
        where: { status: 'failed' },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),

      // Get processing times statistics
      db.webhookEvent.aggregate({
        where: { status: 'processed' },
        _avg: {
          retryCount: true,
        },
      }),
    ])

    return res.status(200).json({
      pending: stats[0],
      processed: stats[1],
      failed: stats[2],
      recentFailures: stats[3],
      averageRetries: stats[4]._avg.retryCount,
    })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch monitoring data' })
  }
}

export default withRateLimit(handler)
