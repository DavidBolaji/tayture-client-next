import React, { ReactNode } from 'react'
import { StyledPostLandingModal } from './PostLandingModal.style'

const PostLandingModal: React.FC<{
  isOpen: boolean
  close: () => void
  ok: () => void
  children: ReactNode
}> = ({ isOpen, close, ok, children }) => (
  <StyledPostLandingModal
    open={isOpen}
    closable
    footer={null}
    onOk={ok}
    okText="Yes"
    cancelText="No"
    onCancel={close}
  >
    {children}
  </StyledPostLandingModal>
)

export default PostLandingModal
