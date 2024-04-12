'use client'
import { Field, FieldArray, Form, Formik, FormikHelpers } from 'formik'
import React, { useEffect, useState } from 'react'
import DateInput from '../../Form/DateInput/DateInput'
import { SelectInput } from '../../Form/SelectInput/SelectInput'
import { mode } from '@/utils/data'
import StyledInput from '../../Form/NomalInput/StyledInput'
import LocationComponent from '../../Form/LocationComponent/LocationComponent'
import StyledTextarea from '../../Form/TextareaInput/StyledTextarea'
import { AnimatePresence, motion } from 'framer-motion'
import { FaPlus } from 'react-icons/fa'
import { Checkbox, Space } from 'antd'
import Button from '../../Button/Button'
import { MinusCircleOutlined } from '@ant-design/icons'
import { scheduleValidationSchema } from './ScheduleFormValidation'
import { regularFont } from '@/assets/fonts/fonts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ISchDb } from '@/pages/api/school/types'
import Spinner from '../../Spinner/Spinner'
import { useRouter } from 'next/router'
import { useGlobalContext } from '@/Context/store'
import { createSchedule } from '@/lib/api/schedule'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { formatTo12HourTime } from '@/utils/helpers'
import { v4 as uuid } from 'uuid'
import styled from "@emotion/styled"
dayjs.extend(utc)
dayjs().utcOffset('local')

interface ScheduleFormProps {
  status: 'view' | 'edit' | 'create'
}

const StyledCheckbox = styled(Checkbox)`
.ant-checkbox-wrapper::after {
  content: '' !important;
}
`

