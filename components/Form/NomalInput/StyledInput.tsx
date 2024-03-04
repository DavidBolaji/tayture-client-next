'use client'
import { ErrorMessage, useFormikContext } from 'formik'
import InputComponent, { InputProps } from './InputComponent'
import React, { useState } from 'react'
import FormError from '@/components/FormError/FormError'
import { isNotNumber, isNotText } from '@/utils/helpers'

const StyledInput: React.FC<InputProps> = ({ name, ...rest }) => {
  const {
    getFieldProps,
    handleBlur,
    handleChange,
    getFieldMeta,
    isValidating,
  } = useFormikContext()

  const fieldProps = getFieldProps(name!)
  const { error, touched } = getFieldMeta(name!)

  if (!fieldProps) {
    return null
  }

  const { value } = fieldProps

  return (
    <div className="mb-10">
      <InputComponent
        name={name}
        showIcon={value?.length > 0}
        valid={!error}
        loading={isValidating}
        {...rest}
        border={
          typeof error !== 'undefined' && error.trim().length < 1 && touched
        }
        onChange={(e) => {
          if (rest.type === 'num') {
            if (!isNotNumber(e.target.value) || e.target.value === '') {
              handleChange(e)
            }
          } else if (rest.type === 'text') {
            if (!isNotText(e.target.value) || e.target.value === '') {
              handleChange(e)
            }
          } else {
            handleChange(e)
          }
        }}
        onBlur={handleBlur}
      />
      <ErrorMessage name={name!}>
        {(msg) => <FormError msg={msg} />}
      </ErrorMessage>
    </div>
  )
}

export default StyledInput
