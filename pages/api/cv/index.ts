import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import verifyToken from '@/middleware/verifyToken'

const url =
  process.env.NEXT_PUBLIC_CV_ENV === 'dev'
    ? 'http://localhost:4000/api'
    : process.env.NEXT_PUBLIC_RENDER_CV
let host =
  process.env.NEXT_PUBLIC_ENV === 'prod'
    ? process.env.NEXT_PUBLIC_PROD
    : process.env.NEXT_PUBLIC_DEV

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  const { colorList, data, email } = req.body
  const { template } = req.query
  const location = data.location.split(',')


  await axios.put(
    `${host}/users/profile/update/me`,
    {
      country: location[0]?.trim(),
      state: location[1]?.trim(),
      city: location[2]?.trim()?.length > 0 ? location[2] : undefined,
      lga: location[3]?.trim()?.length > 0 ? location[3] : undefined,
    },
    {
      headers: {
        Authorization: `Bearer ${req.token}`,
      },
    },
  )

  const updateSummary = axios.put(`${host}/users/summary`, {
    summary: data.summary,
    userId: req.authUser?.id,
  })

  const updateWork = axios.put(`${host}/users/work`, {
    work: data.employment,
    userId: req.authUser?.id,
  })

  const updateEdu = axios.put(`${host}/users/education`, {
    education: data.education,
    userId: req.authUser?.id,
  })

  const updateSkills = axios.put(`${host}/users/skills`, {
    skill: data.skills,
    userId: req.authUser?.id,
  })

  try {
    await Promise.all([updateSummary, updateWork, updateEdu, updateSkills])

    const holder = await axios.post(
      `${url}/${template}`,
      {
        colorList,
        data,
        email,
      },
      { responseType: 'arraybuffer' },
    )

    // Set appropriate headers for downloading PDF
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${data.name}.pdf"`,
    )
    res.setHeader('Content-Length', holder.data.length)

    res.send(holder.data)
  } catch (error) {
    console.log((error as Error).message)
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
