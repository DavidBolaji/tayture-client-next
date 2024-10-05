import StyledInput from '@/components/Form/NomalInput/StyledInput'
import { Field } from 'formik'
import React from 'react'
import { ICVForm } from '../DraggableSection'
import RatingInput from '@/components/Form/RatingInput/RatingInput'

const SkillCvForm:React.FC<ICVForm> = ({name, index}) => {
  return (
    <>
      <Field
        as={StyledInput}
        name={`${name}[${index}].name`}
        placeholder="Skill Name"
      />
      <Field
        as={RatingInput}
        name={`${name}[${index}].scale`}
        placeholder="Skill Level"
      />
    </>
  )
}

export default SkillCvForm
