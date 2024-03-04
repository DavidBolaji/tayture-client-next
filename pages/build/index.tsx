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
      className={`${regularFont.className} pt-16 text-center h-[90vh] overflow-y-scroll no-s`}
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
        <div className="group grid grid-cols-1 md:grid-cols-4 gap-3 place-items-center">
          <label
            className="radio-image"
            onClick={() => setSelected('template')}
          >
            <input
              type="radio"
              name="template"
              value="template1"
              className="hidden-radio"
            />
            <Image src={Images.CV} alt="Template 1" />
          </label>

          <label
            className="radio-image"
            onClick={() => setSelected('templateTwo')}
          >
            <input
              type="radio"
              name="template"
              value="template2"
              className="hidden-radio"
            />
            <Image src={Images.CV2} alt="Template 2" />
          </label>
          <label
            className="radio-image"
            onClick={() => setSelected('templateThree')}
          >
            <input
              type="radio"
              name="template"
              value="template3"
              className="hidden-radio"
            />
            <Image src={Images.CV3} alt="Template 2" />
          </label>
          <label
            className="radio-image"
            onClick={() => setSelected('templateFour')}
          >
            <input
              type="radio"
              name="template"
              value="template4"
              className="hidden-radio"
            />
            <Image src={Images.CV2} alt="Template 2" />
          </label>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={() => router.push(`/build/${selected}`)}
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
