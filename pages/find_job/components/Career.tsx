import { regularFont } from '@/assets/fonts/fonts'
import Button from '@/components/Button/Button'
import { useRouter } from 'next/router'
import React from 'react'

const Career = () => {
  const router = useRouter()
  return (
    <div
      className={`flex flex-col items-center justify-center bg-[#FFA466] rounded-md h-full w-full md:py-[48px] py-5 px-10 ${regularFont.className}`}
    >
      <h2 className="text-black_200 lg:text-3xl md:text-2xl sm:text-xl text-lg text-center max-w-[350px] md:max-w-none mb-[8px] font-bold">
        Advance your career with Tayture HR
      </h2>
      <p className="text-black max-w-[300px] md:max-w-[460px] mx-auto mb-[20px] text-center">
        Join our community to get job alerts!
      </p>
      <a href='https://bit.ly/tenbytayture' target='_blank' className='w-10'>
        <Button
          render="dark"
          text={'Join'}
          bold={false}
        />
      </a>
    </div>
  )
}

export default Career
