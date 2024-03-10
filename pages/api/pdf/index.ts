import { NextApiRequest, NextApiResponse } from 'next'
import { Axios } from '@/request/request'
import verifyToken from '@/middleware/verifyToken'
import axios from 'axios'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { data, colorList, loc } = req.body

    if(loc?.state?.trim()?.length > 2) {
     await Axios.put('/users/profile/update/me', {
       city: loc.city,
       address: loc.address,
       state: loc.state,
       lga: loc.lga
      }, {
        headers: {
          Authorization: `Bearer ${req.token}`
        }
      })
    }

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
    ])
    // await generateAndSendPDF(data, colorList, req.authUser?.email!),

    res.status(200).send({
      message:
        'File generated successfully, check mail to download Curriculum Vitae',
    })
  } catch (error) {
  
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
