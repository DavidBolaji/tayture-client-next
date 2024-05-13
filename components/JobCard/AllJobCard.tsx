import { regularFont } from '@/assets/fonts/fonts'
import { AMOUNT_PER_HIRE, formatNumberToK, salaryOutput } from '@/utils/helpers'
import { Hired, Job, School, Wallet } from '@prisma/client'
import { Alert, Switch, Tag, message } from 'antd'
import React, { useState } from 'react'
import { FaClock, FaShareAlt } from 'react-icons/fa'
import moment from 'moment'
import Link from 'next/link'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { useGlobalContext } from '@/Context/store'

import { Field, Form, Formik } from 'formik'
import StyledInput from '../Form/NomalInput/StyledInput'
import HandlePayment from '../Modal/HandlePayment'
import { FaCircleInfo } from 'react-icons/fa6'
import { incWallet } from '@/lib/api/wallet'

interface IAllJobCard {
  job: (Job & { hired: Hired[] })[] | []
}

const AllJobCard: React.FC<IAllJobCard> = ({ job }) => {
  const queryClient = useQueryClient()
  const { setMessage, setUI, ui, defaultSchool, access } = useGlobalContext()
  const [mutateState, setMutate] = useState<any>(null)
  const [amt, setAmt] = useState<string>('')
  const school = queryClient.getQueryData(['school']) as School & {
    wallet: Wallet
  }
  const wb = school?.wallet?.wallet_balance
  const [valid1, setValid] = useState(+String(amt).trim().length < 1)

  const { mutate } = useMutation({
    mutationFn: async ({
      active,
      jobId,
      refund,
      amt,
      schoolId,
    }: {
      active: boolean
      jobId: string
      refund: boolean
      amt: number
      schoolId: string
    }) => {
      return await Axios.put(`/job/update/hired/${jobId}`, {
        active,
        refund,
        amt,
        schoolId,
        defaultSchool
      })
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ['school'],
      })
      setMessage(() => res.data.message)
      setMutate(null)
    },
  })

  const { mutate: fundWallet, isPending } = useMutation({
    mutationFn: async (amount: string) =>
      await incWallet({
        wallet_balance: +amount,
        schoolId: school.sch_id
      }, defaultSchool),
    onSuccess: async (res) => {
      mutate(mutateState)
      queryClient.invalidateQueries({
        queryKey: ['school'],
      })

      setMessage(() => 'Wallet funded and Booking successful')
    },
    onError: (err) => {
      setMessage(() => (err as Error).message)
    },
  })

  const handleSwitch = (active: boolean, job: Job & { hired: Hired[] }) => {
    /**
     * We first check if active is false i.e cancel job.
      We determine whether to refund based on whether pendingHire is greater than 0 or if there are no hires (job.hired.length === 0).
      We then call mutate() with the appropriate parameters.
     */
    const pendingHire = job.noPaid - job.hired.length
    const unlockFundAmt = AMOUNT_PER_HIRE * pendingHire
    const triggerUnlockFund = pendingHire > 0
    const refund = triggerUnlockFund || job.hired.length === 0

    if (active && refund) {
      console.log('active and refund')
      if (school.wallet.wallet_balance < unlockFundAmt) {
        //set current state for payment
        setMutate({
          active,
          jobId: job.job_id,
          refund, // move from locked to main balance
          amt: unlockFundAmt,
          schoolId: school.sch_id,
        })
       // set amt to pay
        setAmt(String(unlockFundAmt))

        // show fund wallet modal
        setUI((prev) => ({
          ...prev,
          paymentModal: {
            ...prev.paymentModal,
            visibility: true,
          },
        }))

      }
      return mutate({
        /**
         * Active determines direction
         * active is false and refund true move from locked to main balance
         * active is true and refund true move from main balance to locked
         */
        active,
        jobId: job.job_id,
        refund, // move from locked to main balance
        amt: unlockFundAmt,
        schoolId: school.sch_id,
      })
    }

    return mutate({
      active,
      jobId: job.job_id,
      refund, // move from locked to main balance
      amt: unlockFundAmt,
      schoolId: school.sch_id,
    })
  }

  const onFailure = () => {
    setMessage(() => 'User aborted task')
  }

  const onSuccess = () => {
    //fund wallet
    fundWallet(String(amt) as string)
  }

  const valid = (values: any) => {
    const errors:  {amount?: string} = {};
  
    const { amount } = values;
    const isValidAmount =  +String(amount) >= Math.abs(wb - mutateState.amt);
    setValid(isValidAmount)
    if (!isValidAmount) {
      errors.amount = `Amount cannot be less than ${Math.abs(wb- mutateState.amt)}`;
    }
  
    return errors;
  }


  const jobList = !job
    ? []
    : job.map((j: Job & { hired: Hired[] }) => (
        <div
          key={j.job_id}
          className="md:col-span-6 col-span-12 bg-white gap-2 border hover:shadow rounded-md h-60 relative overflow-hidden"
        >
          <div
            className={`p-3 border-b flex justify-between ${regularFont.className}`}
          >
            <div>
              <div className="mb-1">{j.job_title}</div>
              <div
                className={`flex items-center gap-1 ${regularFont.className} text-xs`}
              >
                <span>
                  <FaClock />
                </span>
                <div className="text-[10px]">
                  {moment()
                    .date(new Date(j.createdAt).getDate())
                    .month(new Date(j.createdAt).getMonth())
                    .format('Do MMM')}
                </div>
              </div>
            </div>
            <Link href={!access ? '#' : `/dashboard/school/manage/${j.job_id}?default=2`}>
              View
            </Link>
          </div>
          <div className="pl-3 pt-1 space-y-4">
            <div className={`${regularFont.className} text-xs space-x-2`}>
              <span>Experience:</span>
              <Tag color="green" className={`${regularFont.className} text-xs`}>
                {j.job_exp} years
              </Tag>
            </div>

            <div className={`${regularFont.className} text-xs space-x-2`}>
              <span>Vacancy:</span>
              <Tag color="green" className={`${regularFont.className} text-xs`}>
                {j.job_no_hires}
              </Tag>
            </div>

            <div className={`${regularFont.className} text-xs space-x-2`}>
              <span>Qualification:</span>
              <Tag
                color="magenta"
                className={`${regularFont.className} text-xs`}
              >
                {j.job_qual}
              </Tag>
            </div>

            <div className={`${regularFont.className} text-xs space-x-2`}>
              <span>Resumption:</span>
              <Tag color="red" className={`${regularFont.className} text-xs`}>
                {moment()
                  .date(new Date(j.job_resumption).getDate())
                  .month(new Date(j.job_resumption).getMonth())
                  .format('Do MMM')}
              </Tag>
            </div>
          </div>
          <div
            onClick={() => {
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_FRONTEND_API}/jobs?find=${j.job_id}`,
              )
              message.success('Link copied to clipboard')
            }}
            className="absolute top-[67px] w-12 flex items-center justify-center h-[100px] right-0 bg-[#fafafa] cursor-pointer"
          >
            <FaShareAlt />
          </div>

          <div className="absolute bottom-0 border-t px-3 py-2 w-full flex items-center justify-between">
            <div>
              <div className={`${regularFont.className} text-xs `}>
                {formatNumberToK(
                  salaryOutput(j.job_min_sal, j.job_max_sal) as string,
                )}
              </div>
            </div>
            <div className={`space-x-1 ${regularFont.className} text-xs`}>
              {j.active && (
                <Switch
                  disabled={!access}
                  onClick={() => !access ? {} :handleSwitch(false, j)}
                  defaultChecked
                  checkedChildren={
                    <span
                      className={`${regularFont.className} text-[10px] block`}
                    >
                      OFF
                    </span>
                  }
                  unCheckedChildren={
                    <span
                      className={`${regularFont.className} block text-[10px]`}
                    >
                      ON
                    </span>
                  }
                  className="bg-[#8a8a8a]"
                />
              )}
              {!j.active && (
                <Switch
                disabled={!access}
                  onClick={() => !access ? {} :handleSwitch(true, j)}
                  checkedChildren={
                    <span
                      className={`${regularFont.className} text-[10px] block`}
                    >
                      OFF
                    </span>
                  }
                  unCheckedChildren={
                    <span
                      className={`${regularFont.className} text-[10px] block`}
                    >
                      ON
                    </span>
                  }
                  className="bg-[#8a8a8a]"
                />
              )}
            </div>
          </div>
        </div>
      ))

  return (
    <div>
      {!access && <Alert className='mb-2'  type="info" message="Contact admin to grant you access to carry out actions on this page" showIcon/>}
      <div className="grid grid-cols-12 gap-3 pb-10 overflow-auto no-s">
      {jobList}
      <HandlePayment
        onSuccess={onSuccess}
        onFailure={onFailure}
        amount={+amt}
        valid={valid1}

      >
        <div className={`${regularFont.className}`}>
          <div>
            <span className="text-2xl block text-center mb-3">Wallet</span>
          </div>
          <div className={`mb-2 text-[12px]`}>
            <div className="flex bg-slate-200 w-48 mx-auto py-1 pr-2 rounded-l-md">
              <div className="flex items-center justify-between w-full pl-3">
                <p>Available Balance:</p>
                <p>₦ {wb}</p>
              </div>
            </div>
            <hr className="mt-1 mb-2 " />
            <div className="flex gap-2 items-center bg-slate-400 px-2 py-1">
              <FaCircleInfo />
              <small>
              Fund wallet with the amount below or more to complete process
              </small>
            </div>
          </div>
          <label className={`inline-block ml-1 mb-2 ${regularFont.className}`}>
            Fund Wallet Amount
          </label>
            <Formik
              onSubmit={(data: any) => {
                setAmt(data.amount)
              }}
              initialValues={{
                amount: amt,
              }}
              enableReinitialize
              key={String(ui.postLandingModal?.visibility)}
              validateOnChange
              validate={valid}
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <Field onChange={handleSubmit} name="amount" as={StyledInput} type="num" />
                </Form>
              )}
            </Formik>
        </div>
      </HandlePayment>
    </div>
    </div>
  )
}

export default AllJobCard
