"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { AxiosError, AxiosResponse } from 'axios'
import { useGlobalContext } from '@/Context/store'
import { useSearchParam } from 'react-use'
import { useParams, usePathname } from 'next/navigation'

const useSessionSchool = () => {
  const router = useRouter()
  const { setMessage } = useGlobalContext()
  const ses = router.query?.session
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['school_admin_access', ses],
    mutationFn: async (session: string) => {
      return await Axios.post(
        '/users/login/session',
        { session },
        {
          headers: {
            Authorization: `Bearer ${session}`,
          },
        },
      )
    },
    onSuccess: (res: AxiosResponse) => {
        queryClient.clear();
        queryClient.setQueryData(['permission'], () => 'limited')
      
        queryClient.setQueryData(['user'], () => res.data.user)
      const t = setTimeout(() => {
        clearTimeout(t)
        window.location.assign('/dashboard/school')
      }, 1000)
    },
    onError: (err) => {
      setMessage(
        () =>
          (err as AxiosError<{ error: string }>).response?.data?.error ||
          (err as Error).message,
      )
    },
  })

  useEffect(() => {
    if (ses) {
      mutate(ses as string)
    }
  }, [ses])
  return {}
}

export default useSessionSchool
