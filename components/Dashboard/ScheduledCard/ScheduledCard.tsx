'use client'
import { Alert, Modal,Switch, Tag } from 'antd'

import { useGlobalContext } from '@/Context/store'
import ListComponent from '@/components/ListComponent'
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6'
import { regularFont } from '@/assets/fonts/fonts'
import { checkFileExtension, checkIsExpMatch, checkIsQualMatch } from '@/utils/helpers'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ISchDb } from '@/pages/api/school/types'
import { FaBook, FaPenSquare, FaPlusSquare } from 'react-icons/fa'
import HandleSchedule from '@/components/HandleSchedule'
import { useState } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import { Axios } from '@/request/request'
import { User } from '@prisma/client'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'
import CVComponent from '@/components/CVComponent'

export const StyledModal = styled(Modal)`
  overflow: hidden;
  border-radius: 10px;
  && {
    > * .ant-btn-primary {
      background-color: #ff7517;
    }
    > * .ant-btn-default:hover {
      color: #ff7517;
      border: 1px solid #ff7517;
    }
    > * .ant-btn-primary:hover {
      color: #ff7517;
      background-color: transparent;
      border: 1px solid #ff7517;
    }
    > * .ant-modal-close-icon {
      background-color: #faf9f9;
      border-radius: 50px;
      font-size: 12px;
      border-color: #e9e8e8;
      border-width: 1px;
      padding: 5px;
      margin-left: -20px;
      margin-top: 3px;
    }
  }
`

interface ScheduledCardProps {
  params: { jobId: string }
  loading: boolean
  matchedJob: any
}

