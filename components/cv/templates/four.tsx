import React from 'react'
import { ColorList, IProfile } from '../PreviewComponent'
import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa'
import { FaLocationPin } from 'react-icons/fa6'
import { TbWorldWww } from 'react-icons/tb'

const TemplateFour: React.FC<{
  data: IProfile
  colorList: ColorList
  email: string
  page?: number
}> = ({ data, colorList, page = 1 }) => {
  return (
    <div
      style={{
        backgroundColor: colorList.background,
      }}
      className={`text-gray-900 w-[640px] border`}
    >
      <div className=" mx-auto p-2">
        {/* Header */}
        <div className="flex gap-5 items-end">
          <div
            style={{
              backgroundColor: colorList.foreground,
              color: colorList.textOne,
            }}
            className={`flex items-end justify-end h-28 w-32 text-4xl p-2 tracking-wider font-bold`}
          >
            {data.name.split(' ')[0][0].toUpperCase()}
            {data.name.split(' ')[1][0].toUpperCase()}
          </div>
          <div className="flex flex-col">
            <h1
              style={{
                color: colorList.foreground,
              }}
              className={`md:text-2xl font-semibold uppercase tracking-[0.6rem]`}
            >
              {data.name}
            </h1>
            {(data.linkedIn || data.github || data.web) && (
              <div className="flex flex-wrap gap-4 pl-1">
                {data.github && (
                  <div className="flex gap-1 items-center">
                    <div>
                      <FaGithub color={colorList.foreground} />
                    </div>
                    <div
                      style={{
                        color: colorList.foreground,
                      }}
                      className={`md:text-xs text-[10px]`}
                    >
                      {data.github}
                    </div>
                  </div>
                )}
                {data.web && (
                  <div className="flex gap-1 items-center">
                    <div>
                      <TbWorldWww color={colorList.foreground} />
                    </div>
                    <div
                      style={{
                        color: colorList.foreground,
                      }}
                      className={`md:text-xs text-[10px]`}
                    >
                      {data.web}
                    </div>
                  </div>
                )}
                {data.linkedIn && (
                  <div className="flex gap-1 items-center">
                    <div>
                      <FaLinkedin color={colorList.foreground} />
                    </div>
                    <div
                      style={{
                        color: colorList.foreground,
                      }}
                      className={`md:text-xs text-[10px]`}
                    >
                      {data.linkedIn}
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="flex flex-wrap gap-4 pl-1">
              <div className="flex gap-1 items-center">
                <div>
                  <FaEnvelope color={colorList.foreground} />
                </div>
                <div
                  style={{
                    color: colorList.foreground,
                  }}
                  className={`md:text-xs text-[10px]`}
                >
                  {data.email}
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <div>
                  <FaPhone color={colorList.foreground} />
                </div>
                <div
                  style={{
                    color: colorList.foreground,
                  }}
                  className={`md:text-xs text-[10px]`}
                >
                  {data.phone}
                </div>
              </div>
              {data.location && (
                <div className="flex gap-1 items-center -mt-3 -ml-0.5">
                  <div>
                    <FaLocationPin color={colorList.foreground} />
                  </div>
                  <div
                    style={{
                      color: colorList.foreground,
                    }}
                    className={`md:text-xs text-[10px]`}
                  >
                    {data.location}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <section className="my-8">
          <h2 className="text-xl font-bold text-blue-600 mb-2 pb-1 border-b-2 border-[#ededed]">
            PROFESSIONAL SUMMARY
          </h2>
          <p
            style={{
              color: colorList.textOne,
            }}
            className=" font-semibold text-[14px]"
          >
            {data.summary}
          </p>
        </section>

        {/* Skills */}
        <section className="my-8">
          <h2 className="text-xl font-bold text-blue-600 mb-2 border-b-2 border-[#ededed]">
            SKILLS
          </h2>
          <ul className="grid grid-cols-2 gap-4 list-disc list-inside text-[14px] font-semibold">
            {data.skills.map((skill, index) => (
              <li
                style={{
                  color: colorList.textOne,
                }}
                key={index}
              >
                {skill.name}
              </li>
            ))}
          </ul>
        </section>

        {/* Experience */}
        <section className="my-8">
          <h2 className="text-xl font-bold text-blue-600 mb-2 border-b-2 border-[#ededed]">
            WORK EXPERIENCE
          </h2>
          {data.employment.map((job, index) => (
            <div key={index} className="mt-4">
              <div
                style={{
                  backgroundColor: colorList.colorParagraph,
                }}
                className="flex justify-between items-center bg-[#ededed] p-2"
              >
                <p
                  style={{
                    color: colorList.textOne,
                  }}
                  className="font-bold text-md uppercase brBold"
                >
                  {job.title}
                </p>
                <p
                  className="text-xs"
                  style={{
                    color: colorList.textOne,
                  }}
                >
                  {job.date}
                </p>
              </div>
              <p
                style={{
                  color: colorList.textOne,
                }}
                className="text-sm font-bold pl-2 pt-1"
              >
                {job.location}
              </p>
              <ul className="list-disc ml-4 text-sm space-y-1 mt-2 p-2">
                {job.roles.map((role, roleIndex) => (
                  <li
                    style={{
                      color: colorList.textOne,
                    }}
                    key={roleIndex}
                  >
                    {role.length === 2 ? (
                      <>
                        <strong className="text-sm">{role[0]}</strong>
                        <p className="font-semibold text-xs leading-loose">
                          {role[1]}
                        </p>
                      </>
                    ) : (
                      <>{role[0]}</>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="my-8">
          <h2 className="text-xl font-bold text-blue-600 mb-2 border-b-2 border-[#ededed]">
            EDUCATION
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <p
                  style={{
                    color: colorList.textOne,
                  }}
                  className="font-bold text-md uppercase brBold"
                >
                  {edu.degree}
                </p>
                <p
                  style={{
                    color: colorList.textOne,
                  }}
                  className="text-xs"
                >
                  {edu.year}
                </p>
              </div>
              <p
                style={{
                  color: colorList.textOne,
                }}
                className="text-sm font-bold"
              >
                {edu.school}
              </p>
              <p
                style={{
                  color: colorList.textOne,
                }}
                className="text-xs font-bold"
              >
                {edu.more}
              </p>
            </div>
          ))}
        </section>

        {/* Certificate */}
        {data.certificates.length > 0 ? (
          <section className="my-8">
            <h2 className="text-xl font-bold text-blue-600 mb-2 border-b-2 border-[#ededed]">
              CERTIFICATES
            </h2>
            {data.certificates.map((cert, index) => (
              <div
                key={index}
                className="flex justify-between items-center mt-4"
              >
                <div>
                  <p className="text-md brBold">{cert.issuer}</p>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-md brBold text-blue-500 hover:underline"
                  >
                    {cert.name}
                  </a>
                </div>
                <p className="text-sm">{cert.date}</p>
              </div>
            ))}
          </section>
        ) : null}
      </div>
    </div>
  )
}

export default TemplateFour
