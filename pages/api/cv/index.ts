import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  const { colorList, data, email } = req.body

  try {
    // await scrapeLogic(res, { colorList, data, email });
    const holder = await axios.post('https://fabulous-cranachan-d89a47.netlify.app/.netlify/functions/scrape', {
      colorList,
      data,
      email,
    })

    console.log(holder.data)

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf')
    res.end(holder.data.buffer) // Send the PDF buffer directly

    // res.end(holder.data.buffer)
    // res.status(201).json({
    //   message: 'Job status updated',
    // })
  } catch (error) {
    console.log((error as Error).message)
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}

export default handler
