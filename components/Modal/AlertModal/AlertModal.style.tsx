import styled from '@emotion/styled'
import { Modal } from 'antd'

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 0;
  }

  .ant-modal-header {
    display: none;
  }

  .ant-modal-body {
    padding: 24px;
  }

  .ant-modal-close {
    top: 16px;
    right: 16px;
    color: #666;
    font-size: 16px;
    width: 24px;
    height: 24px;
    line-height: 24px;
    
    &:hover {
      color: #333;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
  }

  .ant-modal-close-x {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`
