import { Icons } from '@/assets'
import Button from '@/components/Button/Button'
import Wrapper from '@/components/Wrapper/Wrapper'
import { IoTelescopeSharp } from 'react-icons/io5'
import React from 'react'
import { boldFont } from '@/assets/fonts/fonts'
import { useRouter } from 'next/router'

const Hiring = () => {
  const router = useRouter()
  return (
    <section className="grid lg:grid-cols-12 grid-cols-6">
      <div className="col-span-6 bg-[] md:py-20 py-10">
        <Wrapper>
          <div className="w-[80px] h-[80px] rounded-md bg-[#e9e8e8] grid place-items-center">
            <Icons.JobsSearchIcon color={'#FFF'} />
          </div>
          <h2
            className={`mt-[26px] font-[700] text-[40px] text-black ${boldFont.className}`}
          >
            Get a job today
          </h2>
          <p className="text-black max-w-[506px] mt-[16px]">
            Are you an educator? Sign up now to start getting job offers in
            Nursery, Primary and Secondary schools
          </p>
          <div className="w-2/4 mt-[40px]">
            <Button
              text={'See Jobs'}
              bold={false}
              render={'dark'}
              onClick={() => router.push('/jobs')}
            />
          </div>
        </Wrapper>
      </div>
      <div className="col-span-6 bg-black md:py-20 py-10">
        <Wrapper>
          <div className="w-[80px] h-[80px] rounded-md bg-[#ffffff6e] grid place-items-center">
            <IoTelescopeSharp size={42} color={'#FFF'} />
          </div>
          <h2
            className={`mt-[26px] font-[700] text-[40px] text-white ${boldFont.className}`}
          >
            Hire Teachers now
          </h2>
          <p className="text-white max-w-[506px] mt-[16px]">
            {' '}
            Do you have a vacancy at your school? Tayture can help you find qualified candidates.
            
          </p>
          <div className="w-2/4 mt-[65px]">
            <Button
              text={'Post Jobs'}
              bold={false}
              render={'light'}
              onClick={() => router.push('/post_landing')}
            />
          </div>
        </Wrapper>
      </div>
    </section>
  )
}

export default Hiring
