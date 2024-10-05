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

  // Start non-essential updates as async tasks
  const asyncTasks = [
    axios.put(
      `${host}/users/profile/update/me`,
      {
        country: location[0]?.trim(),
        state: location[1]?.trim(),
        city: location[2]?.trim()?.length > 0 ? location[2] : undefined,
        lga: location[3]?.trim()?.length > 0 ? location[3] : undefined,
      },
      { headers: { Authorization: `Bearer ${req.token}` } }
    ),
    axios.post(
      `${url}/${template}`,
      { colorList, data, email },
      // { responseType: 'arraybuffer' } // Timeout added for axios request
    ),
    axios.put(`${host}/users/summary`, {
      summary: data.summary,
      userId: req.authUser?.id,
    }),
    axios.put(`${host}/users/work`, {
      work: data.employment,
      userId: req.authUser?.id,
    }),
    axios.put(`${host}/users/education`, {
      education: data.education,
      userId: req.authUser?.id,
    }),
    axios.put(`${host}/users/skills`, {
      skill: data.skills,
      userId: req.authUser?.id,
    }),
  ]

  try {
    // Only wait for generateCv since it is critical to the response
    // const generateCv = axios.post(
    //   `${url}/${template}`,
    //   { colorList, data, email },
    //   // { responseType: 'arraybuffer' } // Timeout added for axios request
    // )

    // Ensure non-blocking processing of async tasks
    // const [holder] = await Promise.all([generateCv])

    // Check if the response is actually a PDF
    // if (holder.headers['content-type'] !== 'application/pdf') {
    //   throw new Error('Received non-PDF response')
    // }

    // Stream the PDF response back to the client
    // res.setHeader('Content-Type', 'application/pdf')
    res.status(200).send({message: "success"})

    // Non-blocking background tasks - don't await these
    Promise.all(asyncTasks).catch((error) =>
      console.error('Error in background tasks:', error)
    )
  } catch (error: any) {
    console.error('Error generating the CV or updating data:', error)

    // Enhanced error logging for better troubleshooting
    if (error.response) {
      console.error('Response data:', error?.response?.data)
      console.error('Response status:', error?.response?.status)
      console.error('Response headers:', error?.response?.headers)
    }

    // Return error response to client
    res.status(400).json({
      message: `An error occurred: ${(error as Error).message}`,
    })
  }
}

export default verifyToken(handler)
