import React, { ReactNode } from 'react'
import { StyledScheduleModal } from './ScheuleModal.style'

const ScheduleModal: React.FC<{
  isOpen: boolean
  close: () => void
  ok: () => void
  children: ReactNode
}> = ({ isOpen, close, ok, children }) => (
  <StyledScheduleModal
    open={isOpen}
    closable
    footer={null}
    onOk={ok}
    okText="Yes"
    cancelText="No"
    onCancel={close}
  >
    {children}
  </StyledScheduleModal>
)

export default ScheduleModal
