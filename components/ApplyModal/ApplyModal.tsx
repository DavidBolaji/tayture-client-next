import React, { ReactNode } from 'react'
import { StyledApplyModal } from './ApplyModal.style'

const ApplyModal: React.FC<{
  isOpen: boolean
  close: () => void
  ok: () => void
  children: ReactNode
}> = ({ isOpen, close, ok, children }) => (
  <StyledApplyModal
    open={isOpen}
    closable
    footer={null}
    onOk={ok}
    okText="Yes"
    cancelText="No"
    onCancel={close}
  >
    {children}
  </StyledApplyModal>
)

export default ApplyModal
