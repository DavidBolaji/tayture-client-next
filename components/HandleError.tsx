"use client"
import { useGlobalContext } from '@/Context/store'
import React, { useEffect, useState } from 'react'
import AlertModal from './Modal/AlertModal/AlertModal'

const HandleError = () => {
  const { message, setMessage } = useGlobalContext()
  const [modal, setModal] = useState<boolean>(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (message.trim().length > 0) {
      setModal(true)
      timeout = setTimeout(() => {
        setMessage("")
        setModal(false)
      }, 3000)
    } else {
      setModal(false)
    }

    return () => clearTimeout(timeout)
  }, [message, setMessage])

  return (
    <AlertModal isOpen={modal} close={() => setMessage('')} msg={message} timeout={3000} />
  )
}

export default HandleError
