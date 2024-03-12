import React from 'react'
import PhoneInput from 'react-phone-number-input'
import styled from '@emotion/styled'
import 'react-phone-number-input/style.css'
import { ErrorMessage, useFormikContext } from 'formik'
import FormError from '@/components/Form/FormError/FormError'
import { MdOutlineError } from 'react-icons/md'
import { HiCheckCircle } from 'react-icons/hi'
import { AnimatePresence, motion } from 'framer-motion'

export const StyledInput = styled(PhoneInput)`
  input {
    border-color: #d9d9d9;
    border-width: 1;
    outline: none;
  }
  background-color: #fff;

  input[type='tel']:focus {
    outline: none;
    box-shadow: none;
    border-color: #d9d9d9 !important;
    border-width: 1 !important;
  }
  padding-left: 10px;
`

const CustomPhoneInput: React.FC<{ name: string; disabled?: boolean }> = ({
  name,
  disabled,
}) => {
  const { getFieldProps, handleBlur, setFieldValue, getFieldMeta } =
    useFormikContext()

  const fieldProps = getFieldProps(name!)
  const { error, touched } = getFieldMeta(name!)

  if (!fieldProps) {
    return null
  }

  const { value } = fieldProps

  const handleChange = (value: string) => {
    const stringValue =
      value === undefined || value === null ? '' : String(value)
    setFieldValue(name, stringValue || '')
  }

  return (
    <div className="mb-12">
      <div
        className={`focus-within:border-orange border-2 rounded-[0.625rem] ${
          error && touched && 'border-[#b3261e] border-2'
        }`}
      >
        <AnimatePresence mode="wait">
          {value?.trim().length > 0 && (
            <motion.h2
              key={name}
              initial={{
                y: 11,
              }}
              animate={{
                y: -27,
              }}
              exit={{
                y: 11,
              }}
              className={`-translate-y-7 font-[600] absolute text-[14px] w-full flex justify-start ml-0.5 h-3 ${
                touched && ''
              } `}
            >
              Phone
            </motion.h2>
          )}
        </AnimatePresence>

        <div className="relative">
          <StyledInput
            name={name}
            international
            defaultCountry="NG"
            countryCallingCodeEditable={false}
            onChange={handleChange}
            value={value}
            onBlur={handleBlur}
            readOnly={disabled}
            className={`px-2 py-3 w-full  border-2 border-red-400 rounded-lg border-none`}
          />
          <div>
            {!error && touched && (
              <span className="text-[18px] opacity-50 absolute right-4 top-1/2 transition-transform duration-300 ease-in-out group-focus:-translate-y-6 transform translate-y-[-50%] flex items-center">
                <HiCheckCircle color="#34C759" />
              </span>
            )}
            {error && (
              <span className=" text-[18px]  absolute right-4 top-1/2 transition-transform duration-300 ease-in-out group-focus:-translate-y-6 transform translate-y-[-50%] flex items-center">
                <MdOutlineError color="#B3261E" />
              </span>
            )}
          </div>
        </div>
      </div>
      <ErrorMessage name={name!}>
        {(msg) => <FormError msg={msg} />}
      </ErrorMessage>
    </div>
  )
}

export default CustomPhoneInput
