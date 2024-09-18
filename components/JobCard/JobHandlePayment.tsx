import React from 'react'
import HandlePayment from '../Modal/HandlePayment'
import { regularFont } from '@/assets/fonts/fonts'
import { Field, Form, Formik } from 'formik'
import StyledInput from '../Form/NomalInput/StyledInput'
import { FaCircleInfo } from 'react-icons/fa6'
import { useGlobalContext } from '@/Context/store'

interface IJobHandlePayment {
  onSuccess: () => void;
  onFailure: () => void;
  amt: number;
  valid: (values: any) => { amount?: string };
  setAmt: (amt: any) => void;
  paymentValid: boolean;
  wb: number
}

const JobHandlePayment: React.FC<IJobHandlePayment> = ({
  onFailure,
  onSuccess,
  amt,
  valid,
  setAmt,
  paymentValid,
  wb
}) => {
    const { ui } = useGlobalContext()
    

  return (
    <HandlePayment
      onSuccess={onSuccess}
      onFailure={onFailure}
      amount={+amt}
      valid={paymentValid}
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
              <Field
                onChange={handleSubmit}
                name="amount"
                as={StyledInput}
                type="num"
              />
            </Form>
          )}
        </Formik>
      </div>
    </HandlePayment>
  )
}

export default JobHandlePayment
