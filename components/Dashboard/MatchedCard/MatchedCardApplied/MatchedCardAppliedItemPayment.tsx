import { regularFont } from '@/assets/fonts/fonts'
import StyledInput from '@/components/Form/NomalInput/StyledInput'
import HandlePayment from '@/components/Modal/HandlePayment'
import { useMatchedContet } from '@/Context/matchedCard/matched-card-context'
import { useGlobalContext } from '@/Context/store'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { FaCircleInfo } from 'react-icons/fa6'

const MatchedCardAppliedItemPayment = () => {
  const { hasBeenPaidfor, jobId, wb, transaction, amountFinal, schoolId, amt, setAmt, fundWallet, complete, noOfHires, curAppCount } =
    useMatchedContet()
  const { setMessage } = useGlobalContext()
  const [valid1, setValid] = useState(+String(amt).trim().length < 1)

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
      errors.amount = `Amount cannot be less than ${Math.abs(wb! - amountFinal!)}`
    }
    return errors
  }

  return (
    <HandlePayment
      onSuccess={onSuccess}
      onFailure={onFailure}
      amount={+amt!}
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
          onSubmit={() => {}}
          initialValues={{
            amount: amt,
            // coupoun: '',
          }}
          validate={valid}
        >
          {({}) => (
            <Form>
              <Field name="amount" as={StyledInput} type="num" />
              {/* <div className="grid grid-cols-8 gap-x-2">
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
            </div> */}
            </Form>
          )}
        </Formik>
      </div>
    </HandlePayment>
  )
}

export default MatchedCardAppliedItemPayment
