/* eslint-disable react/jsx-props-no-spreading */
import React, { ButtonHTMLAttributes, RefObject } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'

import Spinner from '../Spinner/Spinner'
import { regularFont } from '@/assets/fonts/fonts'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | React.ReactNode
  render: 'dark' | 'light'
  bold: boolean
  hover?: boolean
  full?: boolean
  transparent?: boolean
  rounded?: boolean
  sm?: boolean
  verify?: boolean
  gray?: boolean
  ref?: RefObject<HTMLButtonElement>;
}

function Button({
  text,
  bold,
  render,
  hover,
  full,
  transparent,
  rounded,
  sm,
  verify,
  gray,
  ref,
  ...rest
}: IButton) {
  const commonStyles = `disabled:scale-100 disabled:cursor-not-allowed px-4 py-2  rounded-[8px] transition-all  ${
    full ? 'w-full' : ''
  } ${regularFont.className}`

  const light = `bg-orange text-black_400 border-orange ${commonStyles} ${
    hover && 'hover:bg-black_200 hover:text-white '
  } disabled:bg-[#FFA466]`

  const dark = `bg-black_200 text-white border-black_200 ${commonStyles} ${
    hover && 'hover:bg-orange hover:text-black_400 '
  } disabled:bg-black`

  return (
    <button
      type="button"
      className={`${render === 'light' ? light : dark} duration-500 ease-in ${
        transparent ? 'bg-transparent border-2 border-[#232323]' : ''
      } ${verify ? 'bg-[#F2B8B5] text-[#000000]' : ''} ${
        gray ? 'bg-[#e9e8e8] text-[#000000]' : ''
      } ${rounded ? 'rounded-full' : ''} ${
        sm
          ? 'scale-[0.8] -translate-x-3 hover:scale-[0.83]'
          : 'hover:scale-[1.04]'
      } `}
      ref={ref}
      {...rest}
    >
      <span
        className={`${!bold ? 'font-[500]' : 'font-[700]'} ${
          sm ? 'text-[12px] whitespace-nowrap' : ''
        }`}
      >
        {text}
      </span>
    </button>
  )
}

export default Button

export function CheckBtn({
  loading,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}) {
  return (
    <button
      // million-ignore
      {...rest}
      className="flex items-center gap-[8px] py-[4px] px-[16px] rounded-[8px] bg-black border-black hover:scale-[1.05] transition-transform ease-in duration-300"
    >
      <span className="text-white">{loading ? <Spinner /> : 'Yes'}</span>
      <span>
        <FaCheck color="white" />
      </span>
    </button>
  )
}
export function CloseBtn({ ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className="flex items-center gap-[8px] py-[4px] px-[16px] rounded-[8px] border border-black hover:scale-[1.05] transition-transform ease-in duration-300"
    >
      <span>No</span>
      <span>
        <FaTimes />
      </span>
    </button>
  )
}
