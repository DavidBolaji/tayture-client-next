import React from 'react'

import { useParams } from 'next/navigation'
import TemplateOne from './templates/one'
import TemplateThree from './templates/three'
import TemplateFour from './templates/four'
import { useGlobalContext } from '@/Context/store'

export interface IProfile {
  profilePicture: string
  name: string
  email: string
  github?: string,
  web?: string,
  title?: string,
  phone: string
  summary: string
  location: string
  linkedIn: string
  languages: Language[]
  hobbies: string[]
  education: Education[]
  skills: Skill[]
  employment: Employment[]
  certificates: Certificate[]
}

interface Language {
  name: string
  scale: number
}

interface Education {
  degree: string
  year: string
  school: string
  more: string
}

interface Skill {
  name: string
  scale: number
}

interface Employment {
  title: string
  date: string
  location: string
  roles: Role[]
}

type Role = [string, string]

interface Certificate {
  name: string
  date: string
  link: string
  issuer: string
}

export interface ColorList {
  foreground: string
  colorParagraph: string
  background: string
  textOne: string
}

type cv = 'one' | 'three' | 'four'

const CVPreview: React.FC<{
  data: IProfile
  colorList: ColorList
  email: string
}> = ({ data, email }) => {
  const { template } = useParams()
  const {colorList} = useGlobalContext();


  const renderTemplate = (view: string) => {
    switch (view) {
      case 'one':
        return <TemplateOne data={data} colorList={colorList[template as cv]} email={email} />
      case 'three':
        return <TemplateThree data={data} colorList={colorList[template as cv]} email={email} />
      case 'four':
        return <TemplateFour data={data} colorList={colorList[template as cv]} email={email} />
      default:
        return null
    }
  }

  return <div className='scale-[0.78] h-[700px] -translate-x-16 -translate-y-24'>{!template ? null : renderTemplate(template as string)}</div>
}

export default CVPreview