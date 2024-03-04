import styled from '@emotion/styled'
import { Modal } from 'antd'

export const StyledApplyLandingModal = styled(Modal)`
  overflow: hidden;
  border-radius: 10px;
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
      padding: 8px;
      margin-left: -40px;
      margin-top: 8px;
    }
  }
`
