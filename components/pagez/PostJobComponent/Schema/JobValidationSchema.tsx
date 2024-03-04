import * as Yup from 'yup'
export const jobValidationSchema = Yup.object().shape({
  job_role: Yup.string().required('Job role category is required'),
  job_active: Yup.string().required('Job role name is required'),
  job_qual: Yup.string().required('Job qualification is required'),
  job_exp: Yup.string().required('Job experience is required'),
  job_resumption: Yup.string().required('Job resumption date is required'),
  job_title: Yup.string().required('Job title is required'),
  job_desc: Yup.string().notRequired(),
  job_min_sal: Yup.string().required('Salary is required'),
  job_max_sal: Yup.string() // Start year as a number
    .required('Salary is required')
    .test(
      'startYearBeforeEndYear',
      'Max salary must be greater than or equal Min salary',
      function (maxSal) {
        const minSal = +this.parent.job_min_sal
        return +maxSal! >= minSal
      },
    ),
  job_no_hires: Yup.string()
    .required('No of hires is required')
    .test(
      'is-not-less-than-one',
      "Number of hires can't be less than one",
      function (value) {
        return typeof value !== 'undefined' && +value > 0
      },
    ),
})
