'use client'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import NameComponent from '../CVform/NameComponent'
import { boldFont } from '@/assets/fonts/fonts'
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md'
import Skills from '../CVform/Skills'

import { SortableContext } from '@dnd-kit/sortable'
import { Row } from '../CVform/DragableSection'
import { useOrder } from '@/hooks/useOrder'
import { DndContext } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { useGlobalContext } from '@/Context/store'
import { useQueryClient } from '@tanstack/react-query'
import { Modal } from 'antd'
import CVTemplatePreview from '../../components2/cvtemplates/CVTemplatePreview'
import { FaDownload } from 'react-icons/fa'
import { Axios } from '@/request/request'
import { useRouter } from 'next/router'

interface Props {
  initialValues: any
  onSubmit: () => void
}

const CVTemplateOne = ({ hide }: { hide?: boolean }) => {
  const { dataSource, onDragEnd, init } = useOrder()
  const { colorList } = useGlobalContext()
  const queryClient = useQueryClient()
  const [show, setShow] = useState(false)
  const { setCount } = useGlobalContext()
  const data = queryClient.getQueryData(['cvData']) as any
  const order = queryClient.getQueryData(['sectionOrder']) as string[]
  const router = useRouter()


  const downloadCv = async () => {
    try {
        const response = await Axios.post('/pdf', { data, colorList }, {responseType: 'arraybuffer'});
        const reader = new FileReader();
        reader.onload = function () {
            const url = reader.result;
            const a = document.createElement('a') as any;
            a.href = url;
            a.download = 'generated_pdf.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };
        reader.readAsDataURL(new Blob([response.data], { type: 'application/pdf' }));
        setShow(false);
    } catch (error) {
        console.error('Error downloading PDF:', error);
    }
}

  const handleClick = (values: any) => {
    const fVal = values
    const order = dataSource.map((e) => e.section.type.name)
    queryClient.setQueryData(['cvData'], fVal)
    queryClient.setQueryData(['sectionOrder'], order)
    const t = setTimeout(() => {
      setShow(true)
      setCount((prev) => prev + 1)
    }, 300)
  }

  return (
    <>
      <Formik
        enableReinitialize
        key={init.history.length}
        initialValues={init}
        onSubmit={() => {}}
      >
        {({ values }) => (
          <Form className="w-full grid grid-cols-10  max-w-[742px] mb-48 border rounded-md shadow-lg">
            <div
              style={{
                backgroundColor: colorList.foreground,
              }}
              className={`col-span-7 p-5`}
            >
              <Field
                as={NameComponent}
                defaultValue={values.name}
                name="name"
                className="text-sm sm:text-md md:text-4xl lg:text-5xl font-bold uppercase"
                st={{
                  color: colorList.background,
                }}
              />
              <hr
                className="border-1.5 my-2"
                style={{
                  borderColor: colorList.background,
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
              <Field
                as={NameComponent}
                defaultValue={values.summary}
                name="summary"
                className="text-xs md:text-sm font-light"
                st={{
                  color: colorList.colorParagraph,
                }}
              />

              <div>
                <DndContext
                  modifiers={[restrictToVerticalAxis]}
                  onDragEnd={onDragEnd}
                >
                  <SortableContext items={dataSource.map((item) => item.key)}>
                    {dataSource.map((item) => (
                      <Row key={item.key} data-row-key={item.key}>
                        {item.section}
                      </Row>
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
            </div>
            <div
              className="col-span-3 items-center px-5 pt-10 space-y-4"
              style={{
                backgroundColor: colorList.background,
              }}
            >
              <div className="flex gap-3">
                <div
                  className="flex items-center w-7 h-6 justify-center rounded-full"
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
                <Field
                  as={NameComponent}
                  defaultValue={values.location}
                  name="location"
                  className="text-[10px]"
                  st={{
                    color: colorList.textOne,
                  }}
                />
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
                <Field
                  as={NameComponent}
                  defaultValue={values.number}
                  name="number"
                  className="text-[12px] background] mt-0.5"
                  st={{
                    color: colorList.textOne,
                  }}
                />
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
                <Field
                  as={NameComponent}
                  defaultValue={values.email}
                  name="email"
                  className="text-[10px] mt-0.5 bg-[#102a73] text-white"
                  st={{
                    color: colorList.textOne,
                  }}
                />
              </div>
              <Skills skills={values.skills} />
            </div>
            <button
              type="button"
              onClick={() => handleClick(values)}
              className="text-md border px-2 py-1 rounded-md absolute -translate-y-10 transition-all duration-300 hover:scale-105 hover:bg-orange "
            >
              Preview
            </button>
          </Form>
        )}
      </Formik>
      <Modal
        open={show}
        onCancel={() => setShow(false)}
        footer={null}
        width={800}
      >
        <div className="flex">
          <div className="pr-14">
            <CVTemplatePreview />
          </div>
          <button
            type="button"
            className="absolute top-6 right-14"
            onClick={downloadCv}
          >
            <FaDownload color="#000000" />
          </button>
        </div>
      </Modal>
    </>
  )
}

export default CVTemplateOne
