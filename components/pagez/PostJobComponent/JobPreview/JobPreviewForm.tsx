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
import React, { FC } from 'react'
import { jobValidationSchema } from '../Schema/JobValidationSchema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { createJob } from '@/lib/api/job'
import { useRouter } from 'next/router'
import { useGlobalContext } from '@/Context/store'
import Spinner from '@/components/Spinner/Spinner'
import { Axios } from '@/request/request'
import { sleep } from '@/utils/helpers'
import { Job } from '@prisma/client'

dayjs.extend(utc)
dayjs().utcOffset('local')

const text = `You have successfully posted a vacancy. All our users have been notified. You can also copy and share the link to the job on your social media handles`

const JobPreviewForm: FC<{ SW: any }> = ({ SW }) => {
  const queryClient = useQueryClient()

  const school = queryClient.getQueryData(['school']) as any
  const jobData = queryClient.getQueryData(['jobData']) as any
  const editJob = queryClient.getQueryData(['edit_job']) as Job
  const idz = queryClient.getQueryData(['schId'])
  const params = useRouter()
  const isDuplicate = params.query?.duplicate
  const isEdit = params.query?.edit

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
        queryKey: ['schoolJobs', 'notifications'],
      })
      queryClient.removeQueries({ queryKey: ['jobData'] })

      router.push('/dashboard/school')

      return setMessage(() =>
        res.data.message === text
          ? res.data.message + ' link ()'
          : res.data.message,
      )
    },
    onError: (err) => {
      setMessage(() => (err as Error).message)
      const t = setTimeout(() => {
        setMessage(() => '')
      }, 2000)
    },
  })

  const { mutate: updateJob, isPending: jobPending } = useMutation({
    mutationFn: async (data: { [key: string]: any }) => {
      return await Axios.put(`/job/update/${editJob.job_id}`, data)
    },
    onSuccess: async () => {
      setMessage(() => 'Job updated succesfully')
      await sleep(3000)
      router.push('/dashboard/school')
    },
    onError: async (err) => {
      setMessage(() => (err as Error).message)
      await sleep(2000)
      setMessage(() => '')
    },
  })

  const handleSubmit = (values: any) => {
    if (isEdit) {
      updateJob({ ...values, jobSchoolId: idz ?? school?.sch_id })
    } else {
      mutate({ ...values, jobSchoolId: idz ?? school?.sch_id })
    }
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
        <Form className="w-full">
          <div>
            <div className="text-xs w-full text-center mb-2 italic">
              Note: Posted jobs cannot be edited. Please review before posting.
            </div>
            <Field
              name="job_role"
              as={JobRadioComponent}
              name2={'job_active'}
              SW={SW}
              defaultValue={values?.job_active}
              disabled
            />
          </div>
          <div className="-space-y-4">
            <div>
              <h3 className="mb-[10px] ml-1 text-black">Job Title</h3>
              <Field
                name="job_title"
                as={StyledInput}
                placeholder="Job title"
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
                <div className="col-span-6 md:mt-0">
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
                When is the application deadline for this role
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
                placeholder="What else would like applicants to know about this vacancy and/or your school?"
                rows={5}
                spellCheck="false"
                disabled
              />
            </div>
          </div>
          <div className="flex justify-between pb-[100px]">
            <Button
              disabled={isPending || jobPending}
              bold={false}
              hover={true}
              text={'Edit'}
              render="light"
              onClick={goBack}
              type="button"
            />
            <Button
              disabled={isPending || jobPending}
              bold={false}
              hover={true}
              text={
                isPending ? (
                  <Spinner />
                ) : isDuplicate ? (
                  'Duplicate Job'
                ) : isEdit ? (
                  'Update Job'
                ) : (
                  'Post Job'
                )
              }
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
