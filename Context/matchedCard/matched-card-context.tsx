import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useGlobalContext } from '../store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ISchDb } from '@/pages/api/school/types'
import { AMOUNT_PER_HIRE } from '@/utils/helpers'
import {
  decWallet,
  decWalletLimit,
  incWallet,
  incWalletLimit,
} from '@/lib/api/wallet'
import {
  createTransaction,
  createTransactionLimit,
} from '@/lib/api/transaction'
import { boolean } from 'yup'
import { StyledModal } from '@/components/Dashboard/ScheduledCard/ScheduledCard'
import { regularFont } from '@/assets/fonts/fonts'
import { AxiosError } from 'axios'
import { getAppliedJobUsers, sendRejectionMessage } from '@/lib/api/matched'
import { updateJob } from '@/lib/api/job'
import { Axios } from '@/request/request'

const matchedContext = createContext<
  Partial<{
    sufficientBalancePayment: () => void
    inSufficientPayment: () => void
    handleClick: () => void
    transactionLoading: boolean
    amt: string | number
    cur: any
    isPending: boolean
    setId: Dispatch<SetStateAction<string>>
    id: string
    hasBeenPaidfor: number
    isScheduled: number
    isLeft: number
    wb: number
    amountFinal: number
    setAmt: Dispatch<SetStateAction<string | number>>
    defaultSchool: number
    jobId: string
    complete: boolean
    noOfHires: number
    curAppCount: number
    fundWallet: (amount: string) => void
    transaction: (arg: any) => void,
    schoolId: number
    setOpen: Dispatch<SetStateAction<boolean>>
    hirePending: boolean
  }>
  >({})

export const useMatchedContet = () => useContext(matchedContext)

export const MatchedContextProvider: React.FC<
  PropsWithChildren & { cur: any; jobId: string }
> = ({ children, cur, jobId }) => {
  const [amt, setAmt] = useState<string | number>('')
  const { setMessage, setUI, defaultSchool } = useGlobalContext()
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient()
  const school = queryClient.getQueryData(['school']) as ISchDb
  const permission = queryClient.getQueryData(['permission'])
  const permissionGranted = permission !== 'limited'
  const [id, setId] = useState('')

  const wb = school?.wallet.wallet_balance
  const noOfHires = +cur?.job?.job_no_hires
  const curAppCount = cur?.applied?.length
  const complete = curAppCount >= noOfHires

  const isScheduled = cur?.job?.noScheduled
  const isHired = cur?.job?.job_no_hires
  const hasBeenPaidfor = cur?.job?.noPaid
  const isLeft = isHired - hasBeenPaidfor

  const amountFinal = complete
    ? AMOUNT_PER_HIRE * noOfHires
    : AMOUNT_PER_HIRE * curAppCount

  useEffect(() => {
    if (typeof wb === 'number' && typeof amountFinal === 'number') {
      setAmt(Math.abs(wb - amountFinal))
    }
  }, [amountFinal, wb])

  const { mutate: fundWallet, isPending } = useMutation({
    mutationFn: async (amount: string) =>
      permissionGranted
        ? await incWallet(
            {
              wallet_balance: +amount,
              schoolId: school.sch_id,
            },
            defaultSchool,
          )
        : incWalletLimit(
            {
              wallet_balance: +amount,
              schoolId: school.sch_id,
            },
            defaultSchool,
          ),
    onSuccess: async () => {
      const data = {
        wallet_balance: Math.abs(amountFinal),
        schoolId: school.sch_id,
        role: cur?.job.job_title,
      }
      if (permissionGranted) {
        await decWallet(data, defaultSchool)
      } else {
        await decWalletLimit(data, defaultSchool)
      }
      queryClient.invalidateQueries({
        queryKey: ['school'],
      })

      setMessage(() => 'Wallet funded and Booking successful')
    },
    onError: (err: any) => {
      setMessage(() => (err as Error).message)
    },
  })

  const { mutate: transaction, isPending: transactionLoading } = useMutation({
    mutationFn: async (transaction: any) => {
      if (permissionGranted) {
        return await createTransaction(transaction, +defaultSchool)
      }
      return await createTransactionLimit(transaction, +defaultSchool)
    },
    onSuccess: () => {
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

  // wallet has excess of amount to be paid
  const sufficientBalancePayment = () => {
    const canSchedule = wb >= amountFinal
    if (canSchedule) {
      /**proceed to create transaction and update job status to paid */
      transaction({
        amount: amountFinal,
        noPaid: complete ? noOfHires : curAppCount - hasBeenPaidfor,
        schoolId: school.sch_id,
        jobId: jobId,
        isFunded: true,
        role: cur.job.job_title,
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

  // wallet has insufficient funds
  const inSufficientPayment = () => {
    setAmt(Math.abs(wb - amountFinal + AMOUNT_PER_HIRE * hasBeenPaidfor))
    /** Display modal  */
    setUI((prev) => ({
      ...prev,
      paymentModal: {
        ...prev.paymentModal,
        visibility: true,
      },
    }))
  }

  const { mutate: hire, isPending: hirePending } = useMutation({
    mutationFn: async () => {
      return await Axios.post('/hired/create', {
        userId: id,
        jobId: jobId,
        role: cur.job.job_title,
        defaultSchool,
      })
    },
    onSuccess: async (res) => {
      /**
       * no of hire on job
       *
       * if equal
       * all applied except hiredlist, send rejection mail,
       * archieve job
       */

      const totalHire = +cur.job.job_no_hires
      const alreadyHired = res.data.job.job.hired.length
      console.log(totalHire)
      if (totalHire >= alreadyHired) {
        await sendRejectionMessage({
          jobId: cur.job.job_id,
          user: res.data.job.job.hired,
        })
        await updateJob(cur.job.job_id)
      }

      const req = await getAppliedJobUsers(cur.job.job_id as string)

      queryClient.setQueryData(
        [`job/${cur.job.job_id}`],
        () => req.data.applied,
      )

      setOpen!(false)
      setMessage(() => res.data.message)

      setId!('')
    },
    onError: (error) => {
      setMessage(
        () =>
          (error as AxiosError<{ error: string }>).response?.data?.error ||
          (error as Error).message,
      )
    },
  })

  

  const value = {
    sufficientBalancePayment,
    inSufficientPayment,
    transactionLoading,
    amt,
    cur,
    isPending,
    setId,
    hasBeenPaidfor,
    isScheduled,
    isLeft,
    wb,
    id,
    amountFinal,
    setAmt,
    jobId,
    complete,
    noOfHires,
    curAppCount,
    fundWallet,
    transaction,
    schoolId: school.sch_id,
    setOpen,
    hirePending
  }
  return (
    <matchedContext.Provider value={value}>
      {children}
      <StyledModal
        open={open}
        onCancel={() =>setOpen(false)}
        okText="Yes"
        cancelText="No"
        onOk={() => {
          setOpen(false)
          hire()
        }}
      >
        <h3
          className={`font-[600] text-black_400 text-[18px] mb-4 ${regularFont.className}`}
        >
          🚫 Confirmation
        </h3>
        <p className={`text-[14px] ${regularFont.className}`}>
          Applicant has been hired?
        </p>
      </StyledModal>
    </matchedContext.Provider>
  )
}
