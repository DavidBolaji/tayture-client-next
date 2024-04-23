'use client'

import { useGlobalContext } from '@/Context/store'
import React, { useState } from 'react'

import ApplyModal from './ApplyModal/ApplyModal'
import ApplyModalForm from './ApplyModal/ApplyModalForm'
import ApplyModalFormPreview from './ApplyModal/ApplyModalFormPreview'
import Stepper, { StepperChildProps } from '../Stepper/Stepper'

export const checkPath = (path: string | null) => {
  if (!path) return false
  return true
}

const HandleApply = () => {
  const { ui, setUI } = useGlobalContext()
  const [SW, setSW] = useState<StepperChildProps | null>(null)
  const handleClose = () => {
    setUI((prev) => {
      return {
        ...prev,
        applyModal: {
          ...prev.applyModal,
          visibility: false,
        },
      }
    })
  }

  const handleOk = () => {}
  return (
    <ApplyModal
      ok={handleOk}
      isOpen={ui.applyModal?.visibility ? ui.applyModal?.visibility : false}
      close={handleClose}
    >
      <Stepper init={setSW} className="overflow-hidden">
        <ApplyModalForm SW={SW} />
        <ApplyModalFormPreview SW={SW} />
      </Stepper>
    </ApplyModal>
  )
}

export default HandleApply
