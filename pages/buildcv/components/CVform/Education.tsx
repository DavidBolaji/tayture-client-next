'use client'
import { MinusCircleOutlined } from '@ant-design/icons'
import { Field, FieldArray } from 'formik'
import React, { useState } from 'react'
import { MdOutlineAdd } from 'react-icons/md'
import { Tooltip } from 'antd'
import NameComponent from './NameComponent'
import { boldFont, regularFont } from '@/assets/fonts/fonts'
import useCv, { eduData } from '../../hook/useCv'

const Education = () => {
  const { setEducation, education, colorList } = useCv()

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
      updatedEdu.splice(idx, 1)
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
                        className={`text-[10px] md:text-xs ${regularFont.className} h-1 capitalize w-full`}
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
