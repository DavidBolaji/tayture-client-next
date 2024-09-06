'use client'
import { Field, Form, Formik } from 'formik'
import React, { FC, useRef, useState } from 'react'
import { SelectInput } from '../../Form/SelectInput/SelectInput'
import { regularFont } from '@/assets/fonts/fonts'
import { degree, expL } from '@/utils/data'
import CVComponent from '../../CVComponent'
import { checkFileExtension, handleUpload } from '@/utils/helpers'
import { useGlobalContext } from '@/Context/store'
import Spinner from '../../Spinner/Spinner'
import { ApplyFormSchema } from './ApplyFormSchema'
import Button from '../../Button/Button'
import { useQueryClient } from '@tanstack/react-query'
import { Profile, User } from '@prisma/client'
import { LuAsterisk } from 'react-icons/lu'
import LocationComponent from '@/components/Form/LocationComponent/LocationComponent'

const ApplyModalForm: FC<{ SW: any }> = ({ SW }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const queryClient = useQueryClient()
  const { setMessage, setCount } = useGlobalContext()

  const user = queryClient.getQueryData(['user']) as User & { profile: Profile }

  const handleNext = (data: { exp: string; qual: string; cv: string }) => {
    queryClient.setQueryData(['jobApplication'], () => data)
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
          cv: user.profile.cv ?? '',
          qual: '',
          exp: '',
          country: user.profile.country ?? '',
          state: user.profile.state ?? '',
          city: user.profile.city ?? '',
          lga: user.profile.lga ?? '',
        }}
        onSubmit={() => {}}
      >
        {({ values, setFieldValue, isValid }) => (
          <Form className="w-full">
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
            <LocationComponent
              country="country"
              state="state"
              city="city"
              lga="lga"
            />
            <label className="mb-2 inline-block text-sm md:text-[20px] ml-1">
              <div className="flex gap-1">
                <span>Curriculum Vitae</span>
                <LuAsterisk size={12} className="mt-0.5" color="red" />
              </div>
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
              onChange={(e) =>
                handleUpload(e, setFieldValue, setMessage, setLoading)
              }
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
