import styled from '@emotion/styled'
import { Modal } from 'antd'

export const StyledModal = styled(Modal)`
  background-color: black;
  height: 56px;
  top: 90%;
  max-width: 100% !important;
  width: 850px !important;
  position: relative;

  .ant-modal-close {
    display: none;
  }

  .ant-modal-header {
    padding: 0px;
  }

  .ant-modal-content {
    box-shadow: none;
    padding: 0px;
  }
`
