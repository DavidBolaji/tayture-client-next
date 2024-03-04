import { regularFont } from '@/assets/fonts/fonts'
import Button from '@/components/Button/Button'
import React from 'react'

const Career = () => {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-[#FFA466] rounded-md h-full w-full py-[48px] ${regularFont.className}`}
    >
      <h2 className="text-black_200 lg:text-3xl md:text-2xl sm:text-xl text-2xl text-center max-w-[350px] md:max-w-none mb-[8px] md:mb-[16px]">
        Advance your career with Tayture HR
      </h2>
      <p className="text-black max-w-[300px] md:max-w-[460px] mx-auto md:mb-[36px] mb-[20px] text-center">
        Create a free account, complete your profile,and get matched with your
        dream job.
      </p>
      <Button render="dark" text={'Creare Account'} bold={false} />
    </div>
  )
}

export default Career
