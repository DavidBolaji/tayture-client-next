import { Images } from '@/assets'
import { boldFont } from '@/assets/fonts/fonts'
import Wrapper from '@/components/Wrapper/Wrapper'
import Image from 'next/image'

import React from 'react'
import NavigationButton from './NavigationButton'

const Hero = () => {
  return (
    <section className="bg-[#faf9f9] py-10">
      <Wrapper>
        <div className="w-full grid grid-cols-6 lg:grid-cols-12">
          <div className="col-span-6 lg:order-none order-6 flex flex-col justify-center">
            <h1
              className={`lg:font-[800] text-[25px] md:text-[38px] lg:text-[42px]  xl:text-[40px] xl:text-left text-center  lg:text-left sm:text-[38px] mb-2 ${boldFont.className}`}
            >
              Hiring, Training <br />
              and Community for K-12 schools, teachers and parents.
            </h1>
            <p
              className={`text-[16px] text-ash_400 lg:text-left lg:text-[18px] xl:text-[18px]  text-center mb-5`}
            >
              Post a job and get a job. Access training and mentors.
            </p>
            <div className="lg:text-left text-center">
              <NavigationButton />
            </div>
          </div>
          <div className="col-span-6">
            <div
              className="lg:mt-6 mt-0 xl:pr-10 flex justify-center lg:translate-x-12
        xl:translate-x-12  sm:justify-start"
            >
              {/* <Image
                priority
                src={Images.HeroImage}
                alt="hero"
                className="lg:object-center lg:object-contain scale-[0.75] lg:scale-[0.85] xl:scale-[0.95] -z-5"
              /> */}
              <Image
                priority
                src={Images.HeroImage}
                alt="hero"
                width={800}
                height={600}
                layout="fixed"
                className="lg:object-center lg:object-contain scale-[0.75] lg:scale-[0.85] xl:scale-[0.95] -z-5"
              />
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  )
}

export default Hero
