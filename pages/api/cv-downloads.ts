import { NextApiRequest, NextApiResponse } from 'next'
import verifyToken from '@/middleware/verifyToken'
import db from '@/db/db'


const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) =>{
  if (req.method === 'GET') {
    try {
      const { startDate, endDate } = req.query

      const dateFilter: { createdAt?: { gte: Date; lte: Date } } = {}
      if (startDate && endDate) {
        dateFilter.createdAt = {
          gte: new Date(startDate as string),
          lte: new Date(endDate as string),
        }
      }

      const cvDownloads = await db.cVDownloadProcess.findMany({
        where: dateFilter,
        include: {
          user: {
            select: {
              fname: true,
              lname: true,
            },
          },
        },
      })

      const stats = {
        totalDownloads: cvDownloads.length,
        completedDownloads: cvDownloads.filter((download) => download.ended)
          .length,
      }

      const userDownloads = cvDownloads.reduce<
        Record<
          string,
          {
            userId: string
            userName: string
            downloadCount: number
            completedCount: number
          }
        >
      >((acc, download) => {
        const userId = download.userId
        if (!acc[userId]) {
          acc[userId] = {
            userId,
            userName: `${download.user.fname} ${download.user.lname}`,
            downloadCount: 0,
            completedCount: 0,
          }
        }
        acc[userId].downloadCount++
        if (download.ended) {
          acc[userId].completedCount++
        }
        return acc
      }, {})

      res.status(200).json({
        stats,
        downloads: Object.values(userDownloads),
      })
    } catch (error) {
      console.error('Error fetching CV downloads:', error)
      res.status(500).json({ error: 'Error fetching CV downloads' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default verifyToken(handler)