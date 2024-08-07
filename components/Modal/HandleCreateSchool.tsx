'use client'

import { useGlobalContext } from '@/Context/store'
import React, { useState } from 'react'

import Stepper, { StepperChildProps } from '../Stepper/Stepper'
import PostLandingModal from '../PostLandingModal/PostLandingModal'
import PostSchoolCreateForm from '../PostLandingModal/PostSchoolCreateForm'
import PostSchoolAdminForm from '../PostLandingModal/PostSchoolAdminForm'


export const checkPath = (path: string | null) => {
  if (!path) return false
  return true
}

const HandleCreateSchool = () => {
  const { ui, setUI } = useGlobalContext()
  const [SW, setSW] = useState<StepperChildProps | null>(null)

  const handleClose = () => {
    setUI((prev) => {
      return {
        ...prev,
        createSchoolModal: {
          ...prev.createSchoolModal,
          visibility: false,
        },
      }
    })
  }

  const handleOk = () => {}
  return (
    <PostLandingModal
      ok={handleOk}
      isOpen={
        ui.createSchoolModal?.visibility
          ? ui.createSchoolModal?.visibility
          : false
      }
      close={handleClose}
    >
      <Stepper init={setSW} className="overflow-hidden w-full">
        <PostSchoolCreateForm SW={SW} move={false} />
        <PostSchoolAdminForm SW={SW} move={false}  />
      </Stepper>
    </PostLandingModal>
  )
}

export default HandleCreateSchool