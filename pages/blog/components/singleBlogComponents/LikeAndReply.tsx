'use client'
import { Axios } from '@/request/request'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import React, { useState } from 'react'
import { CiHeart } from 'react-icons/ci'
import { VscReply } from 'react-icons/vsc'
import { Modal } from 'antd'
import LoginForm from '@/pages/auth/LoginForm/LoginForm'
import { User } from '@prisma/client'
import { useRouter } from 'next/router'

interface LikeAndReplyProps {
  like_num: string | number
  showReply: () => void
  commentId: string
  update?: (like: number) => void
}

function LikeAndReply({ like_num, showReply, commentId, update }: LikeAndReplyProps) {
  const [modal, setModal] = useState(false)
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate } = useMutation({
    mutationFn: async () => {
      return await Axios.put(`/comment/me/like/${commentId}`)
    },
    onSuccess: (res: AxiosResponse) => {
      const more = +like_num + 1;
      const less = +like_num > 0 ? +like_num - 1 : +like_num
      if (res.data.message === 'Liked') {
        console.log('[ENTERED]')
        update && update(more)
        return
      }
      update && update(less)
    },
    onError: (error) => {
      console.log(error.message)
    },
  })

  const handleLike = () => {
    const user = queryClient.getQueryData(['user']) as User
    if (!user) {
      return setModal(true)
    }
    mutate()
  }

  return (
    <div className="flex items-center space-x-2 ">
      {/* like button */}
      <button
        onClick={handleLike}
        className="min-w-[68px] flex items-center rounded-full leading-none px-3 h-8 text-xs focus:outline-none text-neutral-700 bg-neutral-100 hover:bg-rose-50 hover:text-rose-600"
      >
        <CiHeart className="h-5 w-5 mr-1" />
        <span className="text-neutral-900 dark:text-neutral-200">
          {like_num}
        </span>
      </button>

      {/* Reply button */}
      <button
        type="button"
        onClick={showReply}
        className="flex items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-100 px-3 h-8 hover:bg-teal-50 hover:text-teal-600 focus:outline-none "
      >
        <VscReply className="h-[18px] w-[18px] mr-2" />
        <span className="text-xs leading-none text-neutral-900 dark:text-neutral-200">
          Reply
        </span>
      </button>
      <Modal
        open={modal}
        closable
        onCancel={() => setModal(false)}
        footer={null}
      >
        <h2 className="md:text-xl text-lg text-center font-bold">Login Form</h2>
        <p className="italic w-full text-center text-sm">
          Login to proceed with following action
        </p>
        <LoginForm redirect={false} close={() => setModal(false)} />
      </Modal>
    </div>
  )
}

export default LikeAndReply
