'use client'
import { useState } from 'react'
import Wrapper from '@/components/Wrapper/Wrapper'
import { Icons } from '@/assets'
import Button from '@/components/Button/Button'
import Spinner from '@/components/Spinner/Spinner'
import { boldFont } from '@/assets/fonts/fonts'
import { useRouter } from 'next/router'

function Need() {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const handleNavigate = () => {
    setLoading((prev) => !prev)
    setTimeout(() => {
      router.push('/calculator')
      setLoading((prev) => !prev)
    }, 2000)
  }
  return (
    <div className="bg-black_200 py-20 text-center">
      <Wrapper>
        <div className="flex justify-center flex-col items-center w-full">
          <div className="flex justify-center items-center text-center mb-[5px] w-[200px]">
            <Icons.NeedIcon className="w-[43px] height-[115px] text-center md:w-[55px] md:h-[147px]" />
          </div>
          <div className="text-center flex justify-center flex-col text-white md:translate-y-0 md:pb-[20px]">
            <h2
              className={`text-center mb-[4px] text-[24px] lg:text-[40px]
            md:max-w-none max-w-[250px] mx-auto ${boldFont.className}`}
            >
              Not sure if you need tayture ?
            </h2>
            <p
              className={`mx-auto md:mb-[3rem] xl:mb-[40px]
               sm:max-w-[410px] md:mx-auto md:max-w-[873px] text-center text-white
               md:text-center mb-[16px] sm:text-center xl:text-center lg:text-center text-[20px]
            `}
            >
              Are you a school administrator, teacher or parent? Use
              tayture&apos;s calculator to estimate your current satisfaction
              level and get tips for improvement now.
            </p>
            <div className="flex items-center justify-center">
              <Button
                bold={false}
                text={
                  loading ? (
                    <Spinner />
                  ) : (
                    <span className="text-[18px]">I&apos;m Interested</span>
                  )
                }
                render="light"
                onClick={handleNavigate}
              />
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default Need
