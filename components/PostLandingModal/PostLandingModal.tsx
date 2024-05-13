import React, { ReactNode } from 'react'
import { StyledPostLandingModal } from './PostLandingModal.style'


const PostLandingModal: React.FC<{
  isOpen: boolean
  close: () => void
  ok: () => void
  children: ReactNode,
  height?: string
}> = ({ isOpen, close, ok, children, height }) => (
  <StyledPostLandingModal
    open={isOpen}
    closable
    footer={null}
    onOk={ok}
    okText="Yes"
    cancelText="No"
    onCancel={close}
    height={height}
  >
    {children}
  </StyledPostLandingModal>
)

export default PostLandingModal
