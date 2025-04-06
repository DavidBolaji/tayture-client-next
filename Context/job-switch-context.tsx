import React, { act, createContext, useContext, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Hired, Job, School, Wallet } from '@prisma/client'
import { Axios } from '@/request/request'
import { useGlobalContext } from '@/Context/store'
import { incWallet } from '@/lib/api/wallet'
import JobHandlePayment from '@/components/JobCard/JobHandlePayment'
import { AMOUNT_PER_HIRE, sleep } from '@/utils/helpers'
import { useRouter } from 'next/router'

const JobSwitchContext = createContext<any>(null)

export const JobSwitchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient()
  const { setMessage, setUI, defaultSchool } = useGlobalContext()
  const [mutateState, setMutateState] = useState<any>(null)
  const [amt, setAmt] = useState<string>('')
  const router = useRouter()

  const school = queryClient.getQueryData(['school']) as School & {
    wallet: Wallet
  }

  const wb = school?.wallet?.wallet_balance
  const [paymentValid, setPaymentValid] = useState(
    +String(amt).trim().length < 1
  )

  const { mutate: updateJob, isPending } = useMutation({
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
        defaultSchool,
      })
    },
    onSuccess: async (res) => {
      setMessage(() => res.data.message)
      await sleep(3000)
      setMutateState(null)
      router.push('/dashboard/school')
    },
  })

  const { mutate: fundWallet } = useMutation({
    mutationFn: async (amount: string) =>
      await incWallet(
        {
          wallet_balance: +amount,
          schoolId: school.sch_id,
        },
        defaultSchool
      ),
    onSuccess: async (res) => {
      updateJob(mutateState)
      queryClient.invalidateQueries({
        queryKey: ['school'],
      })
      setMessage(() => 'Wallet funded and Booking successful')
    },
    onError: (err) => {
      setMessage(() => (err as Error).message)
    },
  })

  const formValid = (values: any) => {
    const errors: { amount?: string } = {}
    const { amount } = values
    const isValidAmount = +String(amount) >= Math.abs(wb - +amt)
    setPaymentValid(isValidAmount)
    if (!isValidAmount) {
      errors.amount = `Amount cannot be less than ${Math.abs(wb - +amt)}`
    }
    return errors
  }

  const onFailure = () => {
    setMessage(() => 'User aborted task')
  }

  const onSuccess = () => {
    fundWallet(String(amt) as string)
  }

  /**
   * We first check if active is false i.e cancel job.
    We determine whether to refund based on whether pendingHire is greater than 0 or if there are no hires (job.hired.length === 0).
    We then call mutate() with the appropriate parameters.
   */
  const handleSwitch = (active: boolean, job: Job & { hired: Hired[] }) => {
    if (!job) return
    const pendingHire = job.noPaid - job.hired.length

    const unlockFundAmt = AMOUNT_PER_HIRE * pendingHire

    const triggerUnlockFund = pendingHire > 0

    const refund = triggerUnlockFund || job.hired.length === 0

    if (active && refund) {
      if (
        school.wallet.wallet_balance < unlockFundAmt &&
        school.wallet.wallet_locked_balance < unlockFundAmt
      ) {
        //set current state for payment
        setMutateState({
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
      return updateJob({
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

    return updateJob({
      active,
      jobId: job.job_id,
      refund, // move from locked to main balance
      amt: unlockFundAmt,
      schoolId: school.sch_id,
    })
  }

  const value = {
    handleSwitch,
    isPending,
  }

  return (
    <JobSwitchContext.Provider value={value}>
      {children}
      <JobHandlePayment
        onSuccess={onSuccess}
        onFailure={onFailure}
        amt={+amt}
        valid={formValid}
        setAmt={setAmt}
        paymentValid={paymentValid}
        wb={wb}
      />
    </JobSwitchContext.Provider>
  )
}

export const useJobSwitch = () => {
  const context = useContext(JobSwitchContext)
  if (!context) {
    throw new Error('useJobSwitch must be used within a JobSwitchProvider')
  }

  return {
    ...context,
  }
}
