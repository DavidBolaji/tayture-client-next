import { boldFont, regularFont } from '@/assets/fonts/fonts'
import Wrapper from '@/components/Wrapper/Wrapper'
import HomeLayout from '@/components/layouts/HomeLayout'
import { Divider } from 'antd'
import React, { useState } from 'react'
import Image from 'next/image'
import { Images } from '@/assets'
import Button from '@/components/Button/Button'
import { useRouter } from 'next/router'

const BuildPage = () => {
  const [selected, setSelected] = useState('')
  const router = useRouter()
  return (
    <div
      className={`${regularFont.className} pt-16 text-center h-[90vh] overflow-x-auto`}
    >
      <Wrapper>
        <h1
          className={`text-center text-3xl tracking-wider leading-[38px] ${boldFont.className}`}
        >
          Choose your favorite template design
        </h1>
        <Divider>
          <span className="text-xl font-semibold">TEMPLATES</span>
        </Divider>
        <div className="flex overflow-x-auto no-s">
          {['template'].map((el) => (
            <div key={el} className="flex-shrink-0 mr-3 ">
              <label
                className="radio-image w-[250px]"
                onClick={() => setSelected(el)}
              >
                <input
                  type="radio"
                  name="template"
                  value={el}
                  className="hidden-radio"
                />
                <div className="w-[250px] h-[300px] overflow-hidden cont">
                  <Image
                    className="object-fit "
                    src={Images.CV}
                    alt={`Template ${el}`}
                    width={300}
                    height={225}
                  />
                </div>
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-5">
          <Button
            onClick={() => router.push(`/buildcv/${selected}`)}
            disabled={selected.trim().length < 5}
            text="Next"
            render="light"
            bold={false}
          />
        </div>
      </Wrapper>
    </div>
  )
}

BuildPage.getLayout = function getLayout(page: React.ReactNode) {
  return <HomeLayout>{page}</HomeLayout>
}

export default BuildPage
