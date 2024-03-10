'use client'
import React from 'react'
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md'
import { useGlobalContext } from '@/Context/store'
import { boldFont, regularFont } from '@/assets/fonts/fonts'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  initialValues: any
  onSubmit: () => void
}

const CVTemplatePreview = ({ hide }: { hide?: boolean }) => {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData(['cvData']) as any
  const order = queryClient.getQueryData(['sectionOrder']) as string[]
  const { colorList } = useGlobalContext()

  return (
    <div
      id="cvvv"
      className="w-full grid grid-cols-10 border rounded-md shadow-lg"
    >
      <div
        style={{
          backgroundColor: colorList.foreground,
        }}
        className={`col-span-7 p-5 whitespace-pre-line`}
      >
        <div
          className="text-sm sm:text-md md:text-4xl lg:text-5xl font-bold uppercase"
          style={{
            color: colorList.background,
            borderColor: colorList.background,
          }}
        >
          {data.name}
        </div>
        <hr
          style={{
            display: 'block',
            borderColor: colorList.background,
            borderWidth: 1.5,
            marginTop: '2px',
            marginBottom: '2px',
          }}
        />
        <h2
          className={`mt-10 text-xl ${boldFont.className} uppercase`}
          style={{
            color: colorList.background,
          }}
        >
          Professional Summary
        </h2>
        <hr
          className="border-1.5 mb-2"
          style={{
            borderColor: colorList.background,
          }}
        />
        <div
          className={`text-xs md:text-sm font-light ${regularFont.className}`}
          style={{
            color: colorList.colorParagraph,
          }}
        >
          {data.summary}
        </div>

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
            className="border-1.5 mb-2"
            style={{
              borderColor: colorList.background,
            }}
          />

          <>
            {data.history.length > 0 &&
              data.history.map((_: any, ind: number) => (
                <div key={ind} id={_.id} className="relative mb-10">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-[0.7]">
                      <div
                        className={`text-black text-xs md:text-sm  ${boldFont.className} uppercase`}
                        style={{
                          color: colorList.colorParagraph,
                        }}
                      >
                        {_.title}
                      </div>
                    </div>
                    <div className="w-full flex flex-[0.3] justify-end">
                      <div
                        className={`text-black text-[10px] md:text-sm ${regularFont.className} capitalize w-full`}
                        style={{
                          color: colorList.colorParagraph,
                        }}
                      >
                        {_.date}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${regularFont.className} text-xs md:text-sm w-full font-bold`}
                    style={{
                      color: colorList.colorParagraph,
                    }}
                  >
                    {_.location}
                  </div>
                  <ul
                    className="w-full"
                    style={{
                      listStyleType: 'none',
                      padding: 0,
                    }}
                  >
                    {_.roles &&
                      _.roles.length > 0 &&
                      _.roles.map((role: any, idx: number) => (
                        <li
                          key={role.key}
                          className="w-full h-auto mb-0 pb-0 relative"
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            width: '100%',
                            color: colorList.colorParagraph,
                          }}
                        >
                          <span style={{ marginRight: '0.5rem' }}>•</span>{' '}
                          <div className="w-full">
                            <div
                              className={`${regularFont.className} mb-0 pb-0 text-xs md:text-sm w-full`}
                            >
                              {role.role}
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
          </>
        </div>

        <div className="relative">
          <h2
            className={`mt-10 text-xl ${boldFont.className} uppercase`}
            style={{
              color: colorList.background,
            }}
          >
            Education
          </h2>
          {/* <hr
            className="border-1.5 mb-2"
            style={{
              borderColor: colorList.background,
            }}
          /> */}

          <>
            {data.education.length > 0 &&
              data.education.map((_: any, ind: number) => (
                <div key={ind} className="relative mb-4">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-[0.7]">
                      <div
                        className={` text-xs md:text-sm ${boldFont.className} uppercase`}
                        style={{
                          color: colorList.colorParagraph,
                        }}
                      >
                        {_.degree}
                      </div>
                    </div>
                    <div className="w-full flex flex-[0.3] justify-end">
                      <div
                        className={` text-[10px] md:text-xs ${regularFont.className} capitalize w-full`}
                        style={{
                          color: colorList.colorParagraph,
                        }}
                      >
                        {_.year}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${regularFont.className} text-xs md:text-sm w-full`}
                    style={{
                      color: colorList.colorParagraph,
                    }}
                  >
                    {_.school}
                  </div>
                </div>
              ))}
          </>
        </div>
      </div>
      <div
        className="col-span-3 items-center px-5 pt-10 space-y-4 whitespace-pre-line"
        style={{
          backgroundColor: colorList.background,
        }}
      >
        <div className="grid grid-cols-5">
          <div className="col-span-1 flex items-start h-full">
            <div
              className="flex items-center w-7 h-7 justify-center rounded-full"
              style={{
                backgroundColor: colorList.textOne,
              }}
            >
              <MdLocationOn
                style={{
                  color: colorList.background,
                }}
              />
            </div>
          </div>
          <div className="col-span-4">
            <div
              className="text-[10px]"
              style={{
                color: colorList.textOne,
              }}
            >
              {data.location}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <div
            className="flex items-center justify-center w-6 h-6 rounded-full p-1"
            style={{
              backgroundColor: colorList.textOne,
            }}
          >
            <MdPhone
              style={{
                color: colorList.background,
              }}
            />
          </div>
          <div
            className="text-[12px] background] mt-0.5"
            style={{
              color: colorList.textOne,
            }}
          >
            {data.number}
          </div>
        </div>
        <div className="flex gap-3">
          <div
            className="flex items-center justify-center w-7 h-6 rounded-full bg-white"
            style={{
              backgroundColor: colorList.textOne,
            }}
          >
            <MdEmail
              style={{
                color: colorList.background,
              }}
            />
          </div>
          <div
            className="text-[10px] mt-0.5  text-white"
            style={{
              color: colorList.textOne,
            }}
          >
            {data.email}
          </div>
        </div>

        <div className="relative">
          <h2
            className={`mt-10 pb-0 text-xl ${boldFont.className}  uppercase`}
            style={{
              color: colorList.textOne,
            }}
          >
            Skills
          </h2>
          {/* <hr
            className="border-1.5 mt-0 pt-0"
            style={{
              borderColor: colorList.textOne,
            }}
          /> */}
          <ul className="">
            <>
              {data.skills.length > 0 &&
                data.skills.map((skill: string, ind: number) => (
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
                    <div className="w-full">
                      <div
                        className={`${regularFont.className} mb-0 pb-0 text-xs w-full text-white flex items-center mt-1`}
                        style={{
                          color: colorList.textOne,
                        }}
                      >
                        {skill}
                      </div>
                    </div>
                  </li>
                ))}
            </>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CVTemplatePreview
