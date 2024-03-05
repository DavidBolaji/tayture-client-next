import React, { useState } from 'react'
import CVTemplateOne from '../components/cvtemplates/CVTemplateOne'
import HomeLayout from '@/components/layouts/HomeLayout'
import Wrapper from '@/components/Wrapper/Wrapper'
import { Tabs } from 'antd'
import ColorPalete from '../components/ColorPalete'

const items = [
  {
    key: 'template',
    id: 'templates',
    label: `colors`,
    children: (
      <div>
        <span>Background</span>
        <ColorPalete background="background" />
        <span>Foreground</span>
        <ColorPalete background="foreground" />
        <span>Text 1</span>
        <ColorPalete background="textOne" />
        <span>Text2</span>
        <ColorPalete background="textTwo" />
        <span>Text3</span>
        <ColorPalete background="colorParagraph" />
      </div>
    ),
  },
]

const One = () => {
  return (
    <div className="mt-20 h-[90vh] overflow-y-scroll no-s">
      <Wrapper>
        <div className="grid grid-cols-10 gap-3">
          <div className="md:col-span-7 col-span-10">
            <CVTemplateOne />
          </div>
          <div className="md:col-span-3 px-3 col-span-10 md:order-last order-first ">
            <Tabs type="card" defaultActiveKey="template" items={items} />
          </div>
        </div>
      </Wrapper>
    </div>
  )
}
One.getLayout = function getLayout(page: React.ReactNode) {
  return <HomeLayout>{page}</HomeLayout>
}

export default One
