import { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { Field, Formik, Form } from 'formik'

import StyledInput from '@/components/Form/NomalInput/StyledInput'
import HandlePayment from '@/components/Modal/HandlePayment'
import { useGlobalContext } from '@/Context/store'
import { useMatchedContet } from '@/Context/matchedCard/matched-card-context'
import { FaCircleInfo } from 'react-icons/fa6'
import { AMOUNT_PER_HIRE, formatNumber } from '@/utils/helpers'
import Link from 'next/link'
import { useRouter } from 'next/router'

const MatchedCardAppliedItemPayment = () => {
  const {
    hasBeenPaidfor,
    jobId,
    wb,
    transaction,
    amountFinal,
    schoolId,
    amt,
    setAmt,
    fundWallet,
    complete,
    noOfHires,
    curAppCount,
  } = useMatchedContet()

  const { setMessage, setUI } = useGlobalContext()
  const router = useRouter()

  const [valid1, setValid] = useState(+String(amt).trim().length < 1)
  const [isSummaryOpen, setSummaryOpen] = useState(false)

  const toggleSummary = () => {
    setSummaryOpen((prev) => !prev)
  }

  const onSuccess = () => {
    fundWallet!(String(amt) as string)
    transaction!({
      complete,
      noPaid: complete ? noOfHires : curAppCount! - hasBeenPaidfor!,
      schoolId,
      jobId: jobId,
    })
  }

  const onFailure = () => {
    setMessage(() => 'User aborted task')
  }

  const valid = (values: any) => {
    const errors: { amount?: string } = {}
    const { amount } = values

    const isValidAmount = +String(amount) >= Math.abs(wb! - amountFinal!)
    setValid(isValidAmount)
    setAmt!(amount)
    if (!isValidAmount) {
      errors.amount = `Amount cannot be less than ${Math.abs(
        wb! - amountFinal!,
      )}`
    }
    return errors
  }

  const close = () => {
    setUI((prev) => ({
      ...prev,
      paymentModal: {
        ...prev.paymentModal,
        visibility: false,
      },
    }))
  }

  return (
    <HandlePayment
      onSuccess={onSuccess}
      onFailure={onFailure}
      amount={+amt!}
      valid={valid1}
    >
      <div className="bg-transparent rounded-lg  mx-auto text-gray-800">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold mb-1">Wallet</h2>
        </div>

        {/* <div className="bg-gray-50 p-2 rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <p className="text-sm">Available Balance:</p>
            <p className="text-md font-semibold text-green-500">₦ {formatNumber(wb ?? 0, 'NGN', {})}</p>
          </div>
        </div> */}

        <div className="mb-2 p-4 rounded-lg bg-blue-50 flex gap-2 items-center">
          <FaCircleInfo className="text-blue-500" />
          <small className="">
            Fund wallet with the amount below to complete process or{' '}
            <span
              onClick={() => {
                close()
                router.push('/dashboard/school/manage/all')
              }}
              className="text-blue-500 underline cursor-pointer"
            >
              Edit hire count
            </span>
          </small>
        </div>

        {/* Collapsible Order Summary */}
        <div className="mb-4">
          <button
            className="flex items-center justify-between w-full bg-[#fafafa] px-4 py-2 rounded-lg text-md font-semibold"
            onClick={toggleSummary}
          >
            <span>Order Summary</span>
            {isSummaryOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isSummaryOpen ? 'auto' : 0,
              opacity: isSummaryOpen ? 1 : 0,
            }}
            className="overflow-hidden bg-white px-4 py-3 mt-2 rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="flex justify-between py-2 italic">
              <div>Amount per hire</div>
              <div className=" ">
                ₦ {formatNumber(AMOUNT_PER_HIRE, 'NGN', {})}
              </div>
            </div>
            <div className="flex justify-between py-2 italic">
              <div>No. of hires</div>
              <div className="">{noOfHires}</div>
            </div>
            <div className="flex justify-between py-2 italic">
              <div>Total payment</div>
              <div className="">
                ₦ {formatNumber(AMOUNT_PER_HIRE * (noOfHires ?? 1), 'NGN', {})}
              </div>
            </div>
            <div className="flex justify-between py-2 italic">
              <div>Wallet balance</div>
              <div className="text-green-500">
                ₦ {formatNumber(wb ?? 0, 'NGN', {})}
              </div>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between py-2 text-md italic font-bold text-red-600">
              <div>Amount to fund:</div>
              <div>
                ₦{' '}
                {formatNumber(
                  AMOUNT_PER_HIRE * (noOfHires ?? 1) - (wb ?? 1),
                  'NGN',
                  {},
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <label className="block text-lg font-medium mb-2">
          Fund Wallet Amount
        </label>

        <Formik
          onSubmit={() => {}}
          initialValues={{
            amount: amt,
          }}
          validate={valid}
        >
          {() => (
            <Form>
              <Field name="amount" as={StyledInput} type="num" />
            </Form>
          )}
        </Formik>
      </div>
    </HandlePayment>
  )
}

export default MatchedCardAppliedItemPayment
{
  /* <div className="grid grid-cols-8 gap-x-2">
              <div className='col-span-7'>
                <Field
                  name="coupoun"
                  as={StyledInput}
                  placeholder="Enter coupoun code"
                />
              </div>
              <div className='col-span-1 mt-2'>
                <button type='button'
                className='border px-2 py-1 rounded-sm'
                >
                  <FiCheck color='green' size={20} />
                </button>
              </div>
            </div> */
}
