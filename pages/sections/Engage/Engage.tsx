import { Images } from '@/assets'
import { boldFont } from '@/assets/fonts/fonts'
import Button from '@/components/Button/Button'
import CardComponent from '@/components/CardComponent/CardComponent'
import TwoColumn from '@/components/TwoColumn/TwoColumn'
import { useRouter } from 'next/router'
import React from 'react'

const Engage = () => {
  const router = useRouter();
  return (
    <TwoColumn
      left={
        <div className="lg:px-0 px-5 flex items-center -translate-y-5  lg:scale-100 justify-center xl:justify-start xl:mb-0 lg:translate-x-0 -translate-x-4">
          <CardComponent
            src={Images.Engage_Max_Image}
            alt="tayture transform"
          />
        </div>
      }
      right={
        <div className="xl:max-w-[40rem] xl:w-[40rem] flex flex-col text-left justify-center lg:mt-0 -mt-16 md:-mt-4 translate-x-3 lg:translate-x-0">
          <h2
            className={`text-black_200 mt-5 text-center lg:text-left xl:text-left text-[10px] lg:text-[20px] tracking-[2.4px] lg:tracking-[3.48px] ${boldFont.className}`}
          >
            FOR PARENTS
          </h2>
          <h2
            className={`-ml-1 text-black_200 font-[700] text-[1.5rem] lg:text-[2.5rem] xl:text-[2.5rem] mb-[4px] xl:text-left lg:text-left text-center lg:max-w-[450px] ${boldFont.className}`}
          >
            Engage Your
            <span className="text-orange"> Child’s Education</span>
          </h2>
          <p className="text-ash_400 -mt-1 mb-[20px] xl:text-left xl:text-[20px] text-center lg:text-left  lg:max-w-[600px]">
            Gain relevant skills as a parent and effectively collaborate with
            teachers to unleash your child&apos;s potential.
          </p>
          <div className="lg:block flex justify-center lg:ml-1">
            <Button bold={false} text="Get Started" render="dark" hover  onClick={() => router.push('/auth/register')} />
          </div>
        </div>
      }
    />
  )
}

export default Engage
