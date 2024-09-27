import { isValidPhoneNumber } from 'react-phone-number-input'
import * as Yup from 'yup'

export const cvSchemaOne = Yup.object().shape({
  name: Yup.string().required('Name is Required'),
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      'Please enter a valid email address',
    )
    .required('Email is required'),
  phone: Yup.string()
    .test('is-valid-phone-number', 'Invalid phone number', function (value) {
      return isValidPhoneNumber(value || '')
    })
    .required('Phone number is required'),
  summary: Yup.string().required('Profile Summary is Required'),
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
  linkedIn: Yup.string() 
    .notRequired()
})

export const cvSchemaTwo = Yup.object().shape({
  skills: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('Required'),
        scale: Yup.number().min(0).max(100).required('Required'),
      }),
    )
    .min(1, 'At least one skill is required'), // Ensures array length is at least 1
})

export const cvSchemaThree = Yup.object().shape({
  education: Yup.array()
    .of(
      Yup.object().shape({
        degree: Yup.string().required('Required'),
        startYear: Yup.string().required('Start year is required'),
        endYear: Yup.string() // Start year as a number
          .required('End year is required')
          .test(
            'startYearBeforeEndYear',
            'End year must be greater than or equal to start year',
            function (startYear) {
              const endYear = +this.parent.startYear
              return +startYear! >= endYear
            },
          ),
        school: Yup.string().required('School is required'),
        more: Yup.string().notRequired(),
      }),
    )
    .min(1, 'At least one Education is required'),
})

export const cvSchemaFour = Yup.object().shape({
  employment: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required('Required'),
        startMonth: Yup.string().required('Month is required'),
        startYear: Yup.string() // Start year as a number
          .required('Year is required'),
        endMonth: Yup.string().required('Month is required'),
        endYear: Yup.string() // Start year as a number
          .required('Year is required')
          .test(
            'startYearBeforeEndYear2',
            'End year must be greater than or equal to start year',
            function (startYear) {
              const endYear = +this.parent.startYear
              return +startYear! >= endYear
            },
          ),
         
        location: Yup.string().required('Location is required'),
        roles: Yup.array().of(Yup.string().required('Role is required')),
      }),
    )
    .min(1, 'At least one Employement is required'),
})

export const cvSchemaSix = Yup.object().shape({
  certificates: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Certificate name is required'),
      startMonth: Yup.string().required('Month is required'),
      startYear: Yup.string() // Start year as a number
        .required('Year is required'),
      issuer: Yup.string().required('Issuer is required'),
      link: Yup.string().notRequired()
    }),
  ),
})

export const cvSchemafive = Yup.object().shape({
  languages: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Language name is required'),
    }),
  ),
})

export const cvSchemaSeven = Yup.object().shape({
  hobbies: Yup.array().of(Yup.object().shape({ name: Yup.string() })),
})
