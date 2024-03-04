import styled from '@emotion/styled'
import { Modal } from 'antd'

export const StyledModal = styled(Modal)`
  max-width: 100% !important;
  width: 637px !important;
  border-radius: 10px;
  height: 436px;
  background-color: #fff;

  .ant-modal-header {
    padding: 0px;
  }

  .ant-modal-content {
    box-shadow: none;
    height: 436px;
    & > * {
      padding-bottom: 40px;
    }
  }
  && {
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
  background-color: #f6f7f8;
`
