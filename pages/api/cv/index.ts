import type { NextApiRequest, NextApiResponse } from 'next'
import { scrapeLogic } from './scrapeLogic';


  const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST')
      return res.status(405).json({ message: 'Method not allowed' })
    const { colorList, data, email } = req.body;

  
    try {
        await scrapeLogic(res, { colorList, data, email });
      
      res.status(201).json({
        message: 'Job status updated',
      })
    } catch (error) {
      res.status(400).json({
        message: `An error occured: ${(error as Error).message}`,
      })
    }
  }
  
  export default handler