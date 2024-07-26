import React from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { Field, Form, Formik } from 'formik'
import DateInput from '@/components/Form/DateInput/DateInput'
import * as Yup from 'yup'
import Button from '@/components/Button/Button'
import Spinner from '@/components/Spinner/Spinner'
import  useDownloadCSV  from '../../hooks/useDownloadCSV'

dayjs.extend(utc)
dayjs().utcOffset('local')

export const ValidationSchema = Yup.object().shape({
  start: Yup.date().required('Start date is required'),
  end: Yup.date()
    .required('End date is required')
    .min(Yup.ref('start'), 'End date must be later than start date'),
})

const AppliedSection = () => {
  const { isPending, handleSubmit } = useDownloadCSV()

  return (
    <div>
      <h2 className="mb-4 ml-1 uppercase">Download CSV</h2>
      <Formik
        enableReinitialize
        validateOnMount
        onSubmit={handleSubmit}
        validationSchema={ValidationSchema}
        initialValues={{
          start: '',
          end: '',
        }}
      >
        {({ handleSubmit, isValid }) => (
          <Form onSubmit={handleSubmit} className="w-96 -space-y-4">
            <div>
              <label htmlFor="start" className="ml-1">
                Start Date
              </label>
              <Field
                name="start"
                as={DateInput}
                picker="date"
                placeholder="MM/DD/YYYY"
              />
            </div>
            <div>
              <label htmlFor="end" className="ml-1">
                End Date
              </label>
              <Field
                name="end"
                as={DateInput}
                picker="date"
                placeholder="MM/DD/YYYY"
              />
            </div>
            <Button
              disabled={!isValid}
              bold={false}
              hover={isValid}
              text={isPending ? <Spinner /> : 'Submit'}
              render="light"
              full={false}
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AppliedSection
