'use client'
import { regularFont } from '@/assets/fonts/fonts'
import FormError from '@/components/FormError/FormError'
import { DatePicker } from 'antd'
import { ErrorMessage, useFormikContext } from 'formik'
import React, { FC } from 'react'
import styled from '@emotion/styled'

const StyledDatePicker = styled(DatePicker)`
  && > * {
    padding: 3px !important;
  }
  border: 0px solid red;
  border-radius: 10px;
`

const DateInput: FC<{
  name: string
  format: string
  picker: 'date' | 'year'
  defaultValue?: any
  disabled: boolean
}> = ({ name, format, picker, defaultValue, disabled }) => {
  const {
    getFieldProps,
    handleBlur,
    setFieldTouched,
    getFieldMeta,
    setFieldValue,
  } = useFormikContext()

  const fieldProps = getFieldProps(name!)
  const { error, touched } = getFieldMeta(name!)

  if (!fieldProps) {
    return null
  }

  return (
    <div className="mb-10">
      <div
        className={`focus-within:border-orange border-2 rounded-[0.625rem] ${
          error && touched && 'border-[#b3261e] border-2'
        }`}
      >
        <StyledDatePicker
          key={defaultValue}
          format={format}
          picker={picker}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={(_, dateString) => {
            setFieldValue(name, dateString)
          }}
          onBlur={(e) => {
            setFieldTouched(name)
          }}
          className={`w-full px-3 py-3${regularFont.className}`}
        />
      </div>
      <ErrorMessage name={name!}>
        {(msg) => <FormError msg={msg} />}
      </ErrorMessage>
    </div>
  )
}

export default DateInput
