'use client'

import { useGlobalContext } from '@/Context/store'
import React, { useEffect, useState } from 'react'
import AlertModal from './Modal/AlertModal/AlertModal'

const HandleError = () => {
  const { message, setMessage, setCount } = useGlobalContext()
  const [modal, setModal] = useState<boolean>(false)
  useEffect(() => {
    let t: any;
    if (message.trim().length > 0) {
      setModal(true)
      const t = setTimeout(() => {
        setMessage(() => "")
         clearTimeout(t)
       }, 3000)
    } else {
      setModal(false)
    }
    
// remove xler
  }, [message])
  return (
    <AlertModal isOpen={modal} close={() => setMessage('')} msg={message} />
  )
}

export default HandleError
