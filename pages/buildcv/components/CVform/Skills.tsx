'use client'
import { boldFont, regularFont } from '@/assets/fonts/fonts'
import { Field, FieldArray } from 'formik'
import React from 'react'
import NameComponent from './NameComponent'
import { Tooltip } from 'antd'
import { MdOutlineAdd } from 'react-icons/md'
import { FaMinus } from 'react-icons/fa'
import { useGlobalContext } from '@/Context/store'

const Skills = ({ skills }: { skills: any[] }) => {
  const { colorList } = useGlobalContext()
  return (
    <div className="relative">
      <h2
        className={`mt-10 pb-0 text-xl ${boldFont.className}  uppercase`}
        style={{
          color: colorList.textOne,
        }}
      >
        Skills
      </h2>
      <hr
        className="border-1.5 mt-0 pt-0"
        style={{
          borderColor: colorList.textOne,
        }}
      />
      <ul className="">
        <FieldArray name="skills">
          {({ push: pushSkill, remove: removeSkill }) => (
            <>
              <Tooltip title="Add Skill">
                <div
                  onClick={() => {
                    pushSkill('English Literacy')
                  }}
                  className="flex items-center justify-end absolute top-1 right-0 cursor-pointer rounded-full hover:scale-105 bg-slate-300 hover:bg-orange transition-all duration-300 p-1 "
                >
                  <MdOutlineAdd size={10} />
                </div>
              </Tooltip>
              {skills.length > 0 &&
                skills.map((skill: string, ind: number) => (
                  <li
                    className="w-full h-auto mb-0 pb-0 relative"
                    key={`skills[${ind}]`}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      width: '100%',
                      color: colorList.textOne,
                    }}
                  >
                    <span
                      className="text-white"
                      style={{ marginRight: '0.5rem' }}
                    >
                      •
                    </span>{' '}
                    {/* Bullet */}
                    <div className="w-full">
                      <Field
                        name={`skills[${ind}]`}
                        as={NameComponent}
                        dir="top"
                        className={`${regularFont.className} mb-0 pb-0 text-xs w-full bg-[#102a73] text-white flex items-center mt-1`}
                        st={{
                          color: colorList.textOne,
                        }}
                      />
                    </div>
                    {ind === 0 ? null : (
                      <Tooltip title="Remove Skill">
                        <div
                          onClick={() => {
                            removeSkill(ind)
                          }}
                          className="flex items-center  bg-slate-300 rounded-full justify-end absolute right-5 top-1 cursor-pointer  hover:bg-orange transition-all duration-300 p-1"
                        >
                          <FaMinus size={8} />
                        </div>
                      </Tooltip>
                    )}
                  </li>
                ))}
            </>
          )}
        </FieldArray>
      </ul>
    </div>
  )
}

export default Skills
