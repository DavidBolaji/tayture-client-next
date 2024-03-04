'use client'

import { useGlobalContext } from '@/Context/store'
import React, { useEffect, useState } from 'react'
import AlertModal from './AlertModal/AlertModal'

const HandleError = () => {
  const { message, setMessage } = useGlobalContext()
  const [modal, setModal] = useState<boolean>(false)
  useEffect(() => {
    if (message.trim().length > 0) {
      setModal(true)
    } else {
      setModal(false)
    }
  }, [message])
  return (
    <AlertModal isOpen={modal} close={() => setMessage('')} msg={message} />
  )
}

export default HandleError
