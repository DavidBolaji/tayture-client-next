
import { SelectInput } from '@/components/Form/SelectInput/SelectInput'
import { degree } from '@/utils/data'
import { Field } from 'formik'
import React from 'react'
import { ICVForm } from '../DraggableSection'

import StyledInput from '@/components/Form/NomalInput/StyledInput'
import { DateInputField } from '@/components/Form/DateInput/DateInputField'

const EducationCVForm: React.FC<ICVForm> = ({ name, index }) => {
  return (
    <>
      <Field
        name={`${name}[${index}].degree`}
        as={SelectInput}
        placeholder="Qualification"
        text="Qualification"
        option={degree}
      />
      <div className="flex gap-x-3 mb-8">
        <DateInputField
          name={`${name}[${index}].startYear`}
          placeholder="Select Start Year"
          text="Select Start Year"
        />
        <DateInputField
          name={`${name}[${index}].endYear`}
          placeholder="Select End Year"
          text="Select End Year"
        />
      </div>
      <Field
        as={StyledInput}
        name={`${name}[${index}].school`}
        placeholder="Enter School Name"
      />
      <Field
        as={StyledInput}
        name={`${name}[${index}].more`}
        placeholder="Additional Information"
      />
    </>
  )
}

export default EducationCVForm
