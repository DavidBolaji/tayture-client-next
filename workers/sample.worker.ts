import axios from 'axios';
import { Worker, Queue } from 'bullmq';
import Redis from 'ioredis';
const connection = new Redis(process.env.REDIS_URL!);

export const sampleQueue = new Queue('pdf-generation', {
    connection,
    defaultJobOptions: {
      attempts: 2,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
    },
  });

const worker = new Worker(
  'pdf-generation', // this is the queue name, the first string parameter we provided for Queue()
   async (job, done) => {
    // const data = job?.data;
    // console.log(data);

    const { data, colorList, email } = job.data;
      try {
        await generateAndSendPDF(data, colorList, email);
      
      } catch (error) {
        // Log the error
        console.error('PDF generation failed:', (error as Error).message);
    
        // if (job.attemptsMade < 20) {
        //   console.log(`Retrying job. Attempt ${job.attemptsMade + 1} out of 20.`);
        //   // return done(new Error('PDF generation failed. Retrying...'));
        // } else {
        //   console.error('PDF generation failed after 10 attempts.');
        //   // done(error as Error);
        // }
      }
  },
  {
    connection,
    concurrency: 5,
    removeOnComplete: { count: 1000 },
    removeOnFail: { count: 5000 },
  }
);

export default worker;

async function generateAndSendPDF(data: any, colorList: any, email: string) {
  console.log('called');
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