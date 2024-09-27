import ejs from 'ejs';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {

      const template = readFileSync(join(process.cwd(), 'views', 'templateFour.ejs'), 'utf8');
      const html = ejs.render(template, {
        data: req.body.data,
        colorList: req.body.colorList,
        page: 1
      });
      // console.log(html)

      res.status(200).json({ html });
    } catch (error) {
      res.status(500).json({ error: 'Error rendering template' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}