import styled from '@emotion/styled'
import { Modal } from 'antd'
import React, { ReactNode } from 'react'
import { FaDownload } from 'react-icons/fa'

export const StyledApplyModal = styled(Modal)`
  .ant-modal-content {
    position: relative;
    padding: 20px 0px 0px 0px !important;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: thin; /* Firefox */
    scrollbar-color: #d9d9d9 white;
  }

  .ant-modal-body {
    padding: 0px 24px !important;
    max-height: 550px !important;
    overflow-y: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: thin; /* Firefox */
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
@media (max-width: 573px){
  .ant-modal {
    width: 720px !important;
  }
}
`
const HandleCVModal: React.FC<{
  isOpen: boolean
  close: () => void
  ok: () => void
  children: ReactNode
}> = ({ isOpen, close, ok, children }) => (
  <StyledApplyModal className='cv_modal' open={isOpen} closable footer={null} onCancel={close}>
    {children}
    <div className="absolute -top-10 w-full left-0 flex ">
      <button
        onClick={ok}
        className="bg-orange flex gap-2 text-white rounded-md items-center p-2"
      >
        <FaDownload />
        Download
      </button>
    </div>
  </StyledApplyModal>
)

export default HandleCVModal
