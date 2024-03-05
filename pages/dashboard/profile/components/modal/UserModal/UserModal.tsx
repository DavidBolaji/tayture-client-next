'use client'
import React from 'react'
import { StyledModal } from './UserModal.style'
import { useGlobalContext } from '@/Context/store'
import { UserCardProps } from '../../card/UserCard'
import UserForm from './UserForm'
import UserImage from './UserImage'

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
