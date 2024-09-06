import useAddress from '@/hooks/useAddress'
import { Field, useFormikContext } from 'formik'
import React from 'react'
import { SelectInput } from '../SelectInput/SelectInput'
import useCountry from '@/hooks/useCountry'

const LocationComponent: React.FC<{
  city?: string
  lga?: string
  state: string
  country: string
  disabled?: boolean
}> = ({ country, city: cName, lga: lName, state: sName, disabled = false }) => {
  const { countries, states, fetchStates, setStates } = useCountry()
  const { lga, city, fetchCity, fetchLga, setCity, setLga } = useAddress()
  const {
    handleBlur,
    handleChange,
    setFieldValue,
    setFieldTouched,
    getFieldProps,
    isValidating,
  } = useFormikContext()

  const { value } = getFieldProps(country)

  const isNigeria = value === 'Nigeria'
  return (
    <div className="-mt-4 md:-space-y-3 -space-y-7">
      <div>
        <h3 className={`ml-1 mb-1 text-[14px] font-[600]`}>Location</h3>
        <div>
          {/* <h3 className="mb-1 ml-1 font-[600] text-[14px] md:hidden block">
            Country
          </h3> */}
          <Field
            showSearch
            name={country}
            option={countries}
            overide={true}
            as={SelectInput}
            placeholder={'Select Country'}
            loading={isValidating}
            onChange={(e: any) => {
              handleChange(e)
              setCity([])
              setLga([])
              setStates([])
              fetchStates(e)
              setFieldValue(sName!, '')
              if (isNigeria) {
                setFieldValue(lName!, '')
                setFieldValue(cName!, '')
              }
              setFieldValue(country, e)
            }}
            onBlur={(e: any) => {
              handleBlur(e)
              setFieldTouched(country)
            }}
            disabled={disabled}
          />
        </div>

        <div className="grid md:grid-cols-12 grid-cols-6 md:gap-5 -mt-3 md:space-y-0 -space-y-7">
          <div
            className={isNigeria ? `col-span-6` : `md:col-span-12 col-span-6`}
          >
            <h3 className={`mb-1 ml-1 md:hidden block text-[14px] font-[600] `}>
              State
            </h3>
            <Field
              name={sName}
              option={states}
              overide={true}
              as={SelectInput}
              placeholder={'Select state'}
              onChange={(e: any) => {
                handleChange(e)
                if (isNigeria) {
                  setCity([])
                  setLga([])
                  setFieldValue(cName!, '')
                  setFieldValue(lName!, '')
                  fetchCity(e)
                  fetchLga(e)
                }
                setFieldValue(sName, e)
              }}
              onBlur={(e: any) => {
                handleBlur(e)
                setFieldTouched(sName)
              }}
              disabled={disabled}
            />
          </div>
          {isNigeria && (
            <div className="col-span-6">
              <h3
                className={`mb-1 ml-1 md:hidden block text-[14px] font-[600] `}
              >
                City
              </h3>
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
                  setFieldValue(cName!, e)
                }}
                onBlur={(e: any) => {
                  handleBlur(e)
                  setFieldTouched(cName!)
                }}
              />
            </div>
          )}
        </div>
      </div>

      {isNigeria && (
        <div>
          <h3 className="mb-1 ml-1 font-[600] text-[14px] md:hidden block">
            L.G.A
          </h3>
          <Field
            name={lName}
            option={lga}
            overide={true}
            as={SelectInput}
            placeholder={'Select L.G.A'}
            loading={isValidating}
            onChange={(e: any) => {
              handleChange(e)
              setFieldValue(lName!, e)
            }}
            onBlur={(e: any) => {
              handleBlur(e)
              setFieldTouched(lName!)
            }}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  )
}

export default LocationComponent
