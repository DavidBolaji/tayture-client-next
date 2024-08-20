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

  // const permission = queryClient.getQueryData(['permission'])
  const job = router.query?.job
  const profile = router.query?.profile
  const school = router.query?.school

  useEffect(() => {
    setMounted(true)
  }, [])

  const { data: permission } = useQuery({
    queryKey: ['permision'],
    queryFn: async () => {
      return queryClient.getQueryData(['permission']);
    }
  })

  const { isError, isLoading, data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (permission !== 'limited') {
        try {
          const req = await getUser2()
          queryClient.setQueryData(['pinId'], () => req.data.user.pinId)
          const userData = req.data.user
          return userData
        } catch (error: any) {
          console.log('[ERROR]', error.message)
          throw new Error('Failed to fetch user data')
        }
      }
      return queryClient.getQueryData(['user']);
    },
    refetchOnWindowFocus: false,
  })



  useEffect(() => {
    if (!mounted) return

    if (data) {
      if (permission !== 'limited') {
        if (!data.validated) {
          setUI((prev: any) => ({
            ...prev,
            OTPModal: {
              ...prev.OTPModal,
              visibility: true,
            },
          }))
        }
      }

      if (permission !== 'limited') {
        if (typeof data.pinId !== 'undefined' && data.pinId.trim().length > 0) {
          localStorage.setItem('pinId', data.pinId)
        }
        localStorage.setItem('email', data.email)

        if (job === '1') {
          router.push('/dashboard/jobs?jobz=1')
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
