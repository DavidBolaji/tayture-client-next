import styled from '@emotion/styled'
import { Modal } from 'antd'
import React, { ReactNode } from 'react'


export const StyledApplyModal = styled(Modal)`
.ant-modal-content {
  padding: 20px 24px !important;
  width: 800px;
}
  && {
    > * .ant-btn-primary {
      background-color: #ff7517;
    }
    > * .ant-btn-default:hover {
      color: #ff7517;
      border: 1px solid #ff7517;
    }
    > * .ant-btn-primary:hover {
      color: #ff7517;
      background-color: transparent;
      border: 1px solid #ff7517;
    }
    > * .ant-modal-close-icon {
      background-color: #faf9f9;
      border-radius: 50px;
      font-size: 12px;
      border-color: #e9e8e8;
      border-width: 1px;
      padding: 5px;
      margin-left: -20px;
      margin-top: 3px;
    }
  }
`
const HandleCVModal: React.FC<{
  isOpen: boolean
  close: () => void
  ok: () => void
  children: ReactNode
}> = ({ isOpen, close, ok, children }) => (
  <StyledApplyModal
    open={isOpen}
    closable
    onOk={ok}
    okText="Yes"
    cancelText="No"
    onCancel={close}
  >
    {children}
  </StyledApplyModal>
)

export default HandleCVModal