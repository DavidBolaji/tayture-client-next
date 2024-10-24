'use client'
import { regularFont } from '@/assets/fonts/fonts'
import CounterInput from '@/components/Form/CounterInput/CounterInput'
import DateInput from '@/components/Form/DateInput/DateInput'
import StyledInput from '@/components/Form/NomalInput/StyledInput'
import { SelectInput } from '@/components/Form/SelectInput/SelectInput'
import StyledTextarea from '@/components/Form/TextareaInput/StyledTextarea'
import { degree, expL } from '@/utils/data'
import { Field, Form, Formik } from 'formik'

import React from 'react'
import { jobValidationSchema } from '../Schema/JobValidationSchema'
import Button from '@/components/Button/Button'
import JobRadioComponent from '@/components/Form/JobRadioComponent/JobRadioComponent'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Job } from '@prisma/client'
dayjs.extend(utc)
dayjs().utcOffset('local')

const JobOverviewForm: React.FC<{ SW: any }> = ({ SW }) => {
  const queryClient = useQueryClient()
  const {data: job} = useQuery({
    queryKey: ['edit_job'],
    queryFn: () => {
      return queryClient.getQueryData(['edit_job']) as Job
    }
  })
  const handleSubmit = (values: any) => {
    SW.next()

    // setJobData(() => values);
    queryClient.setQueryData(['jobData'], values)
    const time = setTimeout(() => {
      if (typeof document !== 'undefined') {
        const doc = document.querySelector('.ant-layout-content')
        document.getElementById('jobPreview')?.scrollIntoView({
          behavior: 'smooth',
        })
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
      validateOnMount={true}
      initialValues={{
        job_title: job?.job_title ?? '',
        job_role: job?.job_role ?? '',
        job_active: job?.job_active ?? '',
        job_exp: job?.job_exp ??  '',
        job_qual: job?.job_qual ?? '',
        job_desc: job?.job_desc ?? '',
        job_min_sal: job?.job_min_sal ?? '',
        job_max_sal: job?.job_max_sal ?? '',
        job_resumption: dayjs(job?.job_resumption).isValid() ?  dayjs(job?.job_resumption, 'YYYY-MM-DD') : '',
        job_no_hires: job?.job_no_hires ?? '1',
      }}
      onSubmit={() => {}}
      validationSchema={jobValidationSchema}
      enableReinitialize
      key={0}
    >
      {({ values, isValid }) => (
        <Form className="mt-[20px] pb-[100px] w-full">
          <div>
            <h3
              className={`mb-[14px] ml-1 text-[20px] text-center text-black ${regularFont.className}`}
            >
              Select Teacher or Administrator?
            </h3>
            <Field
              name="job_role"
              as={JobRadioComponent}
              name2={'job_active'}
            />
          </div>
          <div className='-space-y-4'>
            <div>
              <h3 className="mb-[10px] ml-1 text-black">Job Title</h3>
              <Field
                name="job_title"
                as={StyledInput}
                placeholder="Job title"
                type={'text'}
                maxLength={30}
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
              />
            </div>
            <div className="mb-5">
              <h3 className={`mb-[30px] ml-1 ${regularFont.className}`}>
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
                  />
                </div>
                <div className="col-span-6 md:mt-0">
                  <Field
                    name="job_max_sal"
                    as={StyledInput}
                    placeholder="Maximum amount"
                    type={'num'}
                    text={'Maximum amount'}
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-[10px] ml-1 text-black">
                Application deadline
              </h3>
              <Field
                name="job_resumption"
                as={DateInput}
                picker="date"
                placeholder="MM/DD/YYYY"
                minDate={dayjs(new Date(Date.now()).toISOString(), 'YYYY-MM-DD')}
                defaultValue={dayjs(job?.job_resumption).isValid() ?  dayjs(job?.job_resumption, 'YYYY-MM-DD'): undefined}
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
              />
            </div>
          </div>
          <div className="text-center">
            <Button
              disabled={!isValid}
              bold={false}
              hover={isValid}
              text={'Preview'}
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

export default JobOverviewForm
