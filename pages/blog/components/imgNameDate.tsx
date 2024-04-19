import React from 'react'
import styled from '@emotion/styled'

interface StyledDateProps {
  isColumn: boolean
  bg_color?: string
  authImgCont_wi_hei: string
}
interface ImgNameDateProps {
  authName: string
  date?: string
  enableDash: boolean
}

const ImgNameDateCont = styled.div<StyledDateProps>`
  & {
    display: flex;
    align-items: center;
    margin-top: 18.75px;
  }

  & .authImgCont {
    background-color: ${({ bg_color }) => bg_color};
    width: ${({ authImgCont_wi_hei }) => authImgCont_wi_hei};
    height: ${({ authImgCont_wi_hei }) => authImgCont_wi_hei};
    border-radius: 50%;
    margin-right: 0.75rem;
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
}: ImgNameDateProps & StyledDateProps) => {
  return (
    <ImgNameDateCont
      isColumn={isColumn}
      bg_color={bg_color}
      authImgCont_wi_hei={authImgCont_wi_hei}
    >
      <div className="authImgCont">
        {/* <img src={imageSrc} alt={altImage} /> */}
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
