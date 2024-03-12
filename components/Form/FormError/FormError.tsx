'use client'
import { Alert } from 'antd'
import React from 'react'
import { MdOutlineError } from 'react-icons/md'

const FormError: React.FC<{
  msg: string
}> = ({ msg }) => {
  return (
    <div className="flex items-center text-left gap-3 mt-2 ml-1">
      <div>
        <MdOutlineError color="#B3261E" />
      </div>
      <div className="text-sm">{msg}</div>
    </div>
  )
}

export default FormError
