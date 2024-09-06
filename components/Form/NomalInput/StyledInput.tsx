'use client'
import { ErrorMessage, useFormikContext } from 'formik'
import InputComponent, { InputProps } from './InputComponent'
import React, { useState } from 'react'
import FormError from '@/components/Form/FormError/FormError'
import { isNotNumber, isNotText } from '@/utils/helpers'
import { usePathname } from 'next/navigation'
import ForgotDrawer from './ForgotDrawer'

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
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const onClose = () => {
    setOpen(false)
  }
  const showDrawer = () => {
    setOpen(true)
  }

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
          } else  {
            handleChange(e)
          }
        }}
        onBlur={handleBlur}
      />
      <div className={`flex justify-between items-center ${name === 'password' ? 'flex-row-reverse' : ''} `}>
      {name === 'password' && pathname !== '/auth/register' && (
        <div className="text-xs text-orange flex justify-end mt-1 cursor-pointer"
        onClick={showDrawer}
        >
          Forgot password ?
        </div>
      )}
      <ErrorMessage name={name!}>
        {(msg) => <FormError msg={msg} />}
      </ErrorMessage>
      </div>
      <ForgotDrawer open={open} onClose={onClose} />
    </div>
  )
}

export default StyledInput
