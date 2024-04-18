'use client'

import { useGlobalContext } from '@/Context/store'
import React, { useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Stepper, { StepperChildProps } from '../Stepper/Stepper'
import PostLandingModal from '../PostLandingModal/PostLandingModal'
import PostEmailForm from '../PostLandingModal/PostEmailForm'
import PostPasswordForm from '../PostLandingModal/PostPasswordForm'
import CreatePostUserForm from '../PostLandingModal/CreatePostUserForm'
import PostSchoolCreateForm from '../PostLandingModal/PostSchoolCreateForm'
import PostSchoolAdminForm from '../PostLandingModal/PostSchoolAdminForm'
import JobOverviewForm from '../pagez/PostJobComponent/JobOverview/JobOverviewForm'
import JobPreviewForm from '../pagez/PostJobComponent/JobPreview/JobPreviewForm'

export const checkPath = (path: string | null) => {
  if (!path) return false
  return true
}

const HandlePostLanding = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { ui, setUI, user } = useGlobalContext()
  const [SW, setSW] = useState<StepperChildProps | null>(null)

  const handleClose = () => {
    setUI((prev) => {
      return {
        ...prev,
        postLandingModal: {
          ...prev.postLandingModal,
          visibility: false,
        },
      }
    })
  }



  const handleOk = () => {}
  return (
    <PostLandingModal
      height={"auto"}
      ok={handleOk}
      isOpen={
        ui.postLandingModal?.visibility
          ? ui.postLandingModal?.visibility
          : false
      }
      close={handleClose}
    >
      <Stepper init={setSW} className="overflow-hidden w-full">
        <PostEmailForm SW={SW} />

        {user.fname ? (
          <PostPasswordForm SW={SW} />
        ) : (
          <CreatePostUserForm SW={SW} />
        )}
        <PostSchoolCreateForm SW={SW} />
        <PostSchoolAdminForm SW={SW} />
        <div className='w-full'>
          <JobOverviewForm SW={SW} />
        </div>
        <div className='w-full' id="jobPreview">
          <JobPreviewForm SW={SW} />
        </div>
      </Stepper>
    </PostLandingModal>
  )
}

export default HandlePostLanding
