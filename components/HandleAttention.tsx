'use client'

import { useGlobalContext } from '@/Context/store'
import React from 'react'

import AttentionModal from './AttentionModal/AttentionModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IUser } from '@/pages/api/users/types'
import { updateUser } from '@/lib/api/user'
import useGetState from '@/hooks/useGetState'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'

export const checkPath = (path: string | null) => {
  if (!path) return false
  return true
}

const HandleAttention = () => {
  const { ui, setUI, setMessage, setUser } = useGlobalContext()
  const { user }: { user: IUser | null } = useGetState()
  const queryClient = useQueryClient()
  const router = useRouter()
  const handleClose = () => {
    setUI((prev) => {
      return {
        ...prev,
        attentionModal: {
          ...prev.attentionModal,
          visibility: false,
        },
      }
    })
  }
  const { mutate } = useMutation({
    mutationFn: async () => {
      /**check if path exist */
      const pathExist = checkPath(user!.path)
      if (pathExist) {
        /**Check if path includes school admin do nothing */
        if (
          (
            JSON.parse(user!.path?.replace("'", '')!) as unknown as string[]
          ).includes('school admin')
        ) {
          return await updateUser(
            JSON.parse(user!.path?.replace("'", '')!) as unknown as string[],
          )
        }
        /**path does not have admin but has other path add school admin */
        return await updateUser(
          (
            JSON.parse(user!.path?.replace("'", '')!) as unknown as string[]
          ).concat('school admin'),
        )
      } else {
        /**path does not contain any path add school admin */
        return await updateUser(['school admin'])
      }
    },
    onSuccess: (res) => {
      const user = (res as unknown as AxiosResponse).data.user
      setUser(user)
      setMessage(() => 'Update successfull')

      localStorage.setItem('user', JSON.stringify(user))
      queryClient.setQueryData(['user'], user)
      handleClose()
    },
    onError: (err) => {
      setMessage(() => (err as Error).message)
    },
    mutationKey: ['users'],
  })

  const handleOk = () => mutate()
  return (
    <AttentionModal
      ok={handleOk}
      isOpen={
        ui.attentionModal?.visibility ? ui.attentionModal?.visibility : false
      }
      close={handleClose}
    />
  )
}

export default HandleAttention
