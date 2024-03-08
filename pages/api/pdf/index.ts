import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

import { Axios } from '@/request/request'
import verifyToken from '@/middleware/verifyToken'
import axios from 'axios'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { data, colorList } = req.body
    const templatePath = path.join(process.cwd(), 'views', 'templateOne.ejs')

    const updateSummary = Axios.put('/users/summary', {
      summary: data.summary,
      userId: req.authUser?.id,
    })
    const updateWork = Axios.put('/users/work', {
      work: data.history,
      userId: req.authUser?.id,
    })
    const updateEdu = Axios.put('/users/education', {
      education: data.education,
      userId: req.authUser?.id,
    })
    const updateSkills = Axios.put('/users/skills', {
      skill: data.skills,
      userId: req.authUser?.id,
    })

    // Generate PDF, merge, and send mail concurrently
    await Promise.all([
      updateSummary,
      updateWork,
      updateEdu,
      updateSkills,
      generateAndSendPDF(data, colorList, req.authUser?.email!),
    ])

    res.status(200).send({
      message:
        'File generated successfully, check mail to download Curriculum Vitae',
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    res.status(500).send('Error generating PDF')
  }
}

async function generateAndSendPDF(data: any, colorList: any, email: string) {
  try {
    const render = await axios.post(
      'https://tayture-pdf.onrender.com/api/pdf',
      { data, colorList, email },
    )
    console.log(render.data.message)
  } catch (error) {
    console.log((error as Error).message)
  }
}

export default verifyToken(handler)
