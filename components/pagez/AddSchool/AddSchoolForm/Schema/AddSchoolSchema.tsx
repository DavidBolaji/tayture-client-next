import { isValidPhoneNumber } from 'react-phone-number-input'
import * as Yup from 'yup'
export const AddSchoolSchema = Yup.object().shape({
  sch_name: Yup.string().required('Name is required'),
  sch_no_emp: Yup.string().required('Number of employees is required'),
  sch_state: Yup.string().required('State is required'),
  sch_city: Yup.string().required('City is required'),
  sch_lga: Yup.string().required('LGA is required'),
  sch_address: Yup.string().required('Address is required'),
  sch_url: Yup.string()
    .matches(
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+)(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;%=]*)?$/,
      'Invalid website url',
    )
    .notRequired(),
  sch_phone: Yup.string()
    .test('is-valid-phone-number', 'Invalid phone number', function (value) {
      return isValidPhoneNumber(value || '')
    })
    .required('Phone number is required'),
})
