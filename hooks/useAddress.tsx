'use client'
import { Axios } from '@/request/request'
import { useEffect, useState } from 'react'

const useAddress = () => {
  useEffect(() => {
    const fetchState = async () => {
      try {
        const req = await Axios.get('/location/states')
        const format = req.data.data.map((e: any) => ({
          key: e.name,
          value: e.name,
          label: e.name,
        }))
        setStates([...format])
      } catch (error: any) {
        console.log(error?.message)
      }
    }
    fetchState()
  }, [])

  const fetchCity = async (state: string) => {
    try {
      const req = await Axios.post('/location/cities', { state })
      const format = req.data.data.map((e: any) => ({
        key: e,
        value: e,
      }))

      setCity([...format])
    } catch (error) {
      console.log((error as Error).message)
    }
  }
  const fetchLga = async (city: string) => {
    try {
      const req = await Axios.post('/location/lga', {
        lga: city,
      })
      const format = req.data.data.map((e: any) => ({
        key: e,
        value: e,
      }))

      setLga([...format])
    } catch (error) {
      console.log((error as Error).message)
    }
  }

  const [states, setStates] = useState<{ value: string; key: string }[]>([])
  const [city, setCity] = useState<{ value: string; key: string }[]>([])
  const [lga, setLga] = useState<{ value: string; key: string }[]>([])

  return {
    states,
    city,
    lga,
    fetchCity,
    fetchLga,
    setCity,
    setLga,
  }
}

export default useAddress
