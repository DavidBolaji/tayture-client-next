import styled from '@emotion/styled'
import { Modal } from 'antd'

export const StyledModal = styled(Modal)`
  background: #fff;
  border-radius: 15px !important;
  padding: 0px;
  overflow: hidden;

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

  .avatar-uploader {
    background-color: #e9e8e8;
    width: 150px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;

    margin-bottom: 16px;
  }
`
