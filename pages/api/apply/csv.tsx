import db from '@/db/db'
import xlsx from 'xlsx'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { start, end } = req.body

    try {
      // Fetch data from the database using db
      const results = await db.applied.findMany({
        where: {
          createdAt: {
            gte: new Date(start),
            lte: new Date(end),
          },
        },
        include: {
          user: true,
          school: true,
          job: true,
        },
      })
      // Transform results to the desired structure
      const data = results.map((result) => ({
        fname: result.user.fname,
        lname: result.user.lname,
        sch_name: result.school.sch_name,
        job_title: result.job.job_title,
        cv: result.cv,
        createdAt: result.createdAt,
      }))

      // Convert data to CSV using xlsx
      const worksheet = xlsx.utils.json_to_sheet(data)
      const workbook = xlsx.utils.book_new()
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Applied')

      // Generate buffer and convert to Base64
      const csvBuffer = xlsx.write(workbook, { type: 'buffer', bookType: 'csv' }) // Changed variable name to avoid confusion
      const csvData = csvBuffer.toString('utf-8') // Changed encoding to 'utf-8' for better readability


      // Set response headers and send the CSV file to the client
      res.setHeader('Content-Disposition', 'attachment; filename=applied.csv')
      res.setHeader('Content-Type', 'text/csv')
      res.status(200).send(csvData)
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    } finally {
      await db.$disconnect()
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
