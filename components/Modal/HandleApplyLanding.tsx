'use client'

import { useGlobalContext } from '@/Context/store'
import React, { useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import ApplyLandingModal from './ApplyLandingModal/ApplyLandingModal'
import Stepper, { StepperChildProps } from '../Stepper/Stepper'
import ApplyEmailForm from './ApplyLandingModal/ApplyEmailForm'
import ApplyPasswordForm from './ApplyLandingModal/ApplyPasswordForm'
import CreateUserForm from './ApplyLandingModal/CreateUserForm'
import ApplyModalForm from './ApplyModal/ApplyModalForm'
import ApplyModalFormPreview from './ApplyModal/ApplyModalFormPreview'

export const checkPath = (path: string | null) => {
  if (!path) return false
  return true
}

const HandleApplyLanding = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { ui, setUI, user } = useGlobalContext()
  const [SW, setSW] = useState<StepperChildProps | null>(null)
  const [SW2, setSW2] = useState<StepperChildProps | null>(null)
  const [isValid, setIsValid] = useState(false)

  const handleClose = () => {
    setUI((prev) => {
      return {
        ...prev,
        applyLandingModal: {
          ...prev.applyLandingModal,
          visibility: false,
        },
      }
    })
  }
  const handleShowOTP = () => {
    setUI((prev) => {
      return {
        ...prev,
        OTPModal: {
          ...prev.OTPModal,
          visibility: true,
        },
      }
    })
  }

  const handleOk = () => {}
  return (
    <ApplyLandingModal
      ok={handleOk}
      isOpen={
        ui.applyLandingModal?.visibility
          ? ui.applyLandingModal?.visibility
          : false
      }
      close={handleClose}
    >
      <Stepper init={setSW} className="overflow-hidden mx-10">
        <ApplyEmailForm SW={SW} />

        {user.fname ? (
          <ApplyPasswordForm SW={SW} />
        ) : (
          <CreateUserForm SW={SW} />
        )}
        <ApplyModalForm SW={SW} />
        <ApplyModalFormPreview SW={SW} />
      </Stepper>
    </ApplyLandingModal>
  )
}

export default HandleApplyLanding
