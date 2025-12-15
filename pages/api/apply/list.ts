import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'

interface QueryParams {
  page?: string
  limit?: string
  search?: string
  startDate?: string
  endDate?: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const { page = '1', limit = '10', search = '', startDate, endDate }: QueryParams = req.query

      const pageNum = parseInt(page)
      const limitNum = parseInt(limit)
      const skip = (pageNum - 1) * limitNum

      // Build where clause
      const whereClause: any = {}

      // Date filter
      if (startDate && endDate) {
        whereClause.createdAt = {
          gte: new Date(startDate),
          lte: new Date(endDate),
        }
      }

      // Search filter - using contains for partial matching
      if (search) {
        whereClause.OR = [
          {
            user: {
              fname: {
                contains: search
              }
            }
          },
          {
            user: {
              lname: {
                contains: search
              }
            }
          },
          {
            school: {
              sch_name: {
                contains: search
              }
            }
          }
        ]
      }

      // Get total count for pagination
      const totalCount = await db.applied.count({
        where: whereClause
      })

      // Fetch applications with pagination
      const applications = await db.applied.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              fname: true,
              lname: true,
              email: true,
              phone: true
            }
          },
          school: {
            select: {
              sch_name: true
            }
          },
          job: {
            select: {
              job_title: true,
              job_resumption: true,
              createdAt: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limitNum
      })

      const formattedApplications = applications.map(app => ({
        id: app.id,
        applicantFirstName: app.user.fname,
        applicantLastName: app.user.lname,
        applicantEmail: app.user.email,
        applicantPhone: app.user.phone,
        schoolName: app.school.sch_name,
        jobTitle: app.job.job_title,
        jobCreatedAt: app.job.createdAt,
        jobDeadline: app.job.job_resumption,
        applicationDate: app.createdAt,
        cv: app.cv
      }))

      res.status(200).json({
        applications: formattedApplications,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(totalCount / limitNum),
          totalCount,
          hasNext: pageNum < Math.ceil(totalCount / limitNum),
          hasPrev: pageNum > 1
        }
      })
    } catch (error) {
      console.error('Error fetching applications:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    } finally {
      await db.$disconnect()
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}

export default handler