import React from 'react'
import { CiHeart } from 'react-icons/ci'
import styled from 'styled-components'
import { BsChatSquareDots } from 'react-icons/bs'

interface LikesComProps {
  likes_num: string
  comments_num: string
  bg_color: string
}

const LikesComCont = styled.div<LikesComProps>`
  & {
    // margin-top: 10px;
    display: flex;
    z-index: 1;
  }

  & div{
    display:flex;
    align-items: center;
    gap
}

& button, & a{
    transition-duration: .15s;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(.4,0,.2,1);
    color: rgba(55,65,81);
    line-height: 1;
    font-size: 1.25rem;
    padding-inline: 0.75rem;
    display:flex;
    align-items: center;
    background-color: ${({bg_color})=> bg_color};
    border-radius: 9999px;
    min-width: 68px;
    height: 2rem;
  }

  & button:hover, & button p:hover{
    color: rgb(225,29,72);
    background-color: rgb(255,241,242);
  }

  & a{
    font-size: 0.95rem;
    margin-left: 7.5px;
  }

  & a:hover{
    color: rgb(13, 148, 136);
    background-color: rgb(240, 253, 250);
  }

  & p {
     margin-left:0.45rem;
     font-size: 0.65rem;
  }
`

const LikesCom = ({ likes_num, comments_num, bg_color,}: LikesComProps) => {
  return (
    <LikesComCont bg_color ={bg_color}>
      <div className="likesCont">
        <button>
          <CiHeart />
          <p>{likes_num}</p>
        </button>
      </div>
      <div className="comCont">
        <a href="#">
          <BsChatSquareDots />
          <p>{comments_num}</p>
        </a>
      </div>
    </LikesComCont>
  )
}

export default LikesCom
