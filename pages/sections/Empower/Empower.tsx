import { Images } from '@/assets'
import { boldFont } from '@/assets/fonts/fonts'
import Button from '@/components/Button/Button'
import CardComponent from '@/components/CardComponent/CardComponent'
import TwoColumn from '@/components/TwoColumn/TwoColumn'
import React from 'react'

const Empower = () => {
  return (
    <TwoColumn
      white={false}
      right={
        <div className="lg:px-0 px-5 flex w-full lg:-translate-y-5 justify-center xl:justify-end xl:mb-0 mb-[1.47rem] translate-x-3 lg:translate-x-0">
          <CardComponent
            src={Images.Empower_Max_Image}
            alt="tayture empower"
            right
          />
        </div>
      }
      left={
        <div className="xl:max-w-[40rem] xl:w-[40rem] flex flex-col text-left justify-center lg:mt-0 -mt-16 md:-mt-4 -translate-x-2 lg:translate-x-0">
          <h2
            className={`text-black_200 mt-5 text-center lg:text-left xl:text-left text-[10px] lg:text-[20px] tracking-[2.4px] lg:tracking-[3.48px] ${boldFont.className}`}
          >
            FOR SCHOOL ADMINS
          </h2>
          <h2
            className={`-ml-1 text-black_200 font-[700] text-[1.5rem] lg:text-[2.5rem] xl:text-[2.5rem] mb-[4px] xl:text-left lg:text-left text-center ${boldFont.className}`}
          >
            Empower Your <span className="text-orange">School</span>
          </h2>
          <p className="text-ash_400 -mt-1 mb-[20px] xl:text-left xl:text-[20px] text-center lg:text-left">
            Supercharge your school into an enabling environment with a
            continuously growing workforce and greater teacher-parent
            collaboration that helps students attain record-breaking results.
          </p>
          <div className="lg:block flex justify-center lg:ml-1">
            <Button
              bold={false}
              text="Get Started"
              render="light"
              // onClick={() => navigate('/auth/register')}
              hover
            />
          </div>
        </div>
      }
    />
  )
}

export default Empower
