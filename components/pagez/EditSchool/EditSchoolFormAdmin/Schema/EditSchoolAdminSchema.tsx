import { isValidPhoneNumber } from 'react-phone-number-input'
import * as Yup from 'yup'
export const validationSchema = Yup.object().shape({
  participants: Yup.array().of(
    Yup.object().shape({
      sch_admin_name: Yup.string().required('Name is required'),
      sch_admin_phone: Yup.string()
        .required('Phone number is required')
        .test('isValidNumber', 'Invalid phone number', (adminNo) =>
          isValidPhoneNumber(adminNo || ''),
        ),
      sch_admin_email: Yup.string()
        .matches(
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          'Invalid email format',
        )
        .required('Email is required'),
    }),
  ),
})
