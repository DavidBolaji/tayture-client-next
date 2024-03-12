import React, { ReactNode } from 'react'
import { StyledModal } from './PaymentModal.style'
import { regularFont } from '@/assets/fonts/fonts'

const PaymentModal: React.FC<{
  isOpen: boolean
  close: () => void
  children: ReactNode
}> = ({ isOpen, close, children }) => (
  <StyledModal
    className={regularFont.className}
    open={isOpen}
    onCancel={close}
    closable
    footer={null}
  >
    {children}
  </StyledModal>
)

export default PaymentModal
