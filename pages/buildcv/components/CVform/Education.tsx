'use client'
import { MinusCircleOutlined } from '@ant-design/icons'
import { Field, FieldArray } from 'formik'
import React, { useState } from 'react'
import { MdOutlineAdd } from 'react-icons/md'
import { Tooltip } from 'antd'
import NameComponent from './NameComponent'
import { boldFont, regularFont } from '@/assets/fonts/fonts'
import { useGlobalContext } from '@/Context/store'

export const initialValuesCv = {
  name: `DANIEL
  OLOGUNLEKO`,
  summary:
    'Experienced web developer proficient in frontend and backend development, with expertise in HTML, CSS, JavaScript, and various frameworks/libraries. Skilled in version control (Git), deployment, and debugging. Dedicated to creating responsive, efficient, and visually appealing websites and web applications. Strong problem-solving abilities and a passion for staying updated with the latest web technologies.',
  history: [
    {
      id: 'history',
      title: 'Primary School Teacher',
      date: '01/2023 - Current',
      location: 'Wordhouse Green Primary School, London',
      roles: [
        {
          keys: 'r1',
          role: 'Designing and delivering engaging lessons aligned with curriculum standards.',
        },
        {
          keys: 'r2',
          role: "Developing lesson plans, instructional materials, and activities tailored to students' learning needs.",
        },
        {
          keys: 'jker78',
          role: 'Incorporating diverse teaching methodologies and resources to enhance student understanding.',
        },
      ],
    },
  ],
  education: [
    {
      id: 'education',
      degree: 'Bachelor of Arts, Education',
      year: '2016',
      school: 'University of London - London',
    },
  ],
  location: '195 Crown Street, London W12 4WEB',
  number: '+23485674321',
  email: 'davidologunleko@gmail.com.uk',
  skills: [
    'Activity Skills',
    'Organisational skills',
    'Parent rappoort buildng',
  ],
}

export const workData = {
  title: 'Primary School Teacher',
  date: '01/2023 - Current',
  location: 'Wordhouse Green Primary School, London',
  roles: [
    {
      keys: '7878',
      role: 'Designing and delivering engaging lessons aligned with curriculum standards.',
    },
    {
      keys: 'ddd89',
      role: "Developing lesson plans, instructional materials, and activities tailored to students' learning needs.",
    },
    {
      keys: '328728',
      role: 'Incorporating diverse teaching methodologies and resources to enhance student understanding.',
    },
  ],
}

export const eduData = {
  degree: 'Bachelor of Arts, Education',
  year: '2016',
  school: 'University of London - London',
}

const Education = () => {
  const [education, setEducation] = useState(initialValuesCv.education)
  const { colorList } = useGlobalContext()

  const handlePushEdu = (fn: (data: any) => void) => {
    const id = new Date().toISOString()
    fn({ id, ...eduData })
    setEducation((prev) => {
      const updatedEdu = [...prev]
      updatedEdu.push({ id, ...eduData })
      return updatedEdu
    })
  }

  const handleRemoveEdu = (fn: (data: any) => void, idx: number) => {
    fn(idx)
    setEducation((prev) => {
      const updatedEdu = [...prev]
      updatedEdu.splice(idx, 1) // Remove the item at index idx
      return updatedEdu
    })
  }

  return (
    <div className="relative">
      <h2
        className={`mt-10 text-xl ${boldFont.className} uppercase`}
        style={{
          color: colorList.background,
        }}
      >
        Education
      </h2>
      <hr
        className="border-1.5 mb-2"
        style={{
          borderColor: colorList.background,
        }}
      />
      <FieldArray name="education">
        {({ push, remove }) => (
          <>
            {education.length > 0 &&
              education.map((_, ind) => (
                <div key={ind} className="relative">
                  <div className="flex justify-between items-center h-1 mt-6">
                    <div className="flex flex-[0.7]">
                      <Field
                        name={`education[${ind}].degree`}
                        as={NameComponent}
                        type="text"
                        dir="top"
                        className={` text-xs md:text-sm h-1 ${boldFont.className} uppercase`}
                        st={{
                          color: colorList.colorParagraph,
                        }}
                      />
                    </div>
                    <div className="w-full flex flex-[0.3] justify-end">
                      <Field
                        name={`education[${ind}].year`}
                        as={NameComponent}
                        dir="top"
                        className={` text-[10px] md:text-sm ${regularFont.className} h-1 capitalize w-full`}
                        st={{
                          color: colorList.colorParagraph,
                        }}
                      />
                    </div>
                  </div>

                  <Field
                    name={`education[${ind}].school`}
                    as={NameComponent}
                    dir="top"
                    className={`${regularFont.className} text-xs md:text-sm w-full`}
                    st={{
                      color: colorList.colorParagraph,
                    }}
                  />

                  {ind === 0 && (
                    <Tooltip title={`Add Education`}>
                      <div
                        onClick={() => handlePushEdu(push)}
                        className="flex items-center justify-end absolute -top-[52px] right-0 cursor-pointer rounded-full hover:scale-105 bg-slate-300 hover:bg-orange transition-all duration-300 p-1 "
                      >
                        <MdOutlineAdd />
                      </div>
                    </Tooltip>
                  )}

                  {ind > 0 && (
                    <div className="flex items-center justify-end absolute -top-10 right-0">
                      <MinusCircleOutlined
                        onClick={() => handleRemoveEdu(remove, ind)}
                      />
                      <hr />
                    </div>
                  )}
                </div>
              ))}
          </>
        )}
      </FieldArray>
    </div>
  )
}

export default Education
