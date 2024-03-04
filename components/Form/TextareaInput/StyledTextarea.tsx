'use client'
import { ErrorMessage, useFormikContext } from 'formik'
import React from 'react'
import FormError from '@/components/FormError/FormError'

import TextareaInput, { ITextarea } from './TextareaInput'

const StyledTextarea: React.FC<ITextarea> = ({ name, ...rest }) => {
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
      <TextareaInput
        {...rest}
        name={name}
        showIcon={value?.length > 0}
        valid={!error}
        loading={isValidating}
        border={
          typeof error !== 'undefined' && error.trim().length < 1 && touched
        }
        onChange={(e) => {
          handleChange(e)
        }}
        onBlur={handleBlur}
      />
      <ErrorMessage name={name!}>
        {(msg) => <FormError msg={msg} />}
      </ErrorMessage>
    </div>
  )
}

export default StyledTextarea
