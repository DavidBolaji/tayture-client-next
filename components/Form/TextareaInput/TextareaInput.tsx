'use client'
import React, { TextareaHTMLAttributes } from 'react'
import { MdOutlineError } from 'react-icons/md'
import { HiCheckCircle } from 'react-icons/hi'
import { ImSpinner10 } from 'react-icons/im'
import { AnimatePresence, motion } from 'framer-motion'
import { regularFont } from '@/assets/fonts/fonts'

export type ITextarea = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string
  showIcon?: boolean
  valid?: boolean
  text?: string
  border?: boolean
  focus?: boolean
  loading?: boolean
  password?: boolean
}

const TextareaInput: React.FC<ITextarea> = ({
  showIcon,
  valid,
  text,
  border,
  focus,
  loading,
  name,
  password,
  ...rest
}) => {
  return (
    <div className=" flex flex-col w-full">
      <div
        className={`relative flex rounded-[10px] text-black_200 w-full border-2 focus-within:border-2  focus-within:border-orange ${
          border && 'border-[#B3261E]'
        }`}
      >
        <AnimatePresence mode="wait">
            <motion.label
              key="label-animation"
              initial={{
                y: 11,
              }}
              animate={{
                y: -27,
              }}
              exit={{
                y: 11,
              }}
              className={`-translate-y-7 absolute text-[14px] w-full font-[600] flex justify-start ml-0.5 h-3 ${
                regularFont.className
              } ${focus && ''}`}
            >
              {text}
            </motion.label>
        </AnimatePresence>
        <div className="relative w-full">
          <textarea
            name={name}
            {...rest}
            autoComplete="false"
            placeholder={focus ? '' : rest.placeholder}
            className="input-cont md:placeholder:text-[14px] placeholder:text-[12px] relative text-[14px] z-30 bg-transparent rounded-[0.625rem] focus:-orange text-black_200 px-[12px] w-full border-none outline-none focus:ring-0 transition-transform duration-300 ease-in-out group-focus:translate-y-[-6px] pt-2"
          />
          {rest.maxLength && (
            <div className="w-full flex justify-end absolute -bottom-[43px] mb-5">
              <span>
                {String(rest?.value)?.trim().length ?? 0}/{rest.maxLength}
              </span>
            </div>
          )}
        </div>
        {showIcon && valid && !loading && (
          <span className="text-[18px] opacity-50 absolute right-4 bottom-4 transition-transform duration-300 ease-in-out group-focus:-translate-y-6 transform flex items-center">
            <HiCheckCircle color="#34C759" />
          </span>
        )}
        {showIcon && !valid && !loading && (
          <span className=" text-[18px]  absolute right-4 top-1/2 transition-transform duration-300 ease-in-out group-focus:-translate-y-6 transform translate-y-[-50%] flex items-center">
            <MdOutlineError color="#B3261E" />
          </span>
        )}
        {loading && (
          <span className=" text-[18px]  absolute right-4 top-1/2 transition-transform duration-300 ease-in-out group-focus:-translate-y-6 transform translate-y-[-50%] flex items-center">
            <ImSpinner10 color="#B3261E" className="animate-spin" />
          </span>
        )}
      </div>
    </div>
  )
}

export default TextareaInput
