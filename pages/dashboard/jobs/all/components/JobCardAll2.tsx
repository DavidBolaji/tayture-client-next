import React, { useEffect, useState } from 'react'
import { Grid } from 'antd'
import { useQueryClient } from '@tanstack/react-query'

import { IJobSchDb } from '@/pages/api/job/types'
import { useGlobalContext } from '@/Context/store'

const {useBreakpoint} = Grid

const JobCardAll2: React.FC<{
  type: 'applied' | 'scheduled' | 'hired'
}> = ({ type }) => {

  const [open, setOpen] = useState(false)
  const screens = useBreakpoint()
  const queryClient = useQueryClient()
  const { count, setCount } = useGlobalContext()
  const data = queryClient.getQueryData(['activeJob']) as IJobSchDb

  const setPage = () => {

    if (type === 'applied') {
      queryClient.setQueryData(['activeAppliedJob'], null)
    } else if (type === 'scheduled') {
      queryClient.setQueryData(['activeScheduledJob'], null)
    } else if (type === 'hired') {
      queryClient.setQueryData(['activeHiredJob'], null)
    } 
  }

//   useEffect(() => {
//     setPage()
//     if(!open) return;
//     handleClick()
//   }, [type])

  return null
}

export default JobCardAll2
