import React from 'react'

import CardComponent from '@/components/CardComponent/CardComponent'
import { Images } from '@/assets'
import Button from '@/components/Button/Button'
import { boldFont, regularFont } from '@/assets/fonts/fonts'
import TwoColumn from '@/components/TwoColumn/TwoColumn'
import { useRouter } from 'next/router'

const HomeCv = () => {
  const router = useRouter()
  return (
    <TwoColumn
      white={false}
      left={
        <div className="lg:px-0 px-5 flex items-center -translate-y-5  lg:scale-100 justify-center xl:justify-start xl:mb-0 lg:translate-x-0 -translate-x-2">
          <CardComponent
            src={Images.Transform_Max_Image}
            alt="tayture transform"
          />
        </div>
      }
      right={
        <div className="xl:max-w-[40rem] xl:w-[40rem] flex flex-col text-center lg:text-left justify-center lg:mt-0 -mt-16 md:-mt-4">
          <h2
            className={`text-black_200 mt-5 text-center lg:text-left text-[10px] lg:text-[20px] tracking-[2.4px] lg:tracking-[3.48px] lg:translate-x-0 translate-x-4 ${boldFont.className}`}
          >
            FOR TEACHERS
          </h2>
          <h2
            className={`-ml-1 text-black_200 font-[700] text-[24px] lg:text-[40px] mb-[4px] lg:text-left text-center  lg:translate-x-0 translate-x-4  ${boldFont.className}`}
          >
            Craete Your{' '}
            <span className={`text-orange ${regularFont.className}`}>
              {' '}
              CV
            </span>
          </h2>
          <p className="text-ash_400 -mt-1 mb-[20px] xl:text-[20px] lg:max-w-[450px] text-center lg:text-left lg:translate-x-0 translate-x-4">
            Craft a standout CV that showcases your teaching expertise, highlights
            your achievements, and opens doors to exciting career opportunities
            in education.
          </p>
          <div className="lg:block flex justify-center lg:ml-1 lg:translate-x-0 translate-x-4">
            <Button
              bold={false}
              text="Get Started"
              render="dark"
              onClick={() => router.push('/auth/register')}
              hover
            />
          </div>
        </div>
      }
    />
  )
}

export default HomeCv
