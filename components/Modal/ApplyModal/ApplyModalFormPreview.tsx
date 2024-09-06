'use client'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import React, { FC } from 'react'
import { SelectInput } from '../../Form/SelectInput/SelectInput'
import { regularFont } from '@/assets/fonts/fonts'
import { degree, expL } from '@/utils/data'
import CVComponent from '../../CVComponent'
import { appliedSucces, checkFileExtension } from '@/utils/helpers'
import { useGlobalContext } from '@/Context/store'
import Spinner from '../../Spinner/Spinner'
import { ApplyFormSchema } from './ApplyFormSchema'
import Button from '../../Button/Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createApplication } from '@/lib/api/apply'
import { IJobSchDb } from '@/pages/api/job/types'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'
import { updateProfile } from '@/lib/api/job'
import LocationComponent from '@/components/Form/LocationComponent/LocationComponent'
type UserApply = {
  cv: string
  exp: string
  qual: string
  country: string
  state: string
  city: string
  lga: string
}
const ApplyModalFormPreview: FC<{ SW: any }> = ({ SW }) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const pathname = usePathname()
  const { setMessage, setUI } = useGlobalContext()

  const initialValues = queryClient.getQueryData([
    'jobApplication',
  ]) as UserApply
  const activeJob = queryClient.getQueryData(['activeJob']) as IJobSchDb
  const isRelated = queryClient.getQueryData(['isRelated'])
  const relatedJob = queryClient.getQueryData(['relatedJob']) as IJobSchDb

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UserApply) => {
      return await createApplication({
        ...data,
        schoolId: activeJob.school.sch_id,
        jobId: isRelated ? relatedJob.job_id : activeJob.job_id,
      })
    },
    onSuccess: async (res) =>
      appliedSucces(res, pathname, setUI, setMessage, router, queryClient, SW),
    onError: (err) => {
      setMessage(() => (err as Error).message)
    },
  })

  const { mutate: update, isPending: CVpending } = useMutation({
    mutationKey: ['profile-update'],
    mutationFn: updateProfile,
  })

  const handleNext = async (
    values: UserApply,
    { resetForm }: FormikHelpers<UserApply>,
  ) => {
    mutate({ ...values })
    update({
      country: values.country,
      state: values.state,
      cv: values.cv,
      lga: values.lga.length ? values.lga : undefined,
      city: values.city.length ? values.city : undefined
    })

    resetForm({
      values: {
        cv: '',
        qual: '',
        exp: '',
        country: '',
        state: '',
        lga: '',
        city: ''
      },
    })
  }

  return (
    <div className={`w-full ${regularFont.className}`}>
      <h2 className="text-center text-[24px] mb-[40px] text-black">
        Application
      </h2>
      <Formik
        enableReinitialize={true}
        key={SW?.current}
        validationSchema={ApplyFormSchema}
        initialValues={initialValues}
        onSubmit={handleNext}
      >
        {({ values, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <label className="mb-2 inline-block text-sm md:text-[20px] ml-1">
              Educational qualification
            </label>
            <Field
              name="qual"
              option={degree}
              as={SelectInput}
              disabled
              placeholder={'Your highest degree or certification'}
            />
            <label className="mb-2 inline-block text-sm md:text-[20px] ml-1">
              Work experience
            </label>
            <Field
              name="exp"
              option={expL}
              as={SelectInput}
              disabled
              placeholder={'How many years have you worked ?'}
            />
            <LocationComponent
              country="country"
              state="state"
              city="city"
              lga="lga"
              disabled
            />

            {values?.cv && (
              <>
                <label className="mb-2 inline-block text-sm md:text-[20px] ml-1">
                  Curriculum Vitae
                </label>

                <div className="mb-3">
                  <CVComponent
                    ext={checkFileExtension(values.cv)}
                    onClick={() => window.location.assign(values.cv)}
                    name={values.cv.split('/')[values.cv.split('/').length - 1]}
                  />
                </div>
              </>
            )}

            <div className="pt-10 pb-20 text-center justify-between flex">
              <Button
                disabled={isPending}
                transparent={true}
                type="button"
                text={<span className="text-black">Edit</span>}
                bold={false}
                render="dark"
                onClick={() => (isPending ? {} : SW.prev())}
              />
              <Button
                disabled={isSubmitting || isPending || CVpending}
                type="submit"
                text={
                  isSubmitting || isPending || CVpending ? (
                    <Spinner color="#fff" />
                  ) : (
                    'Submit'
                  )
                }
                bold={false}
                render="light"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ApplyModalFormPreview
