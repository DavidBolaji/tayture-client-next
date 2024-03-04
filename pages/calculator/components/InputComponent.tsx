import React, { InputHTMLAttributes } from 'react'

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode
  id?: string
}

function InputComponent({ label, id, ...rest }: IInput) {
  return (
    <div className="mb-[16px] flex flex-col w-full">
      {label ? (
        <label className="dsm:mb-[0.4rem] mb-[3px] dsm:text-[1rem] text-[14px] font-[500]">
          {label}{' '}
        </label>
      ) : null}
      <input
        id={id}
        // million-ignore
        {...rest}
        className="rounded-[0.625rem] text-black_200 pl-[10px] h-[2.9375rem] w-full border border-[rgba(35,35,35, 0.2)] outline-none focus:ring-0"
      />
    </div>
  )
}

export default InputComponent
