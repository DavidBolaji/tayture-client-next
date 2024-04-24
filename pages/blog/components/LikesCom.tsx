import React, { useState } from 'react'
import { CiHeart } from 'react-icons/ci'
import styled from 'styled-components'
import { BsChatSquareDots } from 'react-icons/bs'
import { IoShareSocialOutline } from 'react-icons/io5'
import { FaFacebook, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FaLink, FaXTwitter } from 'react-icons/fa6'

interface LikesComProps {
  likes_num: string
  comments_num: string
  bg_color: string
  is_share?: boolean
}

const LikesComCont = styled.div<LikesComProps>`
  & {
    display: flex;
    z-index: 1;
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
    color: rgb(225, 29, 72);
    background-color: rgb(255, 241, 242);
  }

  & .comBtn {
    font-size: 0.95rem;
    margin-left: 7.5px;
  }

  & .comBtn:hover {
    color: rgb(13, 148, 136);
    background-color: rgb(240, 253, 250);
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
  is_sharebtn_clicked,
}: LikesComProps) => {

  const [sharebtnClicked, updateSharebtnClicked] = useState(false)

  function handleShareBtnClicked (){
    updateSharebtnClicked(!sharebtnClicked)
  }
  return (
    <LikesComCont bg_color={bg_color}>
      <div className="cont likesCont">
        <button className="likeBtn text-[rgba(55,65,81)]">
          <CiHeart />
          <p>{likes_num}</p>
        </button>
      </div>
      <div className="cont comCont">
        <a href="#" className="comBtn text-[rgba(55,65,81)]">
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
          {sharebtnClicked && <div className="absolute origin-top-right right-0 w-56 mt-2 bg-white rounded-2xl divide-y divide-neutral-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30 transform opacity-100 scale-100">
            <div className="px-1 py-3 text-xs text-neutral-6000 w-full">
              <div className="w-full">
                <button className="flex items-center rounded-xl w-full px-3 py-2 hover:bg-neutral-100 hover:text-neutral-900 truncate focus:outline-none">
                  <FaLink className="text-[1rem]" />
                  <span className="ml-3">Copy Link</span>
                </button>
              </div>
              <div className="w-full">
                <button className="flex items-center rounded-xl w-full px-3 py-2 hover:bg-neutral-100 hover:text-neutral-900 truncate focus:outline-none">
                  <FaFacebook className="text-[1rem]" />
                  <span className="ml-3">Facebook</span>
                </button>
              </div>
              <div className="w-full">
                <button className="flex items-center rounded-xl w-full px-3 py-2 hover:bg-neutral-100 hover:text-neutral-900 truncate focus:outline-none">
                  <FaInstagram className="text-[1rem]" />
                  <span className="ml-3">Instagram</span>
                </button>
              </div>
              <div className="w-full">
                <button className="flex items-center rounded-xl w-full px-3 py-2 hover:bg-neutral-100 hover:text-neutral-900 truncate focus:outline-none">
                  <FaXTwitter className="text-[1rem]" />
                  <span className="ml-3">X (Twitter)</span>
                </button>
              </div>
              <div className="w-full">
                <button className="flex items-center rounded-xl w-full px-3 py-2 hover:bg-neutral-100 hover:text-neutral-900 truncate focus:outline-none">
                  <FaLinkedinIn className="text-[1rem]" />
                  <span className="ml-3">LinkedIn</span>
                </button>
              </div>
            </div>
          </div>}
        </div>
      )}
    </LikesComCont>
  )
}

export default LikesCom
