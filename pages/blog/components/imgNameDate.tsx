import React from 'react'
import styled from 'styled-components'

interface imgNameDateProps {
  image?:string;
  altImage: string;
  authName: string;
  date?: string;
  enableDash: boolean;
  isColumn : boolean
}

const ImgNameDateCont = styled.div<imgNameDateProps>`
 &{
    display:flex;
    align-items: center;
    margin-top: 18.75px;
 }

 & .authImgCont{
    background-color: black;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    margin-right: 0.75rem;
    
 }

 & h2{
    color: rgba(55,65,81);
    font-weight:500;
    font-size:0.875rem;
    line-height: 1.25rem;
    
 }

 & p{
    color: rgba(107,114,128);
    font-size:0.75rem;
    line-height: 1rem;
    margin-top:0.25rem;
    
 }

 & .nameDateCont{
    display : flex;
    gap:${({isColumn}) =>{
        return( isColumn?'0':'10px')
     }};
    flex-direction:${({isColumn}) =>{
       return( isColumn?'column':'row')
    }};
 }
`

const ImgNameDate = ({image, authName,altImage, date, enableDash, isColumn}: imgNameDateProps) => {
  return (
    <ImgNameDateCont isColumn = {isColumn} >
      <div className='authImgCont'>
        {/* <img src={image} alt={altImage} /> */}
      </div>
      <div className='nameDateCont'>
        <h2>{authName}</h2>
        {enableDash && <p>-</p>}
        <p>{date}</p>
      </div>
    </ImgNameDateCont>
  )
}

export default ImgNameDate
