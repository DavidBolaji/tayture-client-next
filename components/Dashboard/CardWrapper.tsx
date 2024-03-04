import React from 'react'
import { FaPen, FaPlus } from 'react-icons/fa'

const CardWrapper: React.FC<{
  children: React.ReactNode
  title: string | React.ReactNode
  onClick: () => void
  loading?: boolean
  plus?: boolean
  empty?: boolean
}> = ({ children, title, onClick, plus, loading, empty }) => (
  <div
    className={`w-full border border-ash_600 rounded-[15px] overflow-hidden mt-[35px] ${
      loading ? 'animate-pulse' : ''
    } `}
  >
    <div className="bg-white md:px-[40px] px-[20px] flex items-center justify-between">
      <div className="py-[14px] md:text-[24px] text-[16px]">{title}</div>
      <div className="transition-transform ease-in duration-200 right-10 top-10 cursor-pointer hover:scale-105">
        <div
          className={`w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-200 ${
            empty
              ? 'bg-transparent cursor-default'
              : ' bg-ash_200 hover:border hover:border-ash_600'
          }`}
          onClick={onClick}
        >
          {plus ? (
            <FaPlus color="#FFA466" />
          ) : !empty ? (
            <FaPen color="#FFA466" />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
    <div className="md:px-[40px] px-[20px] py-[40px]">{children}</div>
  </div>
)

export default CardWrapper
