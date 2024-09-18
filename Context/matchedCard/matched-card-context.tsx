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
  }>
>({})

export const useMatchedContet = () => useContext(matchedContext)

export const MatchedContextProvider: React.FC<
  PropsWithChildren & { cur: any; jobId: string }
> = ({ children, cur, jobId }) => {
  const [amt, setAmt] = useState<string | number>('')
  const { setMessage, setUI, defaultSchool } = useGlobalContext()
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
    schoolId: school.sch_id
  }
  return (
    <matchedContext.Provider value={value}>
      {children}
    </matchedContext.Provider>
  )
}
