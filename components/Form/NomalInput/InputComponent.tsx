'use client'
import React, { InputHTMLAttributes, useEffect, useState } from 'react'
import { MdOutlineError } from 'react-icons/md'
import { HiCheckCircle } from 'react-icons/hi'
import { ImSpinner10 } from 'react-icons/im'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'
import { regularFont } from '@/assets/fonts/fonts'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  showIcon?: boolean
  valid?: boolean
  text?: string
  border?: boolean
  focus?: boolean
  loading?: boolean
  password?: boolean
}

const InputComponent: React.FC<InputProps> = ({
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
  const [pass, setPass] = useState(rest.type)

  useEffect(() => {
    if (password) {
      setPass(rest.type)
    }
  }, [rest.type, password])

  return (
    <div className=" flex flex-col w-full">
      <div
        className={`relative flex rounded-[10px] text-black_200 h-[2.9375rem] w-full border-2 focus-within:border-2 focus-within:border-orange ${
          border && 'border-[#B3261E]'
        }`}
      >
        <AnimatePresence mode="wait">
          {!focus && rest.value && (
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
          )}
        </AnimatePresence>
        <input
          name={name}
          {...rest}
          type={pass}
          autoComplete="false"
          placeholder={focus ? '' : rest.placeholder}
          className="input-cont md:placeholder:text-[14px] placeholder:text-[12px] relative text-[14px] z-30 bg-transparent rounded-[0.625rem] focus:-orange text-black_200 pl-[12px] w-full border-none outline-none focus:ring-0 transition-transform duration-300 ease-in-out group-focus:translate-y-[-6px] "
        />
        {showIcon && valid && !loading && (
          <span className="text-[18px] opacity-50 absolute right-4 top-1/2 transition-transform duration-300 ease-in-out group-focus:-translate-y-6 transform translate-y-[-50%] flex items-center">
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
        {password && (
          <span
            className={`absolute right-4 top-1/2 -translate-y-1/2 flex items-center text-[16px] cursor-pointer z-30 ${
              showIcon && valid && '-translate-x-7'
            }`}
            onClick={() =>
              pass === 'text' ? setPass('password') : setPass('text')
            }
          >
            {pass === 'password' ? <FiEyeOff /> : <FiEye />}
          </span>
        )}
      </div>
    </div>
  )
}

export default InputComponent