const ScheduledCard: React.FC<ScheduledCardProps> = ({
  params,
  matchedJob,
  loading,
}) => {
  const { setMessage, setUI } = useGlobalContext()
  const [status, setStatus] = useState<'create' | 'edit' | 'view'>('create')
  const [open, setOpen] = useState(false)
  const [id, setId] = useState('')
  const router = useRouter()


  const queryClient = useQueryClient()
  const school = queryClient.getQueryData(['school']) as ISchDb
  const user = queryClient.getQueryData(['user']) as User

  const {mutate, isPending} = useMutation({
    mutationFn: async () => {
      return await Axios.post('/hired/create', {
        userId: id,
        jobId: router.query.jobId,
        role: matchedJob.job.job_title
      })
    },
    onSuccess: (res) => {
      setOpen(false)
      setMessage(() => res.data.message)
      queryClient.invalidateQueries({
        queryKey: [`job/scheduled/${router.query.jobId}`]
      })
      setId('')
    },
    onError: (error) => {
      setMessage(() => (error as AxiosError<{error: string}>).response?.data?.error ||(error as Error).message)
    }
  })

  const handleModalSchedule = (
    modal: 'create' | 'view' | 'edit',
    data: any,
  ) => {
    setStatus(modal)
    const t = setTimeout(() => {
      setUI((prev) => {
        return {
          ...prev,
          scheduleModal: {
            data: {
              ...prev.scheduleModal?.data,
              mode: data.mode,
              date: data.date,
              time: data.time,
              link: data.link,
              fname: data.user.fname,
              email: data.user.email,
              status: data.status,
              userId: data.user.id,
              scheduleId: data.id,
              instruction: data.instruction,
              reminder: data.reminder,
            },
            visibility: true,
          },
        }
      })
      clearTimeout(t)
    }, 500)
  }
  
  return (
    <div className={`${regularFont.className} h-[400px] no-s mr-10`}>
      <div className="min-w-[900px] ">
        <div className="grid grid-cols-12 bg-white p-[24px] rounded-t-[15px] sticky -top-1 ">
          <div className="col-span-2">Name</div>
          <div className="col-span-3">Details</div>
          <div className="col-span-1 text-center">Experience</div>
          <div className="col-span-2 text-center">Qualification</div>

          <div className="col-span-1 ">Interview</div>
          <div className="col-span-2 text-end mr-4">Assesement</div>
          <div className="col-span-1 text-center">Hired</div>
        </div>
        <div className="border bord border-b-0 mb-32">
          {!loading &&
            matchedJob?.scheduled.length > 0 &&
            matchedJob?.scheduled.map((match: any, ind: number) => (
              <div
                key={`${match.user.id}_scheduled`}
                className="grid grid-cols-12 border-b p-[24px] hover:bg-slate-50 transition-colors duration-300"
              >
                <div className="col-span-2">
                  <h3 className="mb-2">
                    {match.user.fname} {match.user.lname}
                  </h3>
                </div>
                <div className="col-span-3">
                  <ListComponent
                    key="l9"
                    title="Experience length"
                    text={`${match.user.applied[0].exp} years`}
                  />
                  <ListComponent
                    key="l10"
                    title="Qualification"
                    text={match.user.applied[0].qual}
                  />
                  
                  {match.user.applied[0].cv ? 
                  <Link className='text-black' href={`${match.user.applied[0].cv}`} target='_blank'>
                  <CVComponent 
                   ext={checkFileExtension(match.user.applied[0].cv)}
                  name={match.user.applied[0].cv.split('/')[match.user.applied[0].cv.split('/').length - 1]}
                  /> </Link>: <Alert showIcon message={'User has not uploaded cv'} type="info" /> }
                </div>

                <div className="col-span-1">
                  {checkIsExpMatch({
                    exp: match?.user?.applied[0]?.exp,
                    job: matchedJob?.job?.job_exp,
                  }) ? (
                    <div className="w-full flex justify-center">
                      <FaCircleCheck color="green" size={20} />
                    </div>
                  ) : (
                    <div className="flex w-full justify-center">
                      <FaCircleXmark color={'red'} size={20} />
                    </div>
                  )}
                </div>
                <div className="col-span-2">
                  {checkIsQualMatch({
                    qual: match.user.applied[0].qual,
                    job: matchedJob.job.job_qual,
                  }) ? (
                    <div className="w-full flex justify-center">
                      <FaCircleCheck color="green" size={20} />
                    </div>
                  ) : (
                    <div className="flex w-full justify-center">
                      <FaCircleXmark color={'red'} size={20} />
                    </div>
                  )}
                </div>
                <div className="col-span-1">
                  {match.status === 'PENDING' ? (
                    <div className="mb-3 flex gap-5 items-center justify-end mr-6">
                      <small
                        className="hover:cursor-pointer  hover:scale-105 transition-transform duration-300"
                        onClick={() => handleModalSchedule('edit', match)}
                      >
                        <FaBook size={16} />
                      </small>
                    </div>
                  ) : (
                    <div className="mb-3 flex gap-5 items-center justify-end mr-6">
                      <small
                        className="hover:cursor-pointer  hover:scale-105 transition-transform duration-300"
                        onClick={() => handleModalSchedule('edit', match)}
                      >
                        <FaBook size={16} />
                      </small>
                    </div>
                  )}
                  {match.status === 'PENDING' ? (
                    <Tag color="grey">Pending</Tag>
                  ) : match.status === 'DECLINED' ? (
                    <Tag color="red">Declined</Tag>
                  ) : (
                    <Tag color="#87d068">Accepted</Tag>
                  )}
                </div>
                <div className="col-span-2 space-y-2">
                  {match?.test?.length > 0 ? (
                    <>
                      <Link
                        href={`/dashboard/school/manage/assesement/${match.id}`}
                      >
                        <small className="flex justify-end pr-3 w-full hover:cursor-pointer  hover:scale-105 transition-transform duration-300">
                          <FaPenSquare color="black" size={16} />
                        </small>
                      </Link>
                      {match.test.map((t: any, ind: number) => (
                        <Tag
                          key={`${t}_${ind}`}
                          className="block"
                          color="magenta"
                        >
                          {t.text}
                        </Tag>
                      ))}
                    </>
                  ) : (
                    <Link
                      href={`/dashboard/school/manage/assesement/${match.id}`}
                    >
                      <small className="flex items-center justify-end pr-2 w-full hover:cursor-pointer  hover:scale-105 transition-transform duration-300">
                        <FaPlusSquare color="#008000" size={16} />
                      </small>
                    </Link>
                  )}
                </div>
                <div onClick={() => setOpen(true)} className="col-span-1 scale-90 text-center -translate-y-2 translate-x-2">
                  {match.user.hired && match.user.hired.length > 0 ? (
                    <Switch checked disabled style={{
                      backgroundColor: '#ff7517'
                    }} />
                  ) : (
                    <div className='relative'>
                      <Switch
                      loading={isPending}
                      value={false}
                      onClick={() => {
                        setOpen(true)
                        setId(match.user.id)
                      }}
                      className='bg-[#898a8b]'
                        defaultValue={false}
                      />
                    </div>
                  )}
                 
                </div>
              </div>
            ))}
        </div>
      </div>
      <HandleSchedule status={status} />
      <StyledModal open={open} onCancel={() => setOpen(false)}
        okText="Yes"
        cancelText="No"
        onOk={() => {
          setOpen(false)
          mutate()
        }}
        
      >
      <h3
      className={`font-[600] text-black_400 text-[18px] mb-4 ${regularFont.className}`}
    >
      🚫 Attention!
    </h3>
    <p className={`text-[14px] ${regularFont.className}`}>
    Are you sure you want to proceed with this action?
    </p>
      </StyledModal>
    </div>
  )
}

export default ScheduledCard
