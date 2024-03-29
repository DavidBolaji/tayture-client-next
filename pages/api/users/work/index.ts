import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })

  try {
    const user = await db.workHistory.findMany({
      where: {
        userId: req.body['userId'],
      },
      include: {
        roles: true, // Include associated roles
      },
    })

    if (user.length > 0) {
      // Delete associated roles for each work history entry
      await Promise.all(
        user.map(async (history) => {
          if (history.roles && history.roles.length > 0) {
            await db.workRole.deleteMany({
              where: {
                workId: history.id,
              },
            })
          }
        }),
      )

      await db.workHistory.deleteMany({
        where: {
          userId: req.body['userId'],
        },
      })
    }
    const createWork = req.body['work'].map(
      async (data: {
        title: string
        date: string
        location: string
        lga: string
        city: string
        address: string
        state: string
        endDate: string
        roles: { role: string }[]
      }) => {
       
        await db.workHistory.create({

          data: {
            title: data.title,
            startYear: data.date.split('-')[0].split(',')[1],
            startMonth: data.date.split('-')[0].split(',')[0],
            endMonth: data.date.split('-')[1].trim() === "Current" ? data.date.split('-')[0].split(',')[0] : data.date.split('-')[1].split(',')[0],
            endYear:  data.date.split('-')[1].trim() === "Current" ? data.date.split('-')[0].split(',')[1] : data.date.split('-')[1].split(',')[1],
            location: data.location,
            endDate:  data.date.split('-')[1].trim() === "Current" ? "Current" : undefined,
            lga: data.lga,
            city: data.city,
            address: data.address,
            state: data.state,
            userId: req.body['userId'],
            roles: {
              create: data.roles.map((role: { role: string }) => ({
                role: role.role,
                id: uuid(),
              })),
            },
          },
        })
      },
    )

    await Promise.all(createWork)

    const result = await db.workHistory.findMany({
      where: {
        userId: req.body['userId'],
      },
      include: {
        roles: true,
      },
    })

    return res.status(200).json({
      message: 'Work Hitory Created',
      work: result,
    })
  } catch (error) {
    console.log((error as Error).message);
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default handler
