import React from 'react'
import { ColorList, IProfile } from '../PreviewComponent'
import { FaLocationPin } from 'react-icons/fa6'
import { FaEnvelope, FaPhone } from 'react-icons/fa'

const TemplateOne: React.FC<{
  data: IProfile
  colorList: ColorList
  email: string
  page?: number
}> = ({ data, colorList, page = 1 }) => {
  return (
    <div className="">
      <div className="grid grid-cols-12 border w-[640px]">
        <div
          className="col-span-9 p-3"
          style={{ backgroundColor: colorList.foreground }}
        >
          <div
            className="font-brBold mb-10 whitespace-pre-line font-bold text-5xl border-b-2"
            style={{
              color: colorList.background,
              borderBottomColor: colorList.background,
              textTransform: 'uppercase',
              fontSize: '40px',
              lineHeight: '45px',
            }}
          >
            {data.name.split(' ').slice(0, -1).join(' ')}
            <br />
            {data.name.split(' ').slice(-1)}
          </div>

          <h2
            className="text-xl uppercase br-bold border-b-2"
            style={{
              color: colorList.background,
              borderBottomColor: colorList.background,
              marginBottom: '0.5rem',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            Professional Summary
          </h2>

          <div
            className="text-xs md:text-sm font-light br mb-10"
            style={{ color: colorList.colorParagraph }}
          >
            {data.summary}
          </div>

          <div className="mb-10">
            <h2
              className="mb-1 text-xl border-b-2"
              style={{
                color: colorList.background,
                borderBottomColor: colorList.background,
                fontSize: '1.5rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              Work History
            </h2>

            {data.employment.map((d, i) => (
              <div className="mb-5" key={i}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <p
                    className="br-bold text-md uppercase -mb-1"
                    style={{
                      maxWidth: '300px',
                      fontWeight: 700,
                      color: colorList.colorParagraph,
                    }}
                  >
                    {d.title}
                  </p>
                  <p
                    className="text-sm capitalize"
                    style={{ color: colorList.colorParagraph }}
                  >
                    {d.date}
                  </p>
                </div>
                <p
                  className="br text-sm capitalize mb-1"
                  style={{ fontWeight: 700, color: colorList.colorParagraph }}
                >
                  {d.location}
                </p>
                <ul className="list-disc ml-4">
                  {d.roles.map((k, i) => (
                    <li
                      key={i}
                      className="br text-xs"
                      style={{ color: colorList.colorParagraph }}
                    >
                      {k[0]}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h2
              className="text-xl border-b-2"
              style={{
                color: colorList.background,
                borderBottomColor: colorList.background,
                fontSize: '1.5rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              Education
            </h2>

            {data.education.map((d, i) => (
              <div className="mb-5" key={i}>
                <div
                  className="-mb-1"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <p
                    className="br-bold text-md uppercase"
                    style={{
                      maxWidth: '300px',
                      fontWeight: 700,
                      color: colorList.colorParagraph,
                    }}
                  >
                    {d.degree}
                  </p>
                  <p
                    className="text-sm capitalize"
                    style={{ color: colorList.colorParagraph }}
                  >
                    {d.year}
                  </p>
                </div>
                <p
                  className="br text-sm capitalize"
                  style={{ fontWeight: 700, color: colorList.colorParagraph }}
                >
                  {d.school}
                </p>
              </div>
            ))}
          </div>

          {data.certificates.length > 0 ? (
            <div>
              <h2
                className="text-xl border-b-2"
                style={{
                  color: colorList.background,
                  borderBottomColor: colorList.background,
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}
              >
                Certificates
              </h2>

              {data.certificates.map((d, i) => (
                <div className="mb-5" key={i}>
                  <div
                    className="-mb-1"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      className="br-bold text-md uppercase"
                      style={{
                        maxWidth: '300px',
                        fontWeight: 700,
                        color: colorList.colorParagraph,
                      }}
                    >
                      <p>{d.issuer}</p>
                      <a
                        className="text-md font-thin capitalize text-blue-500 hover:underline"
                        href={d.link}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {d.name}
                      </a>
                    </div>
                    <p
                      className="text-sm "
                      style={{ color: colorList.colorParagraph }}
                    >
                      {d.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div
          id="main"
          className="px-5 pt-[2.5rem] col-span-3 "
          style={{ backgroundColor: colorList.background }}
        >
          {page === 1 && (
            <>
              <div className="space-y-3">
                <div
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'center',
                  }}
                >
                  <FaLocationPin color={colorList.textOne} />
                  <div style={{ fontSize: '10px', color: colorList.textOne }}>
                    {data.location}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'center',
                  }}
                >
                  {/* <div
                    className='w-8 h-8 rounded-full flex items-center justify-center'
                    style={{
                      backgroundColor: colorList.textOne
                    }}
                  >
                    <i
                      className="fa fa-phone"
                      style={{ color: colorList.background }}
                    ></i>
                  </div> */}
                  <FaPhone color={colorList.textOne} />
                  <div style={{ fontSize: '10px', color: colorList.textOne }}>
                    {data.phone}
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-6">
                  <FaEnvelope className="mt-2" color={colorList.textOne} />
                  <div
                    className=" col-span-5"
                    style={{ fontSize: '10px', color: colorList.textOne }}
                  >
                    {data.email}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.25rem' }} className="w-full">
                <h2
                  className="mb-2 border-b-2"
                  style={{
                    color: colorList.textOne,
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    borderBottomColor: colorList.textOne,
                  }}
                >
                  Skills
                </h2>
                <ul
                  className="space-y-1 list-disc ml-4"
                  style={{ fontSize: '12px', color: colorList.textOne }}
                >
                  {data.skills.map((r, i) => (
                    <li key={i}>{r.name}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default TemplateOne
