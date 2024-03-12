import useAddress from '@/hooks/useAddress'
import { Field, useFormikContext } from 'formik'
import React from 'react'
import { SelectInput } from '../SelectInput/SelectInput'

const LocationComponent: React.FC<{
  city: string
  lga: string
  state: string
  disabled?: boolean
}> = ({ city: cName, lga: lName, state: sName, disabled = false }) => {
  const { states, lga, city, fetchCity, fetchLga, setCity, setLga } =
    useAddress()
  const {
    handleBlur,
    handleChange,
    setFieldValue,
    setFieldTouched,
    isValidating,
  } = useFormikContext()
  return (
    <div className="">
      <h3 className="ml-1 mb-1">Location</h3>
      <div className="grid md:grid-cols-12 grid-cols-6 md:gap-5">
        <div className="col-span-6">
          <Field
            name={sName}
            option={states}
            overide={true}
            as={SelectInput}
            placeholder={'Select state'}
            onChange={(e: any) => {
              handleChange(e)
              setCity([])
              setLga([])
              setFieldValue(cName, '')
              setFieldValue(lName, '')
              setFieldValue(sName, e)
              fetchCity(e)
              fetchLga(e)
            }}
            onBlur={(e: any) => {
              handleBlur(e)
              setFieldTouched(sName)
            }}
            disabled={disabled}
          />
        </div>
        <div className="col-span-6">
          <h3 className="mb-1 ml-1 sm:hidden block">City</h3>
          <Field
            name={cName}
            disabled={disabled}
            option={city}
            overide={true}
            as={SelectInput}
            loading={isValidating}
            placeholder={'Select City'}
            onChange={(e: any) => {
              handleChange(e)
              setFieldValue(cName, e)
            }}
            onBlur={(e: any) => {
              handleBlur(e)
              setFieldTouched(cName)
            }}
          />
        </div>
      </div>

      <h3 className="mb-1 ml-1 md:hidden block">L.G.A</h3>
      <Field
        name={lName}
        option={lga}
        overide={true}
        as={SelectInput}
        placeholder={'Select L.G.A'}
        loading={isValidating}
        onChange={(e: any) => {
          handleChange(e)
          setFieldValue(lName, e)
        }}
        onBlur={(e: any) => {
          handleBlur(e)
          setFieldTouched(lName)
        }}
        disabled={disabled}
      />
    </div>
  )
}

export default LocationComponent
