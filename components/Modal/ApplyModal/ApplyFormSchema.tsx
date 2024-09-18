import * as Yup from 'yup'

export const ApplyFormSchema = Yup.object().shape({
  exp: Yup.string().required('Experience is required'),
  qual: Yup.string().required('Qualification is required'),
  cv: Yup.string().required('Cv upload is compulsory'),
  country: Yup.string().required('Country is compulsory'),
  state: Yup.string().required('State is compulsory'),
  city: Yup.string().when('country', {
    is: (country: string) => country === 'Nigeria',
    then: Yup.string().required('City is required'),
    otherwise: Yup.string().notRequired(),
  }),
  lga: Yup.string().when('country', {
    is: (country: string) => country === 'Nigeria',
    then: Yup.string().required('LGA is required'),
    otherwise: Yup.string().notRequired(),
  }),
})