const ScheduleForm: React.FC<ScheduleFormProps> = ({ status }) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const school = queryClient.getQueryData(['school']) as ISchDb
  const job = queryClient.getQueryData([`job/${router.query.jobId}`]) as any

  const { ui, setUI } = useGlobalContext()
  const [first, setFirst] = useState(false)
  const [nStat, setNStat] = useState(status)

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      return await createSchedule(data)
    },
    onSuccess: () => {
      setUI((prev) => ({
        ...prev,
        scheduleModal: {
          ...prev.scheduleModal,
          visibility: false,
        },
      }))
      queryClient.invalidateQueries({
        queryKey: [`job/scheduled/${router.query.jobId}`],
      })
      queryClient.invalidateQueries({
        queryKey: [`job/${router.query.jobId}`],
      })
      window.location.assign(
        `/dashboard/school/manage/${router.query.jobId}?default=3`,
      )

      // router.push(`/dashboard/school/manage/${router.query.jobId}?default=3`)
    },
    onError: () => {
      setUI((prev) => ({
        ...prev,
        scheduleModal: {
          ...prev.scheduleModal,
          visibility: false,
        },
      }))
      queryClient.invalidateQueries({
        queryKey: [`job/scheduled/${router.query.jobId}`],
      })
      queryClient.invalidateQueries({
        queryKey: [`job/${router.query.jobId}`],
      })
      window.location.assign(
        `/dashboard/school/manage/${router.query.jobId}?default=3`,
      )
    },
  })

  const onSubmit = (values: any, { resetForm }: FormikHelpers<any>) => {
    let t: string
    if (values.time.split('T').length > 1) {
      t = formatTo12HourTime(values.time)
    } else {
      t = values.time.split('T')[0]
    }

    mutate({
      ...values,
      date: values.date.split('T')[0],
      time: t,
      instruction: values.instruction.filter(
        (i: any) => i.text.trim().length > 0,
      ),
      sch_name: school.sch_name,
      job_title: job?.job?.job_title,
      fname: ui.scheduleModal?.data.fname,
      email: ui.scheduleModal?.data.email,
      schoolId: school.sch_id,
      jobId: router.query.jobId,
      userId: ui.scheduleModal?.data.userId ?? ui.scheduleModal?.data.id,
      scheduleId: ui.scheduleModal?.data.scheduleId ?? uuid(),
    })
  }

  return (
    <div className={`md:mx-5 ${regularFont.className}`}>
      <h2 className="mt-5 mb-10 md:text-xl text-center w-full">
        Schedule Interview
      </h2>
      <Formik
        key={ui.scheduleModal?.data}
        enableReinitialize
        validateOnMount
        onSubmit={onSubmit}
        initialValues={
          status === 'create'
            ? {
                date: '',
                mode: '',
                time: '',
                city: school.sch_city ?? '',
                lga: school.sch_lga ?? '',
                state: school.sch_state ?? '',
                address: school.sch_address ?? '',
                link: '',
                reminder: false,
                instruction: [
                  {
                    text: '',
                  },
                ],
              }
            : {
                date: ui?.scheduleModal?.data?.date ?? '',
                mode: ui?.scheduleModal?.data?.mode ?? '',
                time: ui?.scheduleModal?.data?.time ?? '',
                city: school.sch_city ?? '',
                lga: school.sch_lga ?? '',
                state: school.sch_state ?? '',
                address: school.sch_address ?? '',
                link: ui?.scheduleModal?.data?.link ?? '',
                reminder: ui?.scheduleModal?.data?.reminder ?? false,
                instruction: ui?.scheduleModal?.data?.instruction
                  ? ui?.scheduleModal?.data?.instruction.map((i: any) => ({
                      text: i.text,
                    }))
                  : [
                      {
                        text: '',
                      },
                    ],
              }
        }
        validationSchema={scheduleValidationSchema}
      >
        {({ handleSubmit, values, setFieldValue, isValid }) => (
          <Form onSubmit={handleSubmit} className="relative">
            <h3 className="ml-1 mb-1">Interview date</h3>
            {nStat === 'edit' &&
            ui?.scheduleModal?.data?.status === 'PENDING' ? (
              <button
                type="button"
                className="absolute top-0 right-0 text-xs"
                onClick={() =>
                  setNStat((prev) => (prev === 'view' ? 'edit' : 'view'))
                }
              >
                Edit
              </button>
            ) : null}
            {nStat === 'view' &&
            ui?.scheduleModal?.data?.status === 'PENDING' ? (
              <button
                type="button"
                className="absolute top-0 right-0 text-xs"
                onClick={() =>
                  setNStat((prev) => (prev === 'view' ? 'edit' : 'view'))
                }
              >
                Edit
              </button>
            ) : null}
            <Field
              name="date"
              as={DateInput}
              picker="date"
              text={'Interview date'}
              placeholder="MM/DD/YYYY"
              defaultValue={
                status === 'create'
                  ? ''
                  : dayjs(ui?.scheduleModal?.data?.date, 'YYYY-MM-DD')
              }
              disabled={nStat === 'edit'}
            />
            <h3 className="ml-1 mb-1">Interview time</h3>
            <Field
              name="time"
              as={DateInput}
              picker="time"
              format="hh:mm A"
              defaultValue={
                status === 'create'
                  ? ''
                  : dayjs(
                      formatTo12HourTime(ui?.scheduleModal?.data?.time!),
                      'hh:mm A',
                    )
              }
              placeholder="09:00am"
              disabled={nStat === 'edit'}
            />
            <h3 className="ml-1 mb-1">Interview mode</h3>
            <Field
              name="mode"
              as={SelectInput}
              placeholder="Select mode"
              text="Select mode"
              option={mode}
              disabled={nStat === 'edit'}
            />

            <AnimatePresence mode="wait">
              {values.mode === 'in-person' && (
                <motion.div
                  key={values.mode}
                  initial={{
                    y: -20,
                    opacity: 0,
                    height: 0,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    height: 'auto',
                  }}
                  exit={{
                    y: -20,
                    opacity: 0,
                    height: 0,
                  }}
                >
                  <Field
                    as={LocationComponent}
                    city="city"
                    state="state"
                    lga="lga"
                    disabled={nStat === 'edit'}
                  />
                  <Field
                    name="address"
                    as={StyledTextarea}
                    placeholder="School Address"
                    text={'School Address'}
                    rows={5}
                    spellCheck="false"
                    disabled={nStat === 'edit'}
                  />
                </motion.div>
              )}
              {values.mode === 'virtual' && (
                <motion.div
                  key={values.mode}
                  initial={{
                    y: -20,
                    opacity: 0,
                    height: 0,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    height: 'auto',
                  }}
                  exit={{
                    y: -20,
                    opacity: 0,
                    height: 0,
                  }}
                >
                  <Field
                    name="link"
                    as={StyledInput}
                    placeholder="https://meet.google.com"
                    text={'Link'}
                    disabled={nStat === 'edit'}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <h2 className="mb-1 text-md">Instructions</h2>
            <p className="text-ash_400 mb-5 text-[12px]">
              Include any information that will help the candidate prepare for
              the interview or documents they need to bring along.
            </p>
            <FieldArray name="instruction">
              {({ push, remove }) => (
                <>
                  {values?.instruction?.map((_: unknown, ind: number) => (
                    <div key={ind} className="relative">
                      {(!first && status === 'create') ||
                      values?.instruction.length === 0 ? null : (
                        <>
                          <Field
                            name={`instruction[${ind}].text`}
                            as={StyledTextarea}
                            placeholder="Instruction"
                            rows={5}
                            spellCheck="false"
                            disabled={nStat === 'edit'}
                          />
                          <div className="flex items-center justify-end absolute -top-6 right-1">
                            <MinusCircleOutlined
                              onClick={() => {
                                setFieldValue(`instruction[${ind}].text`, '')

                                remove(ind)
                              }}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  ))}

                  <Button
                    render="light"
                    transparent
                    onClick={() => {
                      if (!first) {
                        setFirst(true)
                      } else {
                        push({
                          text: '',
                        })
                      }
                    }}
                    bold={false}
                    rounded
                    text={
                      <Space>
                        <FaPlus color="#FF7517" />
                        <span className="text-[16px] text-orange">
                          Add Instruction
                        </span>
                      </Space>
                    }
                  />
                </>
              )}
            </FieldArray>
            <div className="my-8">
              <h2 className="mb-1 text-md">Reminder</h2>
              <div className="flex gap-2 items-center">
                <StyledCheckbox
                  className='border-orange rounded-md border'
                  key={String(values.reminder)}
                  onChange={(e) => {
                    setFieldValue('reminder', e.target.checked ? true : false)
                  }}
                  defaultChecked={values.reminder}
                  checked={values.reminder}
                />
                <p className="text-[12px] text-ash_400">
                  I want to receive email reminder for scheduled interviews
                </p>
              </div>
            </div>

            {ui?.scheduleModal?.data?.status === 'PENDING' && (
              <div className="text-center mb-5">
                <Button
                  disabled={!isValid || isPending}
                  bold={false}
                  hover={isValid || !isPending}
                  text={isPending ? <Spinner /> : 'Schedule'}
                  render="light"
                  type="submit"
                />
              </div>
            )}
            {status === 'create' && (
              <div className="text-center mb-5">
                <Button
                  disabled={!isValid || isPending}
                  bold={false}
                  hover={isValid || !isPending}
                  text={isPending ? <Spinner /> : 'Schedule'}
                  render="light"
                  type="submit"
                />
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ScheduleForm
