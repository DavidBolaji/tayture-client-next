'use client'
import { regularFont } from '@/assets/fonts/fonts'
import Button from '@/components/Button/Button'
import Spinner from '@/components/Spinner/Spinner'
import { datePosted, formatTo12HourTime, scheduledDate } from '@/utils/helpers'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Badge, Modal, Space } from 'antd'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import InterviewJobDropdown from './InterviewJobDropdown'
import { Field, Form, Formik } from 'formik'
import TextareaInput from '@/components/Form/TextareaInput/TextareaInput'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { updateScheduled } from '@/lib/api/schedule'
import { useGlobalContext } from '@/Context/store'

const JobSchedulePage = () => {
  const queryClient = useQueryClient()
  const { setMessage, setUI } = useGlobalContext()
  const router = useRouter()
  const data = queryClient.getQueryData([
    'activeScheduledJob',
  ]) as unknown as any
  const [show, setShow] = useState<boolean>(false)
  const [reason, setReason] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)
  const [, setC] = useState(0)

  useEffect(() => {
    setC((prev) => prev + 1)
  }, [data])

  const { mutate, isPending } = useMutation({
    mutationFn: async (arg) => {
      return await updateScheduled(arg, data.id)
    },
    onSuccess: () => {
      setModal(false)
      queryClient.refetchQueries({
        queryKey: ['user'],
      })
      router.back()
      setMessage(() => 'Schedule updated succesfully')
    },
  })

  const onSubmit = (values: any) => {
    if (values.reason.trim().length > 0) {
      handleYes({ status: 'DECLINED', reason: values.reason })
    } else {
      handleYes({ status: 'DECLINED' })
    }
  }
  const handleYes = (data: any) => {
    mutate({ ...data })
  }

  return (
    <div className={`pr-5 ${regularFont.className}`}>
      {!data ? null : (
        <Badge.Ribbon
          text={
            data.status === 'ACCEPTED'
              ? 'Accepted'
              : data.status === 'DECLINED'
              ? 'Declined'
              : 'Pending'
          }
          color={
            data.status === 'ACCEPTED'
              ? 'green'
              : data.status === 'DECLINED'
              ? 'red'
              : 'grey'
          }
          className="-translate-y-3 translate-x-10"
        >
          <h3
            className={`mb-[24px] text-black_400 font-[500] text-center text-[20px] md:text-[24px] ${regularFont.className}`}
          >
            Invitation to interview
          </h3>
          <p
            className={`text-black text-[16px] md:text-[20px] mb-[10px] ${regularFont.className}`}
          >
            Job Details
          </p>
          <div className={`${regularFont.className} ml-1`}>
            <p className="text-black text-[14px] md:text-[16px] mb-[4px] ">
              {data.job.job_title}
            </p>
            <p className="text-[14px] text-ash_400 mb-[8px]">
              Posted &nbsp;
              {datePosted(data.job.createdAt)}
            </p>
            <h3 className="mb-[8px] text-black_400 text-[14px]">About</h3>
            <p className="text-[14px] mb-[8px]">{data.job.job_desc}</p>
            <button
              type="button"
              onClick={() => setShow((prev) => !prev)}
              className="bg-transparent text-orange text-[14px] md:text-[16px] mb-[24px]"
            >
              More details
            </button>

            <AnimatePresence mode="wait">
              {show && <InterviewJobDropdown data={data.job} />}
            </AnimatePresence>

            <p className="text-black md:text-[20px] text-[16px] mb-[16px]">
              Interview Details
            </p>
            <div className="grid grid-cols-8 mb-[38px] ">
              <div className="col-span-2">
                <p className="md:text-[16px] text-[14px] font-[500] text-black_400 mb-[16px]">
                  Date
                </p>
                <p className="md:text-[16px] text-[14px] font-[500] text-black_400 mb-[16px]">
                  Time
                </p>
                <p className="md:text-[16px] text-[14px] font-[500] text-black_400 mb-[16px]">
                  Location
                </p>
              </div>
              {data.mode === 'in-person' ? (
                <div className="col-span-6">
                  <p className="md:text-[16px] text-[12px] md:ml-0 ml-10 font-[500] text-ash_400 mb-[16px]">
                    {scheduledDate(data.date)}
                  </p>
                  <p className="md:text-[16px] text-[12px] md:ml-0 ml-10 font-[500] text-ash_400 mb-[16px]">
                    {formatTo12HourTime(data.time)}
                  </p>
                  <p className="md:text-[16px] text-[12px] md:ml-0 ml-10 font-[500] text-ash_400 mb-[16px]">
                    {data.address},{data.city},{data.state}
                  </p>
                </div>
              ) : (
                <div className="col-span-6">
                  <div className="text-[16px] font-[500] text-ash_400 mb-[16px]">
                    {scheduledDate(data.date)}
                  </div>
                  <p className="text-[16px] font-[500] text-ash_400 mb-[16px]">
                    {formatTo12HourTime(data.time)}
                  </p>
                  <div className="text-[14px] font-[500] text-ash_400 mb-[16px]">
                    <div>Virtual</div>
                    <div className="max-w-[381px]">
                      join the meeting using this link <br />
                      <Link href={data.link}>{data.link}</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {data.status === 'PENDING' ? (
              <div className="flex justify-center gap-[16px] items-center -translate-y-[28px]">
                <Button
                  render="light"
                  text={isPending ? <Spinner /> : 'Accept'}
                  hover
                  bold={false}
                  full={false}
                  type={'button'}
                  onClick={() => handleYes({ status: 'ACCEPTED' })}
                />
                <Button
                  render="dark"
                  onClick={() => setModal(true)}
                  text={<span className="text-black">Decline </span>}
                  hover={false}
                  bold={false}
                  full={false}
                  transparent
                />
              </div>
            ) : null}
          </div>
        </Badge.Ribbon>
      )}
      <Modal
        open={modal}
        footer={null}
        closable
        onCancel={() => setModal(false)}
      >
        <div className="px-5 ">
          <p className={`${regularFont.className} mb-2`}>
            Are you sure you want to decline this invitation?{' '}
          </p>

          <Formik
            onSubmit={onSubmit}
            initialValues={{
              reason: '',
            }}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                {reason && (
                  <Field
                    maxLength={200}
                    name="reason"
                    as={TextareaInput}
                    placeholder="reason"
                  />
                )}
                <div className="mt-2">
                  <Button
                    render="light"
                    type="button"
                    transparent
                    onClick={() => setReason((prev) => !prev)}
                    bold={false}
                    rounded
                    text={
                      <Space>
                        <span className="text-[12px] text-orange">
                          {reason ? 'Remove' : 'Add'}
                        </span>
                        {reason ? (
                          <FaMinus color="#FF7517" />
                        ) : (
                          <FaPlus color="#FF7517" />
                        )}
                      </Space>
                    }
                  />
                </div>
                <div className="flex justify-between mt-5">
                  <Button
                    render="dark"
                    text={<span className="text-black">No</span>}
                    hover={false}
                    bold={false}
                    full={false}
                    transparent
                    disabled={isPending}
                    onClick={() => setModal(false)}
                    type="button"
                  />
                  <Button
                    render="light"
                    disabled={isPending}
                    text={isPending ? <Spinner /> : 'Yes'}
                    hover
                    bold={false}
                    full={false}
                    type="submit"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  )
}

export default JobSchedulePage
