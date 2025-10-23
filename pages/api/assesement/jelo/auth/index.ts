// /pages/api/auth/login-with-school.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const url =
    process.env.NEXT_PUBLIC_ENV === 'prod'
        ? process.env.JELO_API_LIVE
        : process.env.JELO_API_DEV

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST')
        return res.status(405).json({ message: 'Method not allowed' })
    
    const { schoolId } = req.body

    if (!schoolId) {
        return res.status(400).json({ error: 'Missing schoolId' })
    }

    try {
        // Call j.com API using Axios
        const apiRes = await axios.post(
            `${url}/login`,
            {},
            {
                headers: {
                    Authorization: `Bearer api_live_${schoolId}`,
                },
                // Ensure we receive cookies (for server-to-server)
                withCredentials: true,
                validateStatus: () => true, // Let us handle any status manually
            }
        )

        // Forward any cookies set by j.com to browser
        const setCookie = apiRes.headers['set-cookie']
        if (setCookie) {
            res.setHeader('set-cookie', setCookie)
        }

        // Forward the data & status code from j.com
        res.status(apiRes.status).json(apiRes.data)
    } catch (error: any) {
        console.error('Login proxy failed:', error.message)
        res
            .status(500)
            .json({ error: 'Internal server error', details: error.message })
    }
}
