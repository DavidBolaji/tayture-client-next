import { Images } from '@/assets'
import { boldFont } from '@/assets/fonts/fonts'
import JobSearch from '@/components/JobSearch/JobSearch'
import Image from 'next/image'
import React from 'react'

const FindJobHeading = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <div className="h-full flex items-center">
          <Image alt={'dart'} src={Images.Dart} />
        </div>
      </div>
      <div className="col-span-8">
        <div className="flex w-full h-full justify-center items-center flex-col">
          <h2
            className={`text-xl sm:text-3xl md:text-4xl tracking-tighter lg:text-5xl mt-10 ${boldFont.className}`}
          >
            Find the right <span className="text-orange">Job</span> for you !
          </h2>
          <div className="w-full md:mt-0 mt-3 flex justify-center h-full items-center">
            <JobSearch className="items-center justify-center" />
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="h-full flex items-center">
          <Image alt={'dart'} src={Images.Dart2} />
        </div>
      </div>
    </div>
  )
}

export default FindJobHeading
