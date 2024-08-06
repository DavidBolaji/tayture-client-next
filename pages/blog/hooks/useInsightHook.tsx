"use client"
import { Axios } from '@/request/request'
import { Categories } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

const useInsightHook = () => {
  const [activeButton, setActiveButton] = useState('all')
  const { data: categories } = useQuery({
    queryKey: ['allCategory'],
    queryFn: async () => {
      const req = await Axios.get('/categories')
      return req.data.category as Categories[]
    },
  })

  const handleButtonClick = (buttonNumber: any) => {
    setActiveButton(buttonNumber)
  }


  return { handleButtonClick, categories, activeButton }
}

export default useInsightHook
