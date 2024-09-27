import StyledInput from '@/components/Form/NomalInput/StyledInput'
import { Field } from 'formik'
import React from 'react'
import { ICVForm } from '../DraggableSection'

const SkillCvForm:React.FC<ICVForm> = ({name, index}) => {
  return (
    <>
      <Field
        as={StyledInput}
        name={`${name}[${index}].name`}
        placeholder="Skill Name"
      />
      <Field
        as={StyledInput}
        name={`${name}[${index}].scale`}
        placeholder="Skill Level (0-100)"
      />
    </>
  )
}

export default SkillCvForm
