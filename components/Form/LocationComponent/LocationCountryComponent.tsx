
import { Field, useFormikContext } from 'formik'
import React from 'react'
import { SelectInput } from '../SelectInput/SelectInput'
import useCountry from '@/hooks/useCountry'

const LocationCountryComponent: React.FC<{
  country: string
  state: string
  disabled?: boolean
}> = ({ country, state: sName, disabled = false }) => {
  const { countries, fetchStates, states } = useCountry()
  const {
    handleBlur,
    handleChange,
    setFieldValue,
    setFieldTouched,
    isValidating,
  } = useFormikContext()
  return (
    <div className="-mt-4 md:-space-y-3 -space-y-7">
      <div>
        <h3 className={`ml-1 mb-1 text-[14px] font-[600]`}>Location</h3>
        <div className="grid md:grid-cols-12 grid-cols-6 md:gap-5 md:space-y-0 -space-y-7">
          <div className="col-span-6">
            <Field
              name={country}
              option={countries}
              overide={true}
              as={SelectInput}
              showSearch
              placeholder={'Select Country'}
              onChange={(e: any) => {
                handleChange(e)
                setFieldValue(sName, '')
                setFieldValue(country, e)
                fetchStates(e)
              }}
              onBlur={(e: any) => {
                handleBlur(e)
                setFieldTouched(country)
              }}
              disabled={disabled}
            />
          </div>
          <div className="col-span-6">
            <h3 className={`mb-1 ml-1 md:hidden block text-[14px] font-[600] `}>
              State
            </h3>
            <Field
              name={sName}
              disabled={disabled}
              option={states}
              overide={true}
              as={SelectInput}
              loading={isValidating}
              placeholder={'Select State'}
              onChange={(e: any) => {
                handleChange(e)
                setFieldValue(sName, e)
              }}
              onBlur={(e: any) => {
                handleBlur(e)
                setFieldTouched(sName)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationCountryComponent
