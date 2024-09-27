import React, { useState, useEffect } from 'react'
import { Axios } from '@/request/request'
import Script from 'next/script'

export interface IProfile {
  profilePicture: string
  name: string
  title: string
  email: string
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

const CVPreview: React.FC<{
  data: IProfile
  colorList: ColorList
  email: string
}> = ({ data, colorList, email }) => {
  const [previewHtml, setPreviewHtml] = useState('')

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const response = await Axios.post('/cv/render', {
          data,
          colorList,
          email,
        })
        setPreviewHtml(response.data.html)
      } catch (error) {
        console.error('Error fetching preview:', error)
      }
    }

    if (data) {
      fetchPreview()
    }
  }, [data, colorList, email])

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <Script src="https://cdn.tailwindcss.com"></Script>
      <div
        id="cv-preview"
        dangerouslySetInnerHTML={{ __html: previewHtml }}
      />
    </>
  )
}

export default CVPreview