import React from 'react'

const TwoColumn: React.FC<{
  white?: boolean
  left: React.ReactNode
  right: React.ReactNode
}> = ({ white = true, left, right }) => {
  return (
    <div
      className={`grid lg:grid-cols-12 grid-cols-6 py-10 lg:py-20 md:py-20 ${
        white ? 'bg-white' : 'bg-ash_200'
      }`}
    >
      <div className={`col-span-6 ${!white ? 'order-1 lg:order-first' : ''}`}>
        <div
          className=" xl:pl-20
            lg:pl-10
            pl-5"
        >
          {left}
        </div>
      </div>
      <div className={`col-span-6 `}>
        <div
          className=" xl:pr-20
             lg:pr-10
             pr-5"
        >
          {right}
        </div>
      </div>
    </div>
  )
}

export default TwoColumn
