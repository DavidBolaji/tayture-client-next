'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const ScrollToTop = () => {
  const path = usePathname()

  useEffect(() => {
    const doc = document.querySelector('.ant-layout-content')
    const auth = document.querySelector('#auth')
    const home = document.querySelector('#home')
    if (typeof document !== 'undefined') {
      doc?.scrollTo({
        behavior: 'smooth',
        top: 0,
      })
      auth?.scrollTo({
        behavior: 'smooth',
        top: 0,
      })
      home?.scrollTo({
        behavior: 'smooth',
        top: 0,
      })
    }
  }, [path])
  return null
}

export default ScrollToTop
