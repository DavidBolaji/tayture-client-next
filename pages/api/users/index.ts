import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  user?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' })

  let whereClause: any = {}; // Initialize an empty where clause

  // Construct where clause based on query parameters
  if (req.query.filter) {
    whereClause = {
      OR: [
        { fname: { contains: req.query.filter as string }},
        { lname: { contains: req.query.filter as string }},
        { email: { contains: req.query.filter as string }},
      ]
    };
  }


  // Check if start date is provided
  if (req.query.start) {
    // Convert start date to ISO format
    const startDate = new Date(req.query.start as string).toISOString();
    // startDate.setDate(startDate.getDate() + 1)
    whereClause.createdAt = {};

    // Add condition to whereClause for createdAt field
    whereClause.createdAt.gte = startDate;

    // Check if end date is provided, if so, add it to whereClause
    if (req.query.end) {
      // Convert end date to ISO format
      const endDate = new Date(req.query.end as string)
      endDate.setDate(endDate.getDate() + 2)
      const end = endDate.toISOString();
      whereClause.createdAt.lte = end;
    }


  }

  // Check if city, lga, or state are provided
  if (req.query.city || req.query.lga || req.query.st) {
    whereClause.profile = {}; // Initialize profile condition

    if (req.query.city) {
      // Add condition for city
      whereClause.profile.city = req.query.city;
    }
    if (req.query.lga) {
      // Add condition for lga
      whereClause.profile.lga = req.query.lga;
    }
    if (req.query.st) {
      // Add condition for state
      whereClause.profile.state = req.query.st;
    }
  }

  // Check if path is provided
  if (req.query.path) {
    whereClause.path =  {
      contains: req.query.path
    } 
  }

 

  // Fetch users based on whereClause
  const user = await db.user.findMany({
    where: whereClause, // Apply the constructed where clause
    include: {
      applied: {
        include: {
          job: {
            include: {
              school: true
            }
          },
          school: true
        }
      },
      hired: {
        include: {
          job: {
            include: {
              school: true
            }
          },
        }
      },
      schedule: {
        include: {
          job: {
            include: {
              school: true
            }
          },
          school: true
        }
      },
      school: {
        include: {
          job: true,
          applied: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });


  res.status(200).json({ message: 'Successful', user });
}
