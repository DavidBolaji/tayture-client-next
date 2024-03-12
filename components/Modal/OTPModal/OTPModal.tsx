import React, { ReactNode } from 'react'
import { StyledModal } from './OTPModal.style'
import { regularFont } from '@/assets/fonts/fonts'

const OTPModal: React.FC<{
  isOpen: boolean
  close: () => void
  children?: ReactNode
  closable: boolean
}> = ({ isOpen, close, children, closable }) => (
  <StyledModal
    className={regularFont.className}
    open={isOpen}
    onCancel={close}
    maskClosable={closable}
    closable={closable}
    footer={null}
  >
    {children}
  </StyledModal>
)

export default OTPModal
