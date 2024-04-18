'use client'
import { Alert } from 'antd'

import { useGlobalContext } from '@/Context/store'
import { MdOutlineError } from 'react-icons/md'
import ListComponent from '@/components/ListComponent'
import { FaCircleCheck, FaCircleInfo, FaCircleXmark } from 'react-icons/fa6'
import Button from '@/components/Button/Button'
import BlurComponent from '@/components/BlurComponent'
import { regularFont } from '@/assets/fonts/fonts'
import {
  AMOUNT_PER_HIRE,
  checkIsExpMatch,
  checkIsQualMatch,
} from '@/utils/helpers'
import { FaClock, FaMoneyBill } from 'react-icons/fa'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ISchDb } from '@/pages/api/school/types'
import { createTransaction } from '@/lib/api/transaction'
import HandlePayment from '@/components/Modal/HandlePayment'
import { incWallet } from '@/lib/api/wallet'
import { useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import StyledInput from '@/components/Form/NomalInput/StyledInput'
import Spinner from '@/components/Spinner/Spinner'
import HandleSchedule from '@/components/HandleSchedule'
import { useRouter } from 'next/router'
import * as Yup from 'yup';
import FormError from '@/components/Form/FormError/FormError'


interface MatchedCardProps {
  params: { jobId: string }
  loading: boolean
  matchedJob: any
}

const MatchedCard: React.FC<MatchedCardProps> = ({
  params,
  matchedJob,
  loading,
}) => {
  const { jobId } = params

  const { setMessage, setUI, setCount, ui } = useGlobalContext()

  const queryClient = useQueryClient()
  const school = queryClient.getQueryData(['school']) as ISchDb
 

  /**
   * wallet balance,
   * no of hires amount per user,
   * transaction aggregate
   **/
  const wb = school?.wallet.wallet_balance
  const noOfHires = +matchedJob?.job?.job_no_hires
  const aggregateAmt = matchedJob?.aggregate?._sum?.amount ?? 0
  const curAppCount = matchedJob?.applied?.length
  const complete = curAppCount >= noOfHires

  const left = noOfHires - curAppCount
  const amountFinal = complete
    ? AMOUNT_PER_HIRE * noOfHires
    : AMOUNT_PER_HIRE * curAppCount
  const [amt, setAmt] = useState<string | number>('')

  useEffect(() => {
    if(typeof aggregateAmt === "number" && typeof wb === "number" && typeof amountFinal === "number") {
      setAmt(Math.abs(wb - aggregateAmt - amountFinal))
    }
  
  }, [amountFinal, aggregateAmt, wb])

  const { mutate: fundWallet, isPending } = useMutation({
    mutationFn: async (amount: string) =>
      await incWallet({
        wallet_balance: +amount,
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ['school'],
      })

      setMessage(() => 'Wallet successfully funded')
    },
    onError: (err) => {
      setMessage(() => (err as Error).message)
    },
  })

  const { mutate, isPending: transactionLoading } = useMutation({
    mutationFn: async (transaction: any) => {
      return await createTransaction(transaction)
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [`job/${jobId}`],
      })
      setUI((prev) => ({
        ...prev,
        paymentModal: {
          ...prev.paymentModal,
          visibility: false,
        },
      }))
    },
  })

  const onSuccess = () => {
    /**fund wallet */
    fundWallet(String(Math.abs(wb - aggregateAmt - amountFinal)))
    /**create transaction */
    mutate({
      amount: amountFinal,
      noPaid: complete ? noOfHires : curAppCount,
      schoolId: school.sch_id,
      jobId: jobId,
    })
  }

  const handlePayment = () => {
    const canSchedule = wb - aggregateAmt > amountFinal
    if (canSchedule) {
      /**proceed to create transaction and update job status to paid */
      mutate({
        amount: amountFinal,
        noPaid: complete ? noOfHires : curAppCount,
        schoolId: school.sch_id,
        jobId: jobId,
      })
    } else {
      /** Display modal  */
      setUI((prev) => ({
        ...prev,
        paymentModal: {
          ...prev.paymentModal,
          visibility: true,
        },
      }))
    }
  } 
  const handlePayment2 = () => {
    setAmt(Math.abs(wb - aggregateAmt - amountFinal))
      /** Display modal  */
      setUI((prev) => ({
        ...prev,
        paymentModal: {
          ...prev.paymentModal,
          visibility: true,
        },
      }))
  }
  
  const onFailure = () => {
    setMessage(() => 'User aborted task')
  }

  const handleSchedule = ({
    id,
    fname,
    email,
  }: {
    id: string
    fname: string
    email: string
  }) => {
    setUI((prev) => {
      return {
        ...prev,
        scheduleModal: {
          data: {
            ...prev.scheduleModal?.data,
            fname,
            email,
            id,
          },
          visibility: true,
        },
      }
    })
  }

  const router = useRouter()

  const handleClick = matchedJob?.job?.status ? () => console.log('object') : String(amt).trim().length > 0 ? () => handlePayment(): () => handlePayment2()
  const redirect = () => router.push(`/dashboard/school/manage/${jobId}?default=3`)
  const [valid1, setValid] = useState(+String(amt).trim().length < 1)


  const valid = (values: any) => {
    const errors:  {amount?: string} = {};
  
    const { amount } = values;
    const isValidAmount =  +String(amount) >= Math.abs(wb - aggregateAmt - amountFinal);
    setValid(isValidAmount)
    if (!isValidAmount) {
      errors.amount = `Amount cannot be less than ${Math.abs(wb - aggregateAmt - amountFinal)}`;
    }
  
    return errors;
  } 


  

  return (
    <div className={`${regularFont.className} h-[400px] no-s mr-10`}>
      <div className="min-w-[900px] ">
        {matchedJob?.job?.status ? <Alert
          type="success"
          showIcon
          message={
            <p className={`text-[12px] ${regularFont.className}`}>
              You have already paid for this job. Click the schedule button to invite candidate for interview and view invited candidate on interview tab
            </p>
          }
          className="bg-transparent -translate-x-1 -translate-y-3 border-none text-[15px] -mb-2"
        />:<Alert
          type="error"
          showIcon
          message={
            <p className={`text-[12px] ${regularFont.className}`}>
              Click the pay button and make payment in order to gain access to
              scheduling applicants for interview.
            </p>
          }
          className="bg-transparent -translate-x-1 -translate-y-3 border-none text-[15px] -mb-2"
          icon={
            <span className="inline-block mt-2 -translate-y-1">
              <MdOutlineError color="#B3261E" />
            </span>
          }
        />}
        <div className="grid grid-cols-12 bg-white p-[24px] rounded-t-[15px] sticky -top-1 ">
          <div className="col-span-1">Name</div>
          <div className="col-span-4">Details</div>
          <div className="col-span-2 text-center">Experience</div>
          <div className="col-span-2 text-center">Qualification</div>
          <div className="col-span-2 text-center">Status</div>
          <button
            disabled={matchedJob?.job?.status}
            onClick={handleClick}
            className="absolute gap-2 bg-green-600 text-white px-5 py-1 rounded-md cursor-pointer right-2 flex items-center justify-center top-[50%] -translate-y-[50%]"
          >
            {transactionLoading ? <Spinner color="#fff" /> : <FaMoneyBill />}
            <span>{matchedJob?.job?.status ? 'Paid' : 'Pay'}</span>
          </button>
        </div>
        <div className="border bord border-b-0 mb-32">
          {!loading &&
            matchedJob?.applied.length > 0 &&
            matchedJob?.applied.map((match: any, ind: number) => (
              <div
                key={match.user.id}
                className="grid grid-cols-12 border-b p-[24px] hover:bg-slate-50 hover:cursor-pointer transition-colors duration-300"
              >
                <div className="col-span-1">
                  <h3 className="mb-2">{match.user.fname}</h3>
                </div>
                <div className="col-span-4">
                  <ListComponent
                    key="l9"
                    title="Experience length"
                    text={`${match.exp} years`}
                  />
                  <ListComponent
                    key="l10"
                    title="Qualification"
                    text={match.qual}
                  />
                  <BlurComponent redirect={redirect} pay={handleClick} status={matchedJob?.job?.status} />
                </div>

                <div className="col-span-2">
                  {checkIsExpMatch({
                    exp: match.exp,
                    job: matchedJob.job.job_exp,
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
                    qual: match.qual,
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
                <div className="col-span-2 text-center justify-center">
                  {matchedJob.job && (
                    <Button
                      disabled={
                        !matchedJob?.job?.status ||
                        (matchedJob?.job?.schedule &&
                          matchedJob?.job?.schedule
                            .map((e: any) => e.user.id)
                            .includes(match.user.id))
                      }
                      render="light"
                      text={
                        <>
                          <div className="flex items-center gap-2">
                            <FaClock color="#000" size={16} />
                            <span>
                              {matchedJob.job.schedule
                                .map((e: any) => e.user.id)
                                .includes(match.user.id)
                                ? 'Scheduled'
                                : 'Schedule'}
                            </span>
                          </div>
                        </>
                      }
                      bold={false}
                      onClick={() =>
                        handleSchedule({
                          id: match.user.id,
                          fname: match.user.fname,
                          email: match.user.email,
                        })
                      }
                    />
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
      <HandlePayment
        onSuccess={onSuccess}
        onFailure={onFailure}
        amount={+amt}
        valid={valid1}
        // valid={valid.}
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

          {/* {String(amt).trim().length > 0 && ( */}
            <Formik
              onSubmit={(data: any) => {
                setAmt(data.amount)
              }}
              initialValues={{
                amount: amt,
              }}
              enableReinitialize
              key={String(ui.postLandingModal?.visibility)}
              // validationSchema={validationSchema}
              validateOnChange
              validate={valid}
            >
              {({ handleSubmit, handleChange }) => (
                <Form onSubmit={handleSubmit}>
                  <Field onChange={handleSubmit} name="amount" as={StyledInput} type="num" />
                  {/* <ErrorMessage name={"amount"}>
                    {(msg) => <FormError msg={msg} />}
                  </ErrorMessage> */}
                </Form>
              )}
            </Formik>
          {/* )} */}
        </div>
      </HandlePayment>
      <HandleSchedule status={'create'} />
    </div>
  )
}

export default MatchedCard
