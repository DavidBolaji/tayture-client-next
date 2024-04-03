'use client'
import { boldFont, regularFont } from '@/assets/fonts/fonts'
import { MinusCircleOutlined } from '@ant-design/icons'
import { Field, FieldArray } from 'formik'
import React, { useState } from 'react'
import { MdOutlineAdd } from 'react-icons/md'
import NameComponent from './NameComponent'
import { Tooltip } from 'antd'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { Row } from './DragableSection'
import { useGlobalContext } from '@/Context/store'
import { useQueryClient } from '@tanstack/react-query'

export const initialValuesCv = {
  name: `DANIEL
  OLOGUNLEKO`,
  summary:
    'Experienced web developer proficient in frontend and backend development, with expertise in HTML, CSS, JavaScript, and various frameworks/libraries. Skilled in version control (Git), deployment, and debugging. Dedicated to creating responsive, efficient, and visually appealing websites and web applications. Strong problem-solving abilities and a passion for staying updated with the latest web technologies.',
  history: [
    {
      id: 'history',
      title: 'Primary School Teacher',
      date: 'feb, 2019 - apr, 2023',
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
      year: 'feb, 2019 - apr, 2023',
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
  date: 'feb, 2019 - apr, 2023',
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
  year: 'feb, 2019 - apr, 2023',
  school: 'University of London - London',
}

const WorkHistory = () => {
  const [history, setHistory] = useState(initialValuesCv.history)
  const { colorList }: {colorList: any} = useGlobalContext()
  const queryClient = useQueryClient()

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const activeIndex = history.findIndex((item) => item.id === active.id)
      const overIndex = history.findIndex((item) => item.id === over?.id)
      if (activeIndex !== -1 && overIndex !== -1) {
        const updatedHistory = arrayMove(history, activeIndex, overIndex)
        setHistory(updatedHistory)
      }
    }
  }

  const handlePushList = (
    fn: (data: { role: string }) => void,
    ind: number,
  ) => {
    fn({
      role: 'Designing and delivering engaging lessons aligned with curriculum standards.',
    })

    setHistory((prev) => {
      const updatedHistory = [...prev]
      updatedHistory[ind].roles.push({
        keys: new Date().toISOString(),
        role: 'Designing and delivering engaging lessons aligned with curriculum standards.',
      })
      return updatedHistory
    })
  }

  const handleRemoveList = (ind: number, idx: number) => {
    setHistory((prev) => {
      const updatedHistory = [...prev]
      updatedHistory[ind].roles.splice(idx, 1)
      return updatedHistory
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
        Work History
      </h2>
      <hr
        className="border-1.5  mb-2"
        style={{
          borderColor: colorList.background,
        }}
      />
      <FieldArray name="history">
        {({ push, remove }) => (
          <>
            {history.length > 0 &&
              history.map((_, ind) => (
                <div key={ind} id={_.id} className="relative mb-10">
                  <div className="flex justify-between items-center h-1 mt-6">
                    <div className="flex flex-[0.7]">
                      <Field
                        name={`history[${ind}].title`}
                        as={NameComponent}
                        type="text"
                        dir="top"
                        className={`text-black text-xs md:text-sm h-1 ${boldFont.className} uppercase`}
                        st={{
                          color: colorList.colorParagraph,
                        }}
                      />
                    </div>
                    <div className="w-full flex flex-[0.3] justify-end">
                      <Field
                        name={`history[${ind}].date`}
                        as={NameComponent}
                        dir="top"
                        className={`text-black text-xs ${regularFont.className} h-1 capitalize w-full`}
                        st={{
                          color: colorList.colorParagraph,
                        }}
                      />
                    </div>
                  </div>

                  <Field
                    name={`history[${ind}].location`}
                    as={NameComponent}
                    dir="top"
                    className={`${regularFont.className} text-xs md:text-sm w-full font-bold`}
                    st={{
                      color: colorList.colorParagraph,
                    }}
                  />
                  <ul
                    className="w-full -translate-y-2"
                    style={{
                      listStyleType: 'none',
                      padding: 0,
                    }}
                  >
                    <FieldArray name={`history[${ind}].roles`}>
                      {({ push: push2, remove: remove2, pop }) => (
                        <>
                          <Tooltip title="Add Roles">
                            <button
                              type="button"
                              onClick={() => handlePushList(push2, ind)}
                              className="flex items-center justify-end absolute -top-[14px] left-0 cursor-pointer rounded-full hover:scale-105 bg-slate-300 hover:bg-orange transition-all duration-300 p-1 "
                            >
                              <MdOutlineAdd size={10} />
                            </button>
                          </Tooltip>
                          <DndContext
                            modifiers={[restrictToVerticalAxis]}
                            onDragEnd={onDragEnd}
                          >
                            <SortableContext
                              items={_.roles.map((role: any) => role.keys)}
                            >
                              {_.roles &&
                                _.roles.length > 0 &&
                                _.roles.map((role: any, idx: number) => (
                                  <Row
                                    hidden
                                    key={role.keys}
                                    data-row-key={role.keys}
                                  >
                                    <li
                                      className="w-full h-auto mb-0 pb-0 relative"
                                      key={role.keys}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        width: '100%',
                                        color: colorList.colorParagraph,
                                      }}
                                    >
                                      <span style={{ marginRight: '0.5rem' }}>
                                        •
                                      </span>{' '}
                                      <div className="w-full">
                                        <Field
                                          name={`history[${ind}].roles[${idx}.role`}
                                          as={NameComponent}
                                          dir="top"
                                          className={`${regularFont.className} mb-0 pb-0 text-xs md:text-sm w-full`}
                                        />
                                      </div>
                                      {idx === 0 ? null : (
                                        <div className="flex items-center justify-end absolute right-0 top-[20px]">
                                          <MinusCircleOutlined
                                            size={5}
                                            onClick={() => {
                                              handleRemoveList(ind, idx)
                                              remove2(idx)
                                            }}
                                          />
                                        </div>
                                      )}
                                    </li>
                                  </Row>
                                ))}
                            </SortableContext>
                          </DndContext>
                        </>
                      )}
                    </FieldArray>
                  </ul>

                  {ind === 0 && (
                    <Tooltip title={`Add Work History`}>
                      <div
                        onClick={() => {
                          push(workData)
                          setHistory((prev) => {
                            queryClient.setQueryData([`${prev.length}`], {"location":"Wordhouse Green Primary School, Ghana","city":"Aba","state":"Abia State","lga":"Bende","address":"hajs, will"})
                            return [
                            ...prev,
                            { id: new Date().toISOString(), ...workData },
                          ]})
                       
                          
                        }}
                        className="flex items-center justify-end absolute -top-[52px] right-0 cursor-pointer rounded-full hover:scale-105 bg-slate-300 hover:bg-orange transition-all duration-300 p-1 "
                      >
                        <MdOutlineAdd />
                      </div>
                    </Tooltip>
                  )}

                  {ind > 0 && (
                    <div className="items-center justify-end absolute -top-10 right-0 flex">
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(ind)
                          setHistory((prev) => {
                            const result = prev.filter(
                              (work) => work.id !== _.id,
                            )
                            return [...result]
                          })
                        }}
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

export default WorkHistory
