import { useEffect, useState } from 'react'
import { getUser2 } from '@/lib/api/user'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'
import HandleOTP from '../Modal/HandleOTP'
import { useGlobalContext } from '@/Context/store'
import Spinner from '../Spinner/Spinner'

const AuthLayer = (props: PropsWithChildren) => {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const queryClient = useQueryClient()
  const { setUI } = useGlobalContext()

  const job = router.query?.job
  const profile = router.query?.profile
  const school = router.query?.school

  useEffect(() => {
    setMounted(true)
  }, [])

  // Fixed: Corrected typo from 'permision' to 'permission'
  const { data: permission } = useQuery({
    queryKey: ['permission'],
    queryFn: async () => {
      return queryClient.getQueryData(['permission'])
    },
  })

  const { isError, isLoading, data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (permission !== 'limited') {
        try {
          const req = await getUser2()
          const userData = req.data.user
          
          // Fixed: Ensure pinId is set before continuing
          if (userData.pinId) {
            queryClient.setQueryData(['pinId'], userData.pinId)
            localStorage.setItem('pinId', userData.pinId)
          }
          
          // Fixed: Set email immediately
          if (userData.email) {
            localStorage.setItem('email', userData.email)
          }
          
          return userData
        } catch (error: any) {
          console.error('[ERROR] Failed to fetch user:', error.message)
          throw new Error('Failed to fetch user data')
        }
      }
      return queryClient.getQueryData(['user'])
    },
    refetchOnWindowFocus: false,
    // Fixed: Add retry logic for network issues
    retry: 2,
    retryDelay: 1000,
  })

  useEffect(() => {
    if (!mounted) return
    if (!data) return

    // Fixed: Moved pinId and email setting here as backup
    if (permission !== 'limited') {
      if (data.pinId && typeof data.pinId === 'string' && data.pinId.trim().length > 0) {
        queryClient.setQueryData(['pinId'], data.pinId)
        localStorage.setItem('pinId', data.pinId)
      }
      
      if (data.email) {
        localStorage.setItem('email', data.email)
      }

      // Show OTP modal if user is not validated
      if (!data.validated) {
        setUI((prev: any) => ({
          ...prev,
          OTPModal: {
            ...prev.OTPModal,
            visibility: true,
          },
        }))
      }

      // Handle query redirects
      if (job === '1') {
        router.push('/dashboard/jobs?jobz=1')
      }
      if (profile === '1') {
        router.push('/dashboard/profile?profile=2')
      }

      if (school === '1') {
        if (!data.school?.sch_name) {
          router.push('/dashboard/school/new?redirect_post=1')
        } else {
          router.push('/dashboard/school/new?post_job=1')
        }
      }
    }
  }, [mounted, data, job, school, setUI, router, profile, permission])

  if (!mounted || isLoading) {
    return (
      <div className="flex h-screen w-full justify-center items-center">
        <Spinner color="orange" />
      </div>
    )
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