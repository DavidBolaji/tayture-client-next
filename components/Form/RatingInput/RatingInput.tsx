import React from 'react'
import { useFormikContext, ErrorMessage } from 'formik'
import { Rate } from 'antd'
import FormError from '../FormError/FormError'

// Rating mapping: 1 star = 20, 2 stars = 40, 3 stars = 60, etc.
const rateToScale = (value: number) => value * 20

const RatingInput: React.FC<any> = ({ name, placeholder, ...rest }) => {
  const { getFieldProps, setFieldValue } = useFormikContext()

  const fieldProps = getFieldProps(name!)

  const { value } = fieldProps

  const handleRateChange = (value: number) => {
    setFieldValue(name!, rateToScale(value)) // Convert rating to scale
  }

  return (
    <div className="mb-10 gap-3 flex items-center">
      <label className='' >{placeholder}</label>
      {/* Rating component */}
      <Rate
        className='text-orange'
        onChange={handleRateChange}
        value={value ? value / 20 : 0} // Convert back to stars
        // {...rest}
      />
      <ErrorMessage name={name!}>
        {(msg) => <FormError msg={msg} />}
      </ErrorMessage>
    </div>
  )
}

export default RatingInput
