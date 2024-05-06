'use client'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import React, { FC } from 'react'
import { SelectInput } from '../../Form/SelectInput/SelectInput'
import { regularFont } from '@/assets/fonts/fonts'
import { degree, expL } from '@/utils/data'
import CVComponent from '../../CVComponent'
import { checkFileExtension } from '@/utils/helpers'
import { useGlobalContext } from '@/Context/store'
import Spinner from '../../Spinner/Spinner'
import { ApplyFormSchema } from './ApplyFormSchema'
import Button from '../../Button/Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createApplication } from '@/lib/api/apply'
import { IJobSchDb } from '@/pages/api/job/types'
import { getUser } from '@/lib/api/user'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'
type UserApply = {
  cv: string
  exp: string
  qual: string
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
  
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UserApply) => {
      return await createApplication({
        ...data,
        schoolId: activeJob.school.sch_id,
        jobId: activeJob.job_id,
      })
    },
    onSuccess: async (res) => {
      const applied = res.data.applied
      if (pathname === '/jobs') {
        setUI((prev) => {
          return {
            ...prev,
            applyLandingModal: {
              ...prev.applyLandingModal,
              visibility: false,
            },
          }
        })
        setMessage(() => res.data.message)
        const t = setTimeout(() => {
          router.push('/dashboard')
          clearTimeout(t)
        }, 3000)
      } else {

        setUI((prev) => {
          return {
            ...prev,
            applyModal: {
              ...prev.applyModal,
              visibility: false,
            },
          }
        })
        setMessage(() => res.data.message)
 
        const req = await getUser()
        queryClient.setQueryData(['user'], () => req.data.user)
        queryClient.invalidateQueries({
          queryKey: ['user', 'jobs', 'school'],
        })
        
        const t = setTimeout(() => {
          clearTimeout(t)
          SW.prev()
        }, 3000)
        
        if (router.query.job === '1') {
          router.replace('/dashboard/jobs')
        }
      }

      return applied
    },
    onError: (err) => {
      setMessage(() => (err as Error).message)
    },
  })

  const handleNext = async (
    values: UserApply,
    { resetForm }: FormikHelpers<UserApply>,
  ) => {
    mutate({ ...values })

    resetForm({
      values: {
        cv: '',
        qual: '',
        exp: '',
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
                disabled={isSubmitting || isPending}
                type="submit"
                text={
                  isSubmitting || isPending ? (
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
