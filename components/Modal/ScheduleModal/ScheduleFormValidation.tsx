import * as Yup from 'yup'

export const scheduleValidationSchema = Yup.object().shape({
  date: Yup.string().required('Date is required'),
  time: Yup.string().required('Time is required'),
  mode: Yup.string().required('Mode of interview is required'),
  country: Yup.string().required('Country is compulsory'),
  state: Yup.string().when(['mode'], {
    is: (mode: string) => mode === 'in-person',
    then: Yup.string().required('State is required'),
    otherwise: Yup.string().notRequired(),
  }),
  city: Yup.string().when(['mode', 'country'], {
    is: (mode: string, country: string) => mode === 'in-person' && country === 'Nigeria',
    then: Yup.string().required('City is required'),
    otherwise: Yup.string().notRequired(),
  }),
  lga: Yup.string().when(['mode', 'country'], {
    is: (mode: string, country: string) => mode === 'in-person' && country === 'Nigeria',
    then: Yup.string().required('Lga is required'),
    otherwise: Yup.string().notRequired(),
  }),
  address: Yup.string().when(['mode'], {
    is: (mode: string) => mode === 'in-person',
    then: Yup.string().required('Address is required'),
    otherwise: Yup.string().notRequired(),
  }),
  link: Yup.string()
    .matches(
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+)(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;%=]*)?$/,
      'Invalid website url',
    )
    .when(['mode'], {
      is: (mode: string) => mode === 'virtual',
      then: Yup.string().required('Link is required'),
      otherwise: Yup.string().notRequired(),
    }),
  reminder: Yup.boolean().notRequired(),
  instruction: Yup.array().notRequired(),
})
