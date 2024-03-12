import { useEffect, useState } from 'react'
import { getUser } from '@/lib/api/user'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'
import HandleOTP from '../Modal/HandleOTP'
import { useGlobalContext } from '@/Context/store'

const AuthLayer = (props: PropsWithChildren) => {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { setUI } = useGlobalContext()
  const job = router.query.job
  const profile = router.query.profile
  const school = router.query.school

  useEffect(() => {
    setMounted(true)
  }, [])

  const { isError, isLoading, data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const req = await getUser()
        const userData = req.data.user

        return userData
      } catch (error: any) {
        console.log('[ERROR]', error.message)
        throw new Error('Failed to fetch user data')
      }
    },
    refetchOnWindowFocus: true,
  })

  useEffect(() => {
    if (!mounted) return

    if (data) {
      if (!data.validated) {
        setUI((prev) => ({
          ...prev,
          OTPModal: {
            ...prev.OTPModal,
            visibility: true,
          },
        }))
      }

      localStorage.setItem('email', data.email)

      if (job === '1') {
        router.push('/dashboard/jobs?job=1')
      }
      if (profile === '1') {
        router.push('/dashboard/profile?profile=2')
      }

      if (school === '1' && !data.school?.sch_name) {
        router.push('/dashboard/school/new?redirect_post=1')
      }

      if (school === '1' && data?.school?.sch_name) {
        router.push('/dashboard/school/new?post_job=1')
      }
    }
  }, [mounted, data, job, school, setUI, router])

  if (!mounted || isLoading) {
    return <div>loading...</div>
  }

  if (isError) {
    router.push('/auth/login')
    return null
  }

  return (
    <>
      {props.children}
      <HandleOTP closable={false} />
    </>
  )
}

export default AuthLayer
