import { Images } from '@/assets'
import { boldFont } from '@/assets/fonts/fonts'
import JobSearch from '@/components/JobSearch/JobSearch'
import Image from 'next/image'
import React from 'react'

const FindJobHeading = () => {
  return (
    <div className="grid grid-cols-12 sticky -top-10 min-h-16 bg-[#faf9f9] z-30">
      <div className="col-span-2 xs:col-span-1">
        <div className="h-full flex items-center relative z-30">
          <Image alt={'dart'} src={Images.Dart} />
        </div>
      </div>
      <div className="col-span-8 ralative xs:col-span-10">
        <div className="flex w-full h-full justify-center items-center flex-col">
          <h2
            className={`text-lg whitespace-nowrap sm:text-3xl md:text-4xl tracking-tighter lg:text-5xl md:mt-10 ${boldFont.className}`}
          >
            Find the right <span className="text-orange">Job</span> for you
          </h2>
          <div className="w-full md:mt-0 mt-3 flex justify-center h-full items-center md:bg-transparent bg-[#faf9f9] z-20 md:relative absolute md:top-3 sm:top-20 top-12 px-10 sm:px-20 md:bottom-0 sm:bottom-16 bottom-24">
            <JobSearch className="items-center justify-center absolute" />
          </div>
        </div>
      </div>
      <div className="col-span-2 xs:col-span-1">
        <div className="h-full flex items-center relative z-30">
          <Image alt={'dart'} src={Images.Dart2} />
        </div>
      </div>
    </div>
  )
}

export default FindJobHeading
