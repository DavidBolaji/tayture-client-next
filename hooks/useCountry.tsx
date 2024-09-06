'use client'
import { Axios } from '@/request/request'
import { useEffect, useState } from 'react'

const useCountry = () => {
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const req = await Axios.get('/location/countries')
        const format = req.data.data.map((e: any) => ({
          key: e.name,
          value: e.name,
        }))
        setCountries([...format])
      } catch (error: any) {
        console.log(error?.message)
      }
    }
    fetchCountries()
  }, [])

  const fetchStates = async (country: string) => {

    try {
      const req = await Axios.post('/location/states', { country })
   
      const format = req.data.data.map((e: any) => ({
        key: e.name,
        value: e.name,
      }))

      setStates([...format])
    } catch (error) {
      console.log((error as Error).message)
    }
  }


  const [countries, setCountries] = useState<{ value: string; key: string }[]>([])
  const [states, setStates] = useState<{ value: string; key: string }[]>([])

  return {
    countries,
    states,
    fetchStates,
    setStates
  }
}

export default useCountry
