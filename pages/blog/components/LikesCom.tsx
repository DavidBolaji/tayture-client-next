"use client"
import React, { useState } from 'react'
import { CiHeart } from 'react-icons/ci'
import styled from 'styled-components'
import { BsChatSquareDots } from 'react-icons/bs'
import { IoShareSocialOutline } from 'react-icons/io5'
import { FaFacebook, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FaLink, FaXTwitter } from 'react-icons/fa6'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '@prisma/client'
import { Axios } from '@/request/request'
import { AxiosResponse } from 'axios'
import { Modal } from 'antd'
import LoginForm from '@/pages/auth/LoginForm/LoginForm'

interface LikesComProps {
  likes_num: number
  comments_num: string
  bg_color: string
  is_share?: boolean
  update?: (like: number) => void
  hover?: boolean
}

const LikesComCont = styled.div<Partial<LikesComProps>>`
  & {
    display: flex;
    z-index: 11;
  }

  & .cont {
    display: flex;
    align-items: center;
  }

  & button.likeBtn,
  & a {
    transition-duration: 0.15s;
    transition-property: color, background-color, border-color,
      text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    line-height: 1;
    font-size: 1.25rem;
    padding-inline: 0.75rem;
    display: flex;
    align-items: center;
    background-color: ${({ bg_color }) => bg_color};
    border-radius: 9999px;
    min-width: 68px;
    height: 2rem;
  }

  & button.likeBtn:hover,
  & button p:hover {
    color:  ${({ hover }) => hover ? "rgb(225, 29, 72)" : ""};
    background-color:  ${({ hover }) => hover ? "rgb(255, 241, 242)" : ""};
  }

  & .comBtn {
    font-size: 0.95rem;
    margin-left: 7.5px;
  }

  & .comBtn:hover {
    color:  ${({ hover }) => hover ? "rgb(13, 148, 136)" : ""};
    background-color: ${({ hover }) => hover ? "rgb(240, 253, 250)" : ""};
  }

  & p {
    margin-left: 0.45rem;
    font-size: 0.65rem;
  }
`

const LikesCom = ({
  likes_num,
  comments_num,
  bg_color,
  is_share,
  hover = true,
  update
}: LikesComProps) => {
  const router = useRouter()
  const [sharebtnClicked, updateSharebtnClicked] = useState(false)
 
  const [modal, setModal] = useState(false)
  const queryClient = useQueryClient()


  const { mutate } = useMutation({
    mutationFn: async (blogId: string) => {
      return await Axios.put(`/blog/me/like/${blogId}`)
    },
    onSuccess: (res: AxiosResponse) => {
      const more = +likes_num + 1;
      const less = +likes_num > 0 ? +likes_num - 1 : +likes_num
      if (res.data.message === 'Liked') {
        console.log('[ENTERED]')
        update && update(more)
        return
      }
      update && update(less)
    },
    onError: (error) => {
      console.log(error.message)
    }
  })

  const scrollToComment = () => {
    const comment = document.getElementById('comment')
    comment?.scrollIntoView({
      behavior: 'smooth',
    })
  }


  function handleShareBtnClicked() {
    updateSharebtnClicked(!sharebtnClicked)
  }

  const handleLike = () => {
    const user = queryClient.getQueryData(['user']) as User
    if (!user) {
      return setModal(true)
    }
    mutate(router.query.blogId as string)
  }
  return (
    <LikesComCont bg_color={bg_color} hover={hover}>
      <div className="cont likesCont">
        <button
          onClick={() => hover ? handleLike() : {}}
          type="button"
          className="likeBtn text-[rgba(55,65,81)]"
        >
          <CiHeart />
          <p>{likes_num}</p>
        </button>
      </div>
      <div className="cont comCont">
        <a
          onClick={scrollToComment}
          href="#"
          className="comBtn text-[rgba(55,65,81)]"
        >
          <BsChatSquareDots />
          <p>{comments_num}</p>
        </a>
      </div>
      {is_share && (
        <div className="replyCont relative inline-block text-left">
          <a
            href="#"
            className="flex-shrink-0 flex items-center justify-center focus:outline-none h-9 w-9 bg-black hover:bg-orange text-white rounded-full ml-[7.5px]"
            onClick={handleShareBtnClicked}
          >
            <IoShareSocialOutline />
            <p>Share</p>
          </a>

          {/* SubMenu */}
          {sharebtnClicked && (
            <div className="absolute origin-top-right right-0 w-56 mt-2 bg-white rounded-2xl divide-y divide-neutral-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30 transform opacity-100 scale-100">
              <div className="px-1 py-3 text-xs text-neutral-6000 w-full">
                <div className="w-full">
                  <button
                    type="button"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `${process.env.NEXT_PUBLIC_FRONTEND_API}blog/${router.query.blogId}`,
                      )
                    }
                    className="flex items-center rounded-xl w-full px-3 py-2 hover:bg-neutral-100 hover:text-neutral-900 truncate focus:outline-none"
                  >
                    <FaLink className="text-[1rem]" />
                    <span className="ml-3">Copy Link</span>
                  </button>
                </div>
                <div className="w-full">
                  <FacebookShareButton
                    url={`${process.env.NEXT_PUBLIC_FRONTEND_API}/blog/${router.query.blogId}`}
                    quote="Tayture offers me access to multiple opportunities as an educator to learn more"
                    hashtag="#tayture"
                  >
                    <button className="flex items-center rounded-xl w-full px-3 py-2 hover:bg-neutral-100 hover:text-neutral-900 truncate focus:outline-none">
                      <FaFacebook className="text-[1rem]" />
                      <span className="ml-3">Facebook</span>
                    </button>
                  </FacebookShareButton>
                </div>
                {/* <div className="w-full">
                  <button className="flex items-center rounded-xl w-full px-3 py-2 hover:bg-neutral-100 hover:text-neutral-900 truncate focus:outline-none">
                    <FaInstagram className="text-[1rem]" />
                    <span className="ml-3">Instagram</span>
                  </button>
                </div> */}
                <div className="w-full">
                  <TwitterShareButton
                    url={`${process.env.NEXT_PUBLIC_FRONTEND_API}/blog/${router.query.blogId}`}
                    title={`Tayture offers me access to multiple opportunities as an educator to learn more.
              `}
                  >
                    <button className="flex items-center rounded-xl w-full px-3 py-2 hover:bg-neutral-100 hover:text-neutral-900 truncate focus:outline-none">
                      <FaXTwitter className="text-[1rem]" />
                      <span className="ml-3">X (Twitter)</span>
                    </button>
                  </TwitterShareButton>
                </div>
                <div className="w-full">
                  <LinkedinShareButton
                    url={`${process.env.NEXT_PUBLIC_FRONTEND_API}/blog/${router.query.blogId}`}
                    title="Tayture offers me access to multiple opportunities as an educator to learn more"
                  >
                    <button
                      type="button"
                      className="flex items-center rounded-xl w-full px-3 py-2 hover:bg-neutral-100 hover:text-neutral-900 truncate focus:outline-none"
                    >
                      <FaLinkedinIn className="text-[1rem]" />
                      <span className="ml-3">LinkedIn</span>
                    </button>
                  </LinkedinShareButton>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <Modal
        open={modal}
        closable
        onCancel={() => setModal(false)}
        footer={null}
      >
        <h2 className='md:text-xl text-lg text-center font-bold'>Login Form</h2>
        <p className='italic w-full text-center text-sm'>Login to proceed with following action</p>
        <LoginForm redirect={false} close={() => setModal(false)} />
      </Modal>
    </LikesComCont>
  )
}

export default LikesCom
