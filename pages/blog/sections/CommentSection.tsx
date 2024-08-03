'use client'
import React, { useState } from 'react'
import Comment from '../components/singleBlogComponents/Comment'
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { Axios } from '@/request/request'
import { CommentLike, Comment as CommentSchema, User } from '@prisma/client'
import { AxiosResponse } from 'axios'
import { useGlobalContext } from '@/Context/store'
import Spinner from '@/components/Spinner/Spinner'
import { Modal } from 'antd'
import LoginForm from '@/pages/auth/LoginForm/LoginForm'

const CommentSection = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [modal, setModal] = useState(false)
  const { setMessage } = useGlobalContext()
  const [text, setText] = useState('')

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['allComments', router.query.blogId],
      queryFn: async ({ pageParam }) => {
        const req = await Axios.get(
          `/comment/${router.query.blogId}?page=${pageParam}&limit=${2}`,
        )
        return req.data as {
          comment: (CommentSchema & { user: User } & { commentLikes: CommentLike[] } & { subcomments: (CommentSchema & { user: User } & { subcomments: any[]})[]})[]
          total: number
          nextCursor: any
        }
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: typeof router.query.blogId !== 'undefined',
    })

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: Partial<CommentSchema>) => {
      return await Axios.post('/comment/create/me', { ...data })
    },
    onSuccess: (res: AxiosResponse) => {
      setText('')
      queryClient.invalidateQueries({
        queryKey: ['allComments', router.query.blogId],
      })
      setMessage(() => res.data.message)
      router.replace(router.asPath)
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const user = queryClient.getQueryData(['user']) as User
    if (!user?.id) {
      return setModal(true)
    }
    const formData = new FormData(e.currentTarget)
    const text = formData.get('comment') as string
    mutate({ comment: text, blogId: router.query.blogId as string })
  }


  return (
    <>
      <div className="scroll-mt-20 max-w-screen-md mx-auto pt-5" id="comment">
        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
          Responses ({data ? data?.pages[0]?.total : 0})
        </h3>
        <form onSubmit={handleSubmit} action="" className="CommentForm mt-5">
          <textarea
            className="block w-full text-sm rounded-xl active:ring-0 border-neutral-200 focus:ring-0 bg-white p-4"
            onChange={(e) => setText(e.target.value)}
            rows={4}
            value={text}
            name="comment"
            placeholder="Add to discussion"
            required
          ></textarea>
          <div className="my-8 space-x-3">
            <button
              disabled={isPending || text.trim().length < 1}
              className="flex-shrink-0 relative h-auto inline-flex items-center justify-center rounded-full transition-colors border-transparent bg-black hover:bg-orange  text-white text-sm sm:text-base font-semibold py-3 px-4 sm:py-3.5 sm:px-6  "
              type="submit"
            >
              {isPending ? <Spinner /> : 'Submit'}
            </button>
          </div>
        </form>
      </div>

      <div className="max-w-screen-md mx-auto">
        <div className="CommentsList my-8">
          {data &&
            data?.pages.map((page) =>
              page.comment.map((comment) => (
                <Comment
                  parentId={comment.id}
                  date={comment.createdAt as any}
                  text={comment.comment}
                  user={comment.user}
                  key={comment.id}
                  subcomments={(comment.subcomments) as any}
                  likes={comment.commentLikes.length}
                />
              )),
            )}
          {hasNextPage && (
            <button
              className="flex-shrink-0 relative h-auto inline-flex items-center justify-center rounded-full transition-colors border-transparent bg-black hover:bg-orange text-white text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 w-full"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage
                ? 'Loading...'
                : `See more (${
                    data
                      ? data?.pages[0]?.total - data?.pages[0]?.comment?.length
                      : 0
                  } comment(s))`}
            </button>
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
    </>
  )
}

export default CommentSection
