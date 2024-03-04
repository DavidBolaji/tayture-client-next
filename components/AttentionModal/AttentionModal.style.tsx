import styled from '@emotion/styled'
import { Modal } from 'antd'

export const StyledAttentionModal = styled(Modal)`
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
  }
`
