import { Icons } from '@/assets'
import { boldFont } from '@/assets/fonts/fonts'
import React from 'react'

const RiskCard: React.FC = () => (
  <div className="bg-black_200 md:-mt-[220px] -translate-y-[100px] -mt-[95px] relative z-10 md:px-20 md:pt-10 md:pb-20 px-7 pt-0 pb-7 rounded-[30px] flex items-center justify-center flex-col mx-auto">
    <div className="xl:mb-7 md:mb-3 xl:scale-100 md:scale-75 scale-50">
      <Icons.QuoteIcon />
    </div>
    <h1
      className={`text-center text-white md:leading-loose xl:text-[2.5rem] text-[1.05rem] leading-8 md:text-[1.5rem] mx-auto ${boldFont.className}`}
    >
      We risk the future of our children when we ignore the foot soldiers
      shaping their lives.
    </h1>
  </div>
)

export default RiskCard
