'use client'

import { useGlobalContext } from '@/Context/store'
import React, { useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import ScheduleModal from './Modal/ScheduleModal/ScheduleModal'
import ScheduleForm from './Modal/ScheduleModal/ScheduleForm'
import { ConfigProvider } from 'antd'

export const checkPath = (path: string | null) => {
  if (!path) return false
  return true
}

interface HandleScheduleProps {
  status: 'view' | 'edit' | 'create'
}

const HandleSchedule: React.FC<HandleScheduleProps> = ({ status }) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { ui, setUI, user } = useGlobalContext()

  const handleClose = () => {
    setUI((prev) => {
      return {
        ...prev,
        scheduleModal: {
          ...prev.scheduleModal,
          visibility: false,
        },
      }
    })
  }

  const handleOk = () => {}
  return (
    <ScheduleModal
      ok={handleOk}
      isOpen={
        ui.scheduleModal?.visibility ? ui.scheduleModal?.visibility : false
      }
      close={handleClose}
    >
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ff7517',
          },
        }}
      >
        <ScheduleForm status={status} />
      </ConfigProvider>
    </ScheduleModal>
  )
}

export default HandleSchedule
