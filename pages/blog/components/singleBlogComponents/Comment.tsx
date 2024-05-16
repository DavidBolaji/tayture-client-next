import React, { useState } from 'react'
import NameDate from './NameDate'
import SubMenuComment from './SubMenuComment'
import LikeAndReply from './LikeAndReply'
import { Comment as CommentSchema, User } from '@prisma/client'
import moment from 'moment'
import Button from '@/components/Button/Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import Spinner from '@/components/Spinner/Spinner'
import LoginForm from '@/pages/auth/LoginForm/LoginForm'
import { Modal } from 'antd'

type SubComments = (CommentSchema & { user: User } & { subcomments: any })[]

const Comment: React.FC<{
  user: User
  date: string
  text: string
  parentId: string
  subcomments: SubComments
}> = ({ user: { fname, lname }, date, text, parentId, subcomments }) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [replying, setReplying] = useState(false) // State to manage reply mode
  const [replyText, setReplyText] = useState('') // State to store reply text
  const [modal, setModal] = useState(false)

  const toggleReply = () => {
    setReplying(!replying)
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: Partial<CommentSchema>) => {
      return await Axios.post('/comment/create/me', { ...data })
    },
    onSuccess: (res: AxiosResponse) => {
      setReplying(!replying)
      setReplyText('')
      queryClient.invalidateQueries({
        queryKey: ['allComments', router.query.blogId],
      })
    },
  })

  const handleReply = () => {
    const user = queryClient.getQueryData(['user']) as User
    if(!user.id) {
      return setModal(true)
    }
    mutate({
      comment: replyText,
      blogId: router.query.blogId as string,
      parentId,
    })

    setReplyText('')
    setReplying(false)
  }

  return (
    <div className="flex my-8">
      <div className="flex-grow flex flex-col p-4 ml-2 text-sm border border-neutral-200 rounded-xl sm:ml-3 sm:text-base">
        {/* top name date and sub menu */}
        <div className="relative flex items-center ">
          <NameDate
            commentorName={`${fname} ${lname}`}
            commentDate={moment(date).format('MMMM DD YYYY')}
          />
          <SubMenuComment />
        </div>
        {/* paragraph */}
        <span className="block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
          {text}
        </span>
        {/* like and reply */}
        <LikeAndReply like_num={14} showReply={toggleReply} />

        {subcomments &&
          subcomments.map((subcomment) => (
            <Comment
              parentId={subcomment.id}
              date={subcomment.createdAt as any}
              text={subcomment.comment}
              user={subcomment.user}
              key={subcomment.id}
              subcomments={subcomment.subcomments}
            />
          ))}

        {replying && (
          <div className="mt-4">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Write your reply here..."
              rows={3}
              required
            />
            <div className="flex justify-end mt-2">
              <Button
                disabled={isPending}
                onClick={handleReply}
                text={isPending ? <Spinner /> : 'Reply'}
                render="light"
                bold={false}
              />
            </div>
          </div>
        )}
      </div>

      <Modal
          open={modal}
          closable
          onCancel={() => setModal(false)}
          footer={null}
        >
          <h2 className="md:text-xl text-lg text-center font-bold">
            Login Form
          </h2>
          <p className="italic w-full text-center text-sm">
            Login to proceed with following action
          </p>
          <LoginForm redirect={false} close={() => setModal(false)} />
        </Modal>
    </div>
  )
}

export default Comment
