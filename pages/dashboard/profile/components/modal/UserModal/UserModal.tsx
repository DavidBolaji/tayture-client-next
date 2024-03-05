'use client'
import React from 'react'
import { useGlobalContext } from '@/Context/store'
import { UserCardProps } from '../../card/UserCard'
import UserForm from './UserForm'
import UserImage from './UserImage'
import { Modal } from 'antd'
import styled from '@emotion/styled'

const StyledModal = styled(Modal)`
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


const UserModal: React.FC<UserCardProps> = ({
  fname,
  lname,
  summary,
  picture,
  available,
}) => {
  const { setUI, ui } = useGlobalContext()

  const handleClose = () => {
    setUI((prev) => {
      return {
        ...prev,
        userProfileModal: {
          ...prev.userProfileModal,
          visibility: false,
        },
      }
    })
  }

  return (
    <StyledModal
      open={ui?.userProfileModal?.visibility}
      closable
      footer={null}
      onCancel={handleClose}
    >
      <div className="w-full h-full py-10">
        <div className="w-full flex items-center justify-center mb-[120px]">
          <UserImage picture={picture} />
        </div>
        <UserForm {...{ fname, lname, summary, picture, available }} />
      </div>
    </StyledModal>
  )
}

export default UserModal
