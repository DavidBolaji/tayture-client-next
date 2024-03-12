import React, { ReactNode } from 'react'
import { StyledApplyLandingModal } from './ApplyLandingModal.style'

const ApplyLandingModal: React.FC<{
  isOpen: boolean
  close: () => void
  ok: () => void
  children: ReactNode
}> = ({ isOpen, close, ok, children }) => (
  <StyledApplyLandingModal
    open={isOpen}
    closable
    footer={null}
    onOk={ok}
    okText="Yes"
    cancelText="No"
    onCancel={close}
  >
    {children}
  </StyledApplyLandingModal>
)

export default ApplyLandingModal
