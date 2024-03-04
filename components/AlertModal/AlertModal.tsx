import React from 'react'
import { StyledModal } from './AlertModal.style'
import Button from '../Button/Button'
import { regularFont } from '@/assets/fonts/fonts'

const AlertModal: React.FC<{
  isOpen: boolean
  close: () => void
  msg: string
}> = ({ isOpen, close, msg }) => (
  <StyledModal open={isOpen} closable footer={null}>
    <div className="bg-black [56px] w-full  flex justify-between items-center pt-[15px] px-6">
      <p
        className={`text-white flex items-center md:text-[14px] text-[10px] ${regularFont.className}`}
      >
        {msg}
      </p>
      <div>
        <Button
          text="OKAY"
          bold={false}
          onClick={close}
          render="dark"
          className="text-orange text-[12px] pl-5 md:text-[16px] md:pl-0"
        />
      </div>
    </div>
  </StyledModal>
)

export default AlertModal
