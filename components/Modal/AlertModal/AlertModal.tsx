import React, { ReactNode } from 'react'
import { StyledModal } from './AlertModal.style'
import { regularFont } from '@/assets/fonts/fonts'

const AlertModal: React.FC<{
  isOpen: boolean
  close: () => void
  msg: string | ReactNode
  timeout: number // Timeout in milliseconds
}> = ({ isOpen, close, msg, timeout }) => {

  return (
    <StyledModal open={isOpen} closable footer={null}>
      <div className="bg-black [56px] w-full  flex justify-between items-center pt-[15px] px-6">
        <p className={`text-white flex items-center md:text-[14px] text-[10px] ${regularFont.className}`}>
          {msg}
        </p>
      </div>
      {/* <div className="absolute bottom-10 w-full" style={{ width: `${progress}%`, backgroundColor: 'green', height: '4px' }} /> */}
    </StyledModal>
  )
}

export default AlertModal
