import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Redirect = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/login')
  }, [])
  return null
}

export default Redirect
