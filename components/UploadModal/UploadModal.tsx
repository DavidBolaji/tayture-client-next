import React, { ReactNode } from 'react'
import { StyledUploadModal } from './UploadModal.style'

const UploadModal: React.FC<{
  isOpen: boolean
  close: () => void
  ok: () => void
  children: ReactNode
}> = ({ isOpen, close, ok, children }) => (
  <StyledUploadModal
    open={isOpen}
    closable
    footer={null}
    onOk={ok}
    okText="Yes"
    cancelText="No"
    onCancel={close}
  >
    {children}
  </StyledUploadModal>
)

export default UploadModal
