import React from 'react'
import styled from 'styled-components'

interface ImgNameDateProps {
  authName: string
  date?: string
  enableDash: boolean
  isColumn: boolean
  bg_color?: string
  authImgCont_wi_hei: string
  imageSrc?:string;
  altImage?: string;
  is_image: boolean
  is_mt?:boolean
}

const ImgNameDateCont = styled.div<Partial<ImgNameDateProps>>`
  & {
    display: flex;
    align-items: center;
  }

  & .authImgCont {
    background-color: ${({ bg_color }) => bg_color};
    width: ${({ authImgCont_wi_hei }) => authImgCont_wi_hei};
    height: ${({ authImgCont_wi_hei }) => authImgCont_wi_hei};
    border-radius: 50%;
    margin-right: 0.75rem;
    display: flex;
    position: relative;
    overflow: hidden;
  }

  & h2 {
    color: rgba(55, 65, 81);
    font-weight: 800;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  & p {
    color: rgba(107, 114, 128);
    font-size: 0.75rem;
    line-height: 1rem;
    margin-top: 0.25rem;
  }

  & .nameDateCont {
    display: flex;
    gap: ${({ isColumn }) => {
      return isColumn ? '0' : '10px'
    }};
    flex-direction: ${({ isColumn }) => {
      return isColumn ? 'column' : 'row'
    }};
  }
`

const ImgNameDate = ({
  authName,
  date,
  enableDash,
  isColumn,
  bg_color,
  authImgCont_wi_hei,
  imageSrc,
  altImage,
  is_image,
}: ImgNameDateProps) => {
  return (
    <ImgNameDateCont
      isColumn={isColumn}
      bg_color={bg_color}
      authImgCont_wi_hei={authImgCont_wi_hei}
    >
      <div className="authImgCont">
        {
          is_image && <img
            src={imageSrc} 
            alt= {altImage}
            className="absolute inset-0 w-full h-full"
          />
        }
      </div>
      <div className="nameDateCont">
        <h2>{authName}</h2>
        {enableDash && <p>-</p>}
        <p>{date}</p>
      </div>
    </ImgNameDateCont>
  )
}

export default ImgNameDate
