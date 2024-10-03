import React from 'react'
import { ColorList, IProfile } from '../PreviewComponent'
import { FaEnvelope, FaPhone } from 'react-icons/fa'
import { FaLocationPin } from 'react-icons/fa6'

const TemplateThree: React.FC<{
  data: IProfile
  colorList: ColorList
  email: string
  page?: number
}> = ({ data, colorList, page = 1 }) => {
  return (
    <div className="w-[640px] border">
      <div
        style={{
          backgroundColor: colorList.foreground,
        }}
        className={`flex `}
      >
        <div className="flex-[0.2] h-40 w-40 flex items-center justify-center px-4">
          <div
            style={{
              backgroundColor: colorList.background,
              color: colorList.foreground,
            }}
            className={`flex items-end justify-end h-28 w-32 text-4xl p-2 tracking-wider font-bold`}
          >
            {data.name.split(' ')[0][0].toUpperCase()}
            {data.name.split(' ')[1][0].toUpperCase()}
          </div>
        </div>
        <div className="flex-[0.8] flex justify-center flex-col">
          <h1 className="text-4xl font-bold brBold text-white">{data.name}</h1>
          <p className="text-md br mt-1 pl-1 text-white font-bold">
            {data.title}
          </p>
          <div className="flex flex-wrap gap-5 mt-2 pl-1">
            <div className="flex gap-1 items-center">
              <FaEnvelope color={colorList.background} />
              <div
                style={{
                  color: colorList.background,
                }}
                className="text-xs"
              >
                {data.email}
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <FaPhone color={colorList.background} />
              <div
                style={{
                  color: colorList.background,
                }}
                className="text-xs"
              >
                {data.phone}
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <FaLocationPin color={colorList.background} />
              <div
                style={{
                  color: colorList.background,
                }}
                className="text-xs"
              >
                {data.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="br grid grid-cols-12 relative"
        style={{ borderRadius: '0.375rem' }}
      >
        <div
          className={` mt-4 px-[1.25rem] h-auto col-span-9`}
          style={{
            backgroundColor: colorList.background
          }}
        >
          <h2 className="text-xl font-bold brBold uppercase border-b border-gray-300 pb-2">
            Summary
          </h2>
          <p className={`mb-6`}
          style={{
            color: colorList.colorParagraph
          }}
          >
            {data.summary}
          </p>

          {/* Education Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold brBold uppercase border-b border-gray-300 pb-2">
              Education
            </h2>
            {data.education.map((edu, index) => (
              <div style={{
                color: colorList.textOne
              }} className="mt-4" key={index}>
                <div className="flex justify-between items-center mb-2">
                  <p className="font-bold text-md uppercase brBold">
                    {edu.degree}
                  </p>
                  <p className="text-sm">{edu.year}</p>
                </div>
                <p className="text-sm font-bold">{edu.school}</p>
                <p className="text-xs font-bold">{edu.more}</p>
              </div>
            ))}
          </div>

          {/* Employment Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold brBold uppercase border-b border-gray-300 pb-2">
              Employment
            </h2>
            {data.employment.map((job, index) => (
              <div
              style={{
                color: colorList.textOne
              }}
              className="mt-4" key={index}>
                <div className="flex justify-between items-center mb-2">
                  <p className="font-bold text-md uppercase brBold">
                    {job.title}
                  </p>
                  <p className="text-sm">{job.date}</p>
                </div>
                <p className="text-sm font-bold">{job.location}</p>
                <ul className="list-disc ml-4 text-sm space-y-1 mt-2">
                  {job.roles.map((role, i) => (
                    <li key={i}>
                      {role.length === 2 ? (
                        <>
                          <strong>{role[0]}</strong>
                          <p>{role[1]}</p>
                        </>
                      ) : (
                        role[0]
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Certificates Section */}
          {data.certificates.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-xl font-bold brBold uppercase border-b border-gray-300 pb-2">
              Certificates
            </h2>
            {data.certificates.map((cert, index) => (
              <div
                className="flex justify-between items-center mt-4"
                key={index}
              >
                <a
                  href={cert.link}
                  target="_blank"
                  className="text-md brBold text-blue-500 hover:underline"
                  rel="noopener noreferrer"
                >
                  {cert.name}
                </a>
                <p className="text-sm">{cert.date}</p>
              </div>
            ))}
          </div>
          ) : null}
        </div>

        {/* Sidebar */}
        <div
          id="main"
          className={`px-[1rem] border-l mt-4 ${
            page === 1 ? 'top-[185px]' : 'top-0'
          } bottom-0 col-span-3`}
          style={{
            backgroundColor: colorList.background
          }}
        >
          {page === 1 && data.skills && (
            <div>
              <h2 className="text-lg font-bold brBold uppercase border-b-2 border-gray-300 pb-2 text-gray-800">
                Skills
              </h2>
              <ul className="mt-1 space-y-4">
                {data.skills.map((skill, index) => (
                  <li key={index}>
                    <div className="flex justify-between text-sm mb-1 text-gray-800">
                      <span>{skill.name}</span>
                      <span>{skill.scale}%</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2.5">
                      <div
                        style={{
                          backgroundColor: colorList.foreground
                        }}
                        className={`h-2.5 rounded-full w-[${skill.scale}%]`}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages Section */}
          <div className="mt-6">
            <h2 className="text-lg font-bold brBold uppercase border-b-2 border-gray-300 pb-2 text-gray-800">
              Languages
            </h2>
            <ul className="mt-1 space-y-4">
              {data.languages.map((language, index) => (
                <li key={index}>
                  <div className="flex justify-between text-sm text-gray-800 mb-1">
                    <span>{language.name}</span>
                    <span>{language.scale}%</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2.5">
                    <div
                    style={{
                      backgroundColor: colorList.foreground
                    }}
                      className={`h-2.5 rounded-full w-[${language.scale}%]`}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Hobbies Section */}
          <div className="mt-6">
            <h2 className="text-lg font-bold brBold uppercase border-b-2 border-gray-300 pb-2 text-gray-800">
              Hobbies
            </h2>
            <ul className="list-disc mt-2 ml-4 space-y-4 text-sm">
              {data.hobbies.map((hobby, index) => (
                <li key={index} style={{
                  color: colorList.textOne
                }} className="mb-1 font-semibold">
                  {hobby}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TemplateThree
