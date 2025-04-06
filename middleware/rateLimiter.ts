import { NextApiRequest, NextApiResponse } from 'next'
import nextRateLimit from 'next-rate-limit'

// Define rate limiting settings
const limiter = nextRateLimit({
  interval: 60 * 1000, // 1 minute (60,000 ms)
  uniqueTokenPerInterval: 500, // Max 500 unique users per minute
  // perUserLimit: 30, // Each user can make up to 30 requests per minute
  // perIPLimit: 60, // Each IP can make up to 60 requests per minute
})

// Function to extract IP from request headers
function getIP(req: NextApiRequest): string {
  return (
    req.headers['x-forwarded-for']?.toString().split(',')[0] || // For Vercel, proxies, etc.
    req.socket.remoteAddress || // For local development
    '127.0.0.1' // Default fallback
  )
}

// Middleware function for API routes
export function withRateLimit(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Use extracted IP as a unique identifier
      const ip = getIP(req)

      // Call `checkNext`, passing a mocked `NextRequest` with an `ip`
      const headers = await limiter.checkNext({ ip } as any, 100)

      // Apply the headers to the response
      Object.entries(headers).forEach(([key, value]) => {
        res.setHeader(key, value)
      })

      return handler(req, res)
    } catch {
      res
        .status(429)
        .json({ message: 'Too many requests. Please try again later.' })
    }
  }
}
