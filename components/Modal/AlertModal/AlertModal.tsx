import React, { ReactNode } from 'react'
import { StyledModal } from './AlertModal.style'
import { regularFont } from '@/assets/fonts/fonts'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

export type MessageType = 'success' | 'error' | 'info'

const AlertModal: React.FC<{
  isOpen: boolean
  close: () => void
  msg: string | ReactNode
  type?: MessageType
  timeout?: number // Optional timeout parameter (not used anymore)
}> = ({ isOpen, close, msg, type = 'info' }) => {

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
            <CheckOutlined color="white" className="text-white text-xl" />
          </div>
        )
      case 'error':
        return (
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
            <CloseOutlined className="text-white text-xl" />
          </div>
        )
      default:
        return null
    }
  }

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-grey-700'
      case 'error':
        return 'text-grey-700'
      default:
        return 'text-gray-800'
    }
  }

  return (
    <StyledModal 
      open={isOpen} 
      onCancel={close}
      closable={true}
      footer={null}
      centered
      width={400}
    >
      <div className="flex flex-col items-center justify-center min-h-[120px] px-4 py-6">
        {getIcon()}
        <p className={`${getTextColor()} text-center text-sm leading-relaxed ${regularFont.className}`}>
          {msg}
        </p>
      </div>
    </StyledModal>
  )
}

export default AlertModal
