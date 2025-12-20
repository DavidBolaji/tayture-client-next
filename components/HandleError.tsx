"use client"
import { useGlobalContext } from '@/Context/store'
import React, { useEffect, useState } from 'react'
import AlertModal from './Modal/AlertModal/AlertModal'

const HandleError = () => {
  const { message, setMessage } = useGlobalContext()
  const [modal, setModal] = useState<boolean>(false)

  useEffect(() => {
    if (message?.text?.trim().length > 0) {
      setModal(true)
    } else {
      setModal(false)
    }
  }, [message])

  const handleClose = () => {
    setMessage({ text: "", type: 'info' })
    setModal(false)
  }

  return (
    <AlertModal 
      isOpen={modal} 
      close={handleClose} 
      msg={message?.text || ''} 
      type={message?.type || 'info'}
    />
  )
}

export default HandleError
