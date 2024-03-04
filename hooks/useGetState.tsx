import { useGlobalContext } from '@/Context/store'
import { IUser } from '@/pages/api/users/types'
import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

const useGetState = () => {
  const queryClient = useQueryClient()
  const { user: u } = useGlobalContext()
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = (await queryClient.getQueryData([
          'user',
        ])) as unknown as IUser

        setUser({ ...userData })
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchData()
  }, [queryClient, u])

  return { user }
}

export default useGetState
