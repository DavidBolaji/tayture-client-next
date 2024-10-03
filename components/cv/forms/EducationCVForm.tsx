import FormError from '@/components/Form/FormError/FormError'
import { SelectInput } from '@/components/Form/SelectInput/SelectInput'
import { degree } from '@/utils/data'
import { ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import { ErrorMessage, Field, FieldProps, FormikProps } from 'formik'
import React from 'react'
import { ICVForm } from '../DraggableSection'
import InputDateComponent from '@/pages/dashboard/profile/components/InputDateComponent'
import StyledInput from '@/components/Form/NomalInput/StyledInput'
import { selecttheme } from '../data'


const EducationCVForm: React.FC<ICVForm> = ({ name, index }) => {
  return (
    <>
      <Field
        name={`${name}[${index}].degree`}
        as={SelectInput}
        placeholder="Minimum educational qualification"
        text="Minimum educational qualification"
      
        option={degree}
      />
      <div className="flex gap-x-3 mb-8">
        <div className="flex-col w-full">
          <Field name={`${name}[${index}].startYear`}>
            {({
              field,
              form,
            }: {
              field: FieldProps['field']
              form: FormikProps<any>
            }) => (
              <div className="">
                <ConfigProvider theme={selecttheme}>
                  <InputDateComponent
                    {...field}
                    defaultValue={
                      field.value
                        ? dayjs(String(field.value), 'YYYY')
                        : undefined
                    }
                     placeholder="Select Start Year"
                    text="Select Start Year"
                    showIcon={field?.value?.toString()?.length > 0}
                    valid={!form.errors.startYear}
                    picker="year"
                    //@ts-ignore
                    border={form.errors.startYear && form.touched.startYear}
                    onChange={(e: any) => {
                      form.setFieldValue(`${name}[${index}].startYear`, e.$y)
                    }}
                    onBlur={(e: any) => form.handleBlur(e)}
                  />
                </ConfigProvider>
              </div>
            )}
          </Field>
          <ErrorMessage name={`${name}[${index}].startYear`}>
            {(msg) => <FormError msg={msg} />}
          </ErrorMessage>
        </div>
        <div className="flex-col w-full">
          <Field name={`${name}[${index}].endYear`}>
            {({
              field,
              form,
            }: {
              field: FieldProps['field']
              form: FormikProps<any>
            }) => (
              <div className="">
                <ConfigProvider theme={selecttheme}>
                  <InputDateComponent
                    {...field}
                    defaultValue={
                      field.value
                        ? dayjs(String(field.value), 'YYYY')
                        : undefined
                    }
                     placeholder="Select End Year"
                    text="Select End Year"
                    showIcon={field?.value?.toString()?.length > 0}
                    valid={!form.errors.endYear}
                    picker="year"
                    //@ts-ignore
                    border={form.errors.endYear && form.touched.endYear}
                    onChange={(e: any) => {
                      form.setFieldValue(`${name}[${index}].endYear`, e.$y)
                    }}
                    onBlur={(e: any) => form.handleBlur(e)}
                  />
                </ConfigProvider>
              </div>
            )}
          </Field>
          <ErrorMessage name={`${name}[${index}].endYear`}>
            {(msg) => <FormError msg={msg} />}
          </ErrorMessage>
        </div>
      </div>
      <Field
        as={StyledInput}
        name={`${name}[${index}].school`}
        placeholder="Enter School Name"
      />
      <Field
        as={StyledInput}
        name={`${name}[${index}].more`}
        placeholder="Additional Information"
      />
    </>
  )
}

export default EducationCVForm
