import * as Yup from 'yup'

export const ApplyFormSchema = Yup.object().shape({
  exp: Yup.string().required('Experience is required'),
  qual: Yup.string().required('Qualification is required'),
  cv: Yup.string().notRequired(),
})
