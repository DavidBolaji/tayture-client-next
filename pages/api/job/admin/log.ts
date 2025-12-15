import db from '@/db/db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    console.log('Fetching jobs from database...')

    // First, let's get a simple count to verify connection
    const jobCount = await db.job.count()
    console.log(`Total jobs in database: ${jobCount}`)

    const jobs = await db.job.findMany({
      select: {
        job_id: true,
        job_title: true,
        job_exp: true,
        job_no_hires: true,
        job_qual: true,
        job_resumption: true,
        job_min_sal: true,
        job_max_sal: true,
        active: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        school: {
          select: {
            sch_id: true,
            sch_name: true,
            sch_verified: true,
          },
        },
        user: {
          select: {
            id: true,
            fname: true,
            lname: true,
          },
        },
        applied: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    console.log(`Found ${jobs.length} jobs in database`)

    const jobsWithStatus = jobs.map((job) => ({
      ...job,
      // Determine visibility status - job is visible ONLY if both conditions are true
      isVisible: job.active === true && job.school.sch_verified === 1,
      // Format deadline (resumption date)
      deadline: job.job_resumption,
      // Get application count
      applicationCount: job.applied.length,
      // Format school verification status
      schoolStatus: job.school.sch_verified === 1 ? 'Approved' : 'Pending',
    }))

    const visibleCount = jobsWithStatus.filter(job => job.isVisible).length
    const hiddenCount = jobsWithStatus.filter(job => !job.isVisible).length
    
    // Debug visibility breakdown
    const activeJobs = jobs.filter(job => job.active === true).length
    const inactiveJobs = jobs.filter(job => job.active === false).length
    const verifiedSchools = jobs.filter(job => job.school.sch_verified === 1).length
    const unverifiedSchools = jobs.filter(job => job.school.sch_verified !== 1).length
    
    console.log(`Job breakdown:`)
    console.log(`- Total jobs: ${jobsWithStatus.length}`)
    console.log(`- Active jobs: ${activeJobs}, Inactive jobs: ${inactiveJobs}`)
    console.log(`- Verified schools: ${verifiedSchools}, Unverified schools: ${unverifiedSchools}`)
    console.log(`- Visible jobs (active + verified): ${visibleCount}`)
    console.log(`- Hidden jobs: ${hiddenCount}`)

    return res.status(200).json({
      message: 'Job log retrieved successfully',
      jobs: jobsWithStatus,
      debug: {
        totalJobs: jobs.length,
        visibleJobs: visibleCount,
        hiddenJobs: hiddenCount
      }
    })
  } catch (error) {
    console.error('Error fetching job log:', error)
    return res.status(500).json({ message: 'Internal server error', error })
  }
}