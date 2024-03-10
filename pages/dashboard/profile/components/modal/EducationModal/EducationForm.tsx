import Button from '@/components/Button/Button'
import StyledInput from '@/components/Form/NomalInput/StyledInput'
import { SelectInput } from '@/components/Form/SelectInput/SelectInput'
import FormError from '@/components/FormError/FormError'
import Spinner from '@/components/Spinner/Spinner'
import { degree, months } from '@/utils/data'
import { ConfigProvider } from 'antd'
import {
  ErrorMessage,
  Field,
  FieldProps,
  Form,
  Formik,
  FormikHelpers,
} from 'formik'
import React from 'react'
import * as Yup from 'yup'
import InputDateComponent from '../../InputDateComponent'
import { regularFont } from '@/assets/fonts/fonts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { useGlobalContext } from '@/Context/store'

export const educationInitials = {
  school: '',
  degree: '',
  startMonth: '',
  startYear: '',
  endMonth: '',
  endYear: '',
  field: '',
}

export const educationFormSchema = Yup.object().shape({
  school: Yup.string().required('School is required'),
  degree: Yup.string().required('Degree is required'),
  field: Yup.string().required('Field is required'),
  startMonth: Yup.string().required('Month is required'),
  startYear: Yup.string() // Start year as a number
    .required('Year is required'),
  endMonth: Yup.string().required('Month is required'),
  endYear: Yup.string() // Start year as a number
    .required('Year is required')
    .test(
      'startYearBeforeEndYear',
      'End year must be greater than or equal to start year',
      function (startYear) {
        const endYear = +this.parent.startYear
        return +startYear! >= endYear
      },
    ),
})

const EducationForm: React.FC = () => {
  const queryClient = useQueryClient()
  const { setUI, setMessage } = useGlobalContext()
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      return Axios.post('/users/education/me', data)
    },
    onSuccess: () => {
      setUI((prev) => {
        return {
          ...prev,
          educationModal: {
            ...prev.educationModal,
            visibility: false,
          },
        }
      })
      setMessage(() => 'Education added Successfully')
      queryClient.invalidateQueries({
        queryKey: ['user'],
      })
      window.location.reload()
    },
  })

  const handleClick: any = async (
    values: any,
    { resetForm }: FormikHelpers<any>,
  ) => {
    mutate({ ...values })
    resetForm()
  }

  return (
    <Formik
      initialValues={educationInitials}
      onSubmit={handleClick}
      validationSchema={educationFormSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
        setFieldValue,
      }) => (
        <Form
          className={`w-full md:px-10 px-10 ${regularFont.className}`}
          onSubmit={handleSubmit}
        >
          <Field
            name="school"
            as={StyledInput}
            placeholder="School"
            type={'text'}
            text={'School'}
          />

          <div>
            <label
              className={`mb-1 font-bold inline-block ml-1 ${regularFont.className}`}
            >
              Degree
            </label>

            <Field
              name="degree"
              as={SelectInput}
              placeholder="Minimum educational qualification"
              text="Minimum educational qualification"
              option={degree}
            />
          </div>

          <Field
            name="field"
            as={StyledInput}
            text="Field of study"
            placeholder="Field of study"
          />

          <h3 className="mb-2 ml-1 text-[16px] font-[600]">Start date</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
              <Field
                name="startMonth"
                as={SelectInput}
                placeholder="Select start month"
                text="Select start month"
                option={months}
              />
            </div>
            <div className="w-full col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
              <div className="col-span-2 sm:col-span-1  md:col-span-1 lg:col-span-1 xl:col-span-1">
                <Field name="startYear">
                  {/* FormikProps<YourFormValues>  */}
                  {({ field }: { field: FieldProps['field'] }) => (
                    <div className="">
                      <ConfigProvider
                        theme={{
                          token: {
                            controlOutline: '#FFA466',
                            colorLinkHover: 'none',
                            colorPrimaryHover: 'none',
                            colorBorder: 'transparent',
                            colorPrimary: '#FF7517',
                          },
                        }}
                      >
                        <InputDateComponent
                          {...field}
                          showIcon={values.startYear.toString().length > 0}
                          valid={!errors.startYear}
                          picker="year"
                          // @ts-ignore
                          border={errors.edu_startYear && touched.startYear}
                          // @ts-ignore
                          onChange={(e: any) => {
                            setFieldValue('startYear', e.$y)
                          }}
                          onBlur={(e: any) => {
                            handleBlur(e)
                          }}
                        />
                      </ConfigProvider>
                    </div>
                  )}
                </Field>
              </div>
              <div className="-mt-4">
                <ErrorMessage name="startYear">
                  {(msg) => <FormError msg={msg} />}
                </ErrorMessage>
              </div>
            </div>
          </div>
          <h3 className="ml-1 text-[16px] font-[600]">End date</h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 sm:col-span-1  md:col-span-1 lg:col-span-1 xl:col-span-1">
              <Field
                name="endMonth"
                as={SelectInput}
                placeholder="Select end month"
                text="Select end month"
                option={months}
              />
            </div>
            <div className="w-full col-span-2 sm:col-span-1 dsm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 mb-6">
              <div className="col-span-2 sm:col-span-1 dsm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
                <Field name="endYear">
                  {({ field }: { field: FieldProps['field'] }) => (
                    <div className="">
                      <ConfigProvider
                        theme={{
                          token: {
                            controlOutline: '#FFA466',
                            colorLinkHover: 'none',
                            colorPrimaryHover: 'none',
                            colorBorder: 'transparent',
                            colorPrimary: '#FF7517',
                          },
                        }}
                      >
                        <InputDateComponent
                          {...field}
                          showIcon={values.endYear.toString().length > 0}
                          valid={!errors.endYear}
                          picker="year"
                          // @ts-ignore
                          border={errors.endYear && touched.endYear}
                          // @ts-ignore
                          onChange={(e: any) => {
                            console.log(e.$y)
                            setFieldValue('endYear', e.$y)
                          }}
                          onBlur={(e: any) => {
                            handleBlur(e)
                          }}
                        />
                      </ConfigProvider>
                    </div>
                  )}
                </Field>
              </div>
              <ErrorMessage name="endYear">
                {(msg) => <FormError msg={msg} />}
              </ErrorMessage>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              disabled={
                isSubmitting ||
                // loading ||
                !isValid
              }
              bold={false}
              hover={isSubmitting || !isValid}
              text={isPending ? <Spinner /> : 'Submit'}
              render="light"
              full={false}
              type="submit"
            />
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default EducationForm
