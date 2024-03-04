import { Field, useFormikContext } from 'formik'
import React, { FC } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import StyledInput from '../NomalInput/StyledInput'

const CounterInput: FC<{ name: string }> = ({ name, ...rest }) => {
  const { getFieldProps, getFieldMeta, setFieldValue } = useFormikContext()

  const fieldProps = getFieldProps(name!)
  const { error, value } = getFieldMeta(name!)

  if (!fieldProps) {
    return null
  }

  return (
    <div className="">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className={`bg-orange flex items-center justify-center p-1 rounded-full ${
            error ? '-mt-16' : '-mt-10'
          } `}
          onClick={() => {
            if ((rest as any).preview === 'true') return
            if (+(value as string) - 1 === 0) {
              return
            }
            setFieldValue('job_no_hires', +(value as string) - 1)
          }}
        >
          <FaMinus color="white" size={12} />
        </button>
        <div className="">
          <Field
            name={name}
            as={StyledInput}
            {...rest}
            min={1}
            max={10}
            maxLength={1}
          />
        </div>
        <button
          type="button"
          className={`bg-orange flex items-center justify-center p-1 rounded-full ${
            error ? '-mt-16' : '-mt-10'
          } `}
          onClick={() => {
            if ((rest as any).preview === 'true') return
            if (+(value as string) + 1 <= 10) {
              setFieldValue('job_no_hires', +(value as string) + 1)
            }
          }}
        >
          <FaPlus color="white" size={12} />
        </button>
      </div>
    </div>
  )
}

export default CounterInput
