import React, { useState } from 'react'
import styled from 'styled-components'
import { HiArrowLongLeft } from 'react-icons/hi2'
import { HiArrowLongRight } from 'react-icons/hi2'

interface BackNextProps {
  isLeft?: Boolean
}

const IconCont = styled.div<BackNextProps>`
  & {
    color: rgb(100, 166, 139);
    display: flex;
    align-items: center;
  }

  & button {
    font-size: 1.15rem;
    line-height: 1.75rem;
    border-color: rgb(226, 232, 240);
    border-radius: 9999px;
    width: 2.75rem;
    height: 2.75rem;
    display: flex;
    margin-right: 0.5rem;
    align-items: center;
    justify-content: center;
    transition-duration: 0.2s;
    transition-property: border;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }


  & .borderActive {
    border-width: 2px;
  }
`
const BackNext = ({ isLeft }: BackNextProps) => {

  const [activate, updateActivate] = useState(true)

  return (
    <IconCont>
      <button className={activate?"borderActive":undefined} onMouseOver={() => updateActivate(true)}>
        <HiArrowLongLeft />
      </button>
      <button className ={activate?undefined:"borderActive"}  onMouseOver={() => updateActivate(false)}>
        <HiArrowLongRight />
      </button>
    </IconCont>
  )
}

export default BackNext
