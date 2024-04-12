'use client'

import { useGlobalContext } from '@/Context/store'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
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
  const router = useRouter()
  const pathname = usePathname()
  const { ui, setUI, user } = useGlobalContext()
  const [SW, setSW] = useState<StepperChildProps | null>(null)

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

  useEffect(() => {
    if(pathname === '/find_job') {
      if(SW) {
        SW.setStep!(1)
      }
    }
  }, [])

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
      <Stepper init={setSW} className="overflow-hidden">
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
