import React from 'react'

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className="
    max-w-[1920px]
    mx-auto
    xl:px-20
    md:px-10
    px-5
    "
    >
      {children}
    </div>
  )
}

export default Wrapper
