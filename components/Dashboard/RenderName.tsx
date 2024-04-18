import { regularFont } from '@/assets/fonts/fonts'
import {getUser2 } from '@/lib/api/user'
import { useQuery} from '@tanstack/react-query'
import React from 'react'

const RenderName = () => {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const req = await getUser2()
      return req.data.user
    },
  })
  return (
    <h3
      className={`${regularFont.className} text-black md:text-[32px] font-[600] text-[20px]`}
    >
      Welcome {user?.fname}
    </h3>
  )
}

export default RenderName
