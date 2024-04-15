'use client'
import { Field, Form, Formik } from 'formik'
import React, { ChangeEvent, FC, useRef, useState } from 'react'
import { SelectInput } from '../../Form/SelectInput/SelectInput'
import { regularFont } from '@/assets/fonts/fonts'
import { degree, expL } from '@/utils/data'
import CVComponent from '../../CVComponent'
import { checkFileExtension } from '@/utils/helpers'
import Cloudinary from '@/request/cloudinary'
import { useGlobalContext } from '@/Context/store'
import Spinner from '../../Spinner/Spinner'
import { ApplyFormSchema } from './ApplyFormSchema'
import Button from '../../Button/Button'
import { useQueryClient } from '@tanstack/react-query'
const isAllowedFileType = (fileType: string) =>
  [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ].includes(fileType)

const ApplyModalForm: FC<{ SW: any }> = ({ SW }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const queryClient = useQueryClient()
  const { setMessage, setCount } = useGlobalContext()

  const handleUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    fn: (name: string, val: any) => void,
  ) => {
    const inputElement = e.target
    const files = inputElement.files

    if (files && files.length > 0) {
      const selectedFile = files[0]

      if (!isAllowedFileType(files[0].type))
        return setMessage(
          () => 'Invalid file type. Please upload a PDF, DOC, or DOCX file.',
        )

      const isLt2M = files[0].size / 1024 / 1024 < 2
      if (!isLt2M) return setMessage(() => 'Image must be smaller than 2MB!')
      setLoading(true)

      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append(
        'upload_preset',
        `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`,
      )

      try {
        const response = await Cloudinary.post('/auto/upload', formData)
        const { secure_url } = response.data
        fn('cv', secure_url)
      } catch (error: any) {
        setMessage(() => `Error uploading banner: ${error.message}`)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleNext = (data: { exp: string; qual: string; cv: string }) => {
    queryClient.setQueryData(['jobApplication'], data)
    setCount((prev) => prev + 1)
    SW.next()
  }
  return (
    <div className={`w-full ${regularFont.className}`}>
      <h2 className="text-center text-[24px] mb-[40px] text-black">
        Application
      </h2>
      <Formik
        validateOnMount={true}
        validationSchema={ApplyFormSchema}
        initialValues={{
          cv: '',
          qual: '',
          exp: '',
        }}
        onSubmit={() => {}}
      >
        {({ values, setFieldValue, isValid }) => (
          <Form className='w-full'>
            <label className="mb-2 inline-block text-sm md:text-[20px] ml-1">
              Educational qualification
            </label>
            <Field
              name="qual"
              option={degree}
              as={SelectInput}
              placeholder={'Your highest degree or certification'}
            />
            <label className="mb-2 inline-block text-sm md:text-[20px] ml-1">
              Work experience
            </label>
            <Field
              name="exp"
              option={expL}
              as={SelectInput}
              placeholder={'How many years have you worked ?'}
            />
            <label className="mb-2 inline-block text-sm md:text-[20px] ml-1">
              Curriculum Vitae
            </label>
            {loading && (
              <div className="mb-3 flex items-center justify-center">
                <Spinner color="#ff7617" />
              </div>
            )}
            {values?.cv && !loading && (
              <div className="mb-3">
                <CVComponent
                  ext={checkFileExtension(values.cv)}
                  onClick={() => window.location.assign(values.cv)}
                  name={values.cv.split('/')[values.cv.split('/').length - 1]}
                />
              </div>
            )}
            <button
              type="button"
              className="bg-transparent border text-orange border-orange rounded-full text-[14px] px-6 py-1 block"
              onClick={() => inputRef.current?.click()}
            >
              {values.cv ? 'Replace' : 'Upload'}
            </button>
            <small className="text-ash_400 ml-2 mt-2 inline-block ">
              DOC, PDF (2mb)
            </small>
            <input
              type="file"
              className="hidden"
              ref={inputRef}
              accept=".pdf, .doc, .docx"
              onChange={(e) => handleUpload(e, setFieldValue)}
            />
            <div className="pt-10 pb-20 text-center">
              <Button
                disabled={!isValid}
                text={'Next'}
                bold={false}
                render="light"
                onClick={() => handleNext(values)}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ApplyModalForm
