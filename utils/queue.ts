// utils/queue.ts
import Queue from 'bull';

// Create a new Bull queue instance
const queue = new Queue('pdf-generation');

export default queue;
