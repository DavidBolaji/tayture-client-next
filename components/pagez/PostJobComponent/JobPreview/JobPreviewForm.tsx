'use client'
import { regularFont } from '@/assets/fonts/fonts'
import Button from '@/components/Button/Button'
import CounterInput from '@/components/Form/CounterInput/CounterInput'
import DateInput from '@/components/Form/DateInput/DateInput'
import JobRadioComponent from '@/components/Form/JobRadioComponent/JobRadioComponent'
import StyledInput from '@/components/Form/NomalInput/StyledInput'
import { SelectInput } from '@/components/Form/SelectInput/SelectInput'
import StyledTextarea from '@/components/Form/TextareaInput/StyledTextarea'
import { degree, expL } from '@/utils/data'
import { Field, Form, Formik } from 'formik'
import React, { FC, useEffect, useState } from 'react'
import { jobValidationSchema } from '../Schema/JobValidationSchema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { createJob } from '@/lib/api/job'
import { useRouter } from 'next/router'
import { useGlobalContext } from '@/Context/store'
import Spinner from '@/components/Spinner/Spinner'

dayjs.extend(utc)
dayjs().utcOffset('local')

const JobPreviewForm: FC<{ SW: any }> = ({ SW }) => {
  const queryClient = useQueryClient()

  const school = queryClient.getQueryData(['school']) as any
  const jobData = queryClient.getQueryData(['jobData']) as any
  const idz = queryClient.getQueryData(['schId'])

  const isArrayJson = ({ ...jobData }?.job_active as string)?.includes('[')
  const { setMessage, ui, setUI } = useGlobalContext()
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { [key: string]: any }) => {
      return await createJob({
        ...data,
      })
    },
    onSuccess: (res) => {
      const job = res.data.job
      if (ui.postLandingModal?.visibility) {
        setUI((prev) => ({
          ...prev,
          postLandingModal: {
            ...prev.postLandingModal,
            visibility: false,
          },
        }))
      }
      // setMessage(() => res.data.message)
      queryClient.invalidateQueries({
        queryKey: ['schoolJobs'],
      })
      queryClient.removeQueries({ queryKey: ['jobData'] })
      return router.push('/dashboard/school')
      // return school
    },
    onError: (err) => {
      setMessage(() => (err as Error).message)
    },
  })
  const handleSubmit = (values: any) => {
    mutate({ ...values, jobSchoolId: idz ?? school?.sch_id })
  }
  const goBack = () => {
    SW.prev()

    const time = setTimeout(() => {
      if (typeof document !== 'undefined') {
        const doc = document.querySelector('.ant-layout-content')
        doc?.scrollTo({
          behavior: 'smooth',
          top: 0,
        })
      }
      clearTimeout(time)
    }, 1500)
  }
  return (
    <Formik
      key={1}
      enableReinitialize
      validateOnMount={true}
      initialValues={{
        ...jobData,
        job_active: isArrayJson
          ? JSON.parse({ ...jobData }.job_active)
          : { ...jobData }?.job_active,
      }}
      onSubmit={() => {}}
      validationSchema={jobValidationSchema}
    >
      {({ values, isValid }) => (
        <Form className="">
          <div>
            <h3
              className={`mb-[24px] ml-1 text-[20px] text-black ${regularFont.className}`}
            >
              Role
            </h3>
            <Field
              name="job_role"
              as={JobRadioComponent}
              name2={'job_active'}
              SW={SW}
              defaultValue={values?.job_active}
              disabled
            />
          </div>
          <div>
            <h3 className="mb-[10px] ml-1 text-black">Job Title</h3>
            <Field
              name="job_title"
              as={StyledInput}
              placeholder="Subject"
              type={'text'}
              maxLength={30}
              disabled
            />
          </div>
          <div>
            <h3 className="mb-[10px] ml-1 text-black">
              Minimum educational qualification
            </h3>
            <Field
              name="job_qual"
              as={SelectInput}
              placeholder="Minimum educational qualification"
              text="Minimum educational qualification"
              option={degree}
              disabled
            />
          </div>
          <div>
            <h3 className="mb-[10px] ml-1 text-black">
              Minimum years of experience
            </h3>
            <Field
              name="job_exp"
              as={SelectInput}
              placeholder="Minimum years of experience"
              text="Minimum years of experience"
              option={expL}
              disabled
            />
          </div>
          <div className="mb-5">
            <h3 className={`mb-[16px] ml-1 ${regularFont.className}`}>
              Salary details
            </h3>
            <div
              className={`grid md:grid-cols-12 grid-cols-6 md:gap-5 ${
                values?.job_max_sal || values?.job_min_sal ? 'mt-8' : 'mt-0'
              }`}
            >
              <div className="col-span-6">
                <Field
                  name="job_min_sal"
                  as={StyledInput}
                  placeholder="Minimum amount"
                  type={'num'}
                  text={'Minimum amount'}
                  disabled
                />
              </div>
              <div className="col-span-6 mt-10 md:mt-0">
                <Field
                  name="job_max_sal"
                  as={StyledInput}
                  placeholder="Maximum amount"
                  type={'num'}
                  text={'Maximum amount'}
                  disabled
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-[10px] ml-1 text-black">
              When is the earliest resumption date for this role
            </h3>
            <Field
              name="job_resumption"
              as={DateInput}
              picker="date"
              placeholder="YYYY-MM-DD"
              disabled={true}
              defaultValue={dayjs(values.job_resumption, 'YYYY-MM-DD')}
            />
          </div>
          <div>
            <h3 className="mb-[10px] ml-1 text-black">
              How many hires do you need for this role ?
            </h3>
            <Field
              name="job_no_hires"
              as={CounterInput}
              type={'num'}
              preview={'true'}
              disabled
            />
          </div>
          <div>
            <h3 className="mb-[10px] ml-1 text-black">
              Other details (Optional)
            </h3>
            <Field
              name="job_desc"
              as={StyledTextarea}
              placeholder="You may share any other relevant information about this role or your school"
              rows={5}
              spellCheck="false"
              disabled
            />
          </div>
          <div className="flex justify-between pb-[100px]">
            <Button
              disabled={isPending}
              bold={false}
              hover={true}
              text={'Back'}
              render="light"
              onClick={goBack}
              type="button"
            />
            <Button
              disabled={isPending}
              bold={false}
              hover={true}
              text={isPending ? <Spinner /> : 'Publish'}
              render="light"
              onClick={() => handleSubmit(values)}
              type="button"
            />
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default JobPreviewForm
