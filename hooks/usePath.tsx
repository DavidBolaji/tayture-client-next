'use client'
import {  usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const usePath = () => {
  const pathname = usePathname()
  const router = useRouter()
  const jobId = router.query.jobId
  const scheduleId = router.query.scheduleId
  const blogId = router.query.blogId
  const template = router.query.template
  const [locationCurrent, setLoc] = useState('')

  useEffect(() => {
    const key =
      pathname === '/dashboard'
        ? '/dashboard'
        : pathname === '/calculator'
        ? '/calculator'
        : pathname === '/post_landing'
        ? '/post_landing'
        : pathname === '/jobs'
        ? '/jobs'
        : pathname === '/buildcv'
        ? '/buildcv'
        : pathname === '/buildcv/template'
        ? '/buildcv'
        : pathname === '/blog'
        ? '/blog'
        : pathname === `/blog/${blogId}`
        ? '/blog'
        : pathname === '/dashboard/jobs/all'
        ? '/dashboard/jobs'
        : pathname === '/dashboard/profile'
        ? '/dashboard'
        : pathname === '/dashboard/jobs'
        ? '/dashboard/jobs'
        : pathname === '/dashboard/cv'
        ? '/dashboard/cv'
        : pathname === `/dashboard/cv/${template}`
        ? '/dashboard/cv'
        : pathname === '/dashboard/admin'
        ? '/dashboard/admin'
        : pathname === '/dashboard/jobs/invited'
        ? '/dashboard/jobs'
        : pathname === '/dashboard/school/new'
        ? '/dashboard/school'
        : pathname === '/dashboard/school/post'
        ? '/dashboard/school'
        : pathname === '/dashboard/school/admin'
        ? '/dashboard/school'
        : pathname === '/dashboard/school/transaction'
        ? '/dashboard/school'
        : pathname === '/dashboard/school/draft'
        ? '/dashboard/school'
        : pathname === '/dashboard/school/manage/all'
        ? '/dashboard/school'
        : pathname === '/dashboard/school'
        ? // ? "/dashboard/school"
          // : pathname === `/dashboard/school/manage/${jobId}`
          '/dashboard/school'
        : pathname === `/dashboard/school/manage/${jobId}`
        ? '/dashboard/school'
        : pathname === `/dashboard/school/manage/assesement/${scheduleId}`
        ? '/dashboard/school'
        : pathname === '/dashboard/admin'
        ? 'admin'
        : pathname === '/dashboard/admin/blog'
        ? 'admin'
        : pathname === '/dashboard/admin/school/create'
        ? 'admin'
        : pathname === '/dashboard/admin/post'
        ? 'admin'
        : pathname === '/dashboard/blog/new'
        ? 'admin'
        : pathname === '/dashboard/blog/edit'
        ? 'admin'
        : pathname?.split('/')[pathname?.split('/').length - 1]
    setLoc(key)
  }, [pathname, jobId, scheduleId])

  return { locationCurrent }
}

export default usePath
