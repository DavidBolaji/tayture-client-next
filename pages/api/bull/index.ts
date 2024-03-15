// pages/api/bull-board-api.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';


// Import your Bull queue instance
import queue from '@/utils/queue'; // Adjust the path as per your setup

// Configure Bull Board to use your Bull queue instance
const { router } = createBullBoard([new BullAdapter(queue)]);

// Define a handler to serve Bull Board UI
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.method);
  res.setHeader('Content-Security-Policy', 'default-src * data: blob: filesystem: about: ws: wss:');
  return res.status(200).send(router(req, res));
}
