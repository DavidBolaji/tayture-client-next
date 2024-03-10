import { ConfigProvider } from 'antd'
import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik'
import React from 'react'
import dayjs from 'dayjs'
import { educationFormSchema } from './EducationForm'
import { Education } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import InputDateComponent from '../../InputDateComponent'
import StyledInput from '@/components/Form/NomalInput/StyledInput'
import { SelectInput } from '@/components/Form/SelectInput/SelectInput'
import { degree, months } from '@/utils/data'
import FormError from '@/components/FormError/FormError'
import Button from '@/components/Button/Button'
import Spinner from '@/components/Spinner/Spinner'
import { regularFont } from '@/assets/fonts/fonts'
import { useGlobalContext } from '@/Context/store'

const EducationEditForm: React.FC<{ data: Education }> = ({ data }) => {
  const { setUI, setMessage } = useGlobalContext()
  const { mutate, isPending } = useMutation({
    mutationFn: async (arg: Education) => {
      return await Axios.put(`/users/education/me/update/${data.id}`, {
        field: arg.field,
        school: arg.school,
        startMonth: arg.startMonth,
        endMonth: arg.endMonth,
        startYear: String(arg.startYear),
        endYear: String(arg.endYear),
        degree: arg.degree,
      })
    },
    onSuccess: () => {
      setUI((prev) => {
        return {
          ...prev,
          education2Modal: {
            visibility: true,
          },
        }
      })
      setMessage(() => 'Education Updated Successfully')
      window.location.reload()
    },
  })

  const handleClick: any = async (values: Education) => {
    mutate({
      ...values,
    })
  }

  return (
    <Formik
      key={data.id}
      initialValues={{
        school: data?.school ?? '',
        degree: data?.degree ?? '',
        field: data?.field ?? '',
        startMonth: data?.startMonth ?? '',
        startYear: data?.startYear ?? '',
        endMonth: data?.endMonth ?? '',
        endYear: data?.endYear ?? '',
      }}
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
          className={`w-full md:px-10 px-10  ${regularFont.className}`}
          onSubmit={handleSubmit}
        >
          <Field
            name="school"
            as={StyledInput}
            placeholder="School"
            type={'text'}
            text={'School'}
          />

          <div className="mb-[60px] -mt-4">
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
          <div className="grid grid-cols-2 gap-3 mb-6 md:mb-0">
            <div className="col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
              <Field
                name="startMonth"
                as={SelectInput}
                placeholder="Select start month"
                text="Select start month"
                option={months}
              />
            </div>
            <div className="w-full col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 mb-6">
              <div className="col-span-2 sm:col-span-1  md:col-span-1 lg:col-span-1 xl:col-span-1">
                <Field name="startYear">
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
                          // @ts-ignore
                          defaultValue={dayjs(data.startYear, 'YYYY')}
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
          <h3 className="-mt-[12px] ml-1 text-[16px] font-[600]">End date</h3>

          <div className="grid grid-cols-2 gap-3 mt-2 mb-8">
            <div className="col-span-2 sm:col-span-1  md:col-span-1 lg:col-span-1 xl:col-span-1">
              <Field
                name="endMonth"
                as={SelectInput}
                placeholder="Select end month"
                text="Select end month"
                option={months}
              />
            </div>
            <div className="w-full col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 md:mb-6">
              <div className="col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
                <Field name="endYear">
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
                          },
                        }}
                      >
                        <InputDateComponent
                          {...field}
                          showIcon={values.endYear.toString().length > 0}
                          valid={!errors.endYear}
                          defaultValue={dayjs(data.endYear, 'YYYY')}
                          picker="year"
                          // @ts-ignore
                          border={errors.endYear && touched.endYear}
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
              <div className="-mt-4">
                <ErrorMessage name="endYear">
                  {(msg) => <FormError msg={msg} />}
                </ErrorMessage>
              </div>
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

export default EducationEditForm
