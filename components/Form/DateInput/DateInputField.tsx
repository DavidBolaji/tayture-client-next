import React from 'react'
import { ConfigProvider } from 'antd'
import { ErrorMessage, Field, FieldProps, FormikProps } from 'formik'
import dayjs from 'dayjs'
import InputDateComponent from '@/pages/dashboard/profile/components/InputDateComponent'
import FormError from '@/components/Form/FormError/FormError'
import { selecttheme } from '@/components/cv/data'

interface DateInputFieldProps {
  name: string
  placeholder: string
  text: string
}

export const DateInputField: React.FC<DateInputFieldProps> = ({ name, placeholder, text }) => {
  return (
    <div className="flex-col w-full">
      <Field name={name}>
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
                placeholder={placeholder}
                text={text}
                showIcon={field?.value?.toString()?.length > 0}
                valid={!form.errors[name]}
                picker="year"
                //@ts-ignore
                border={form.errors[name] && form.touched[name]}
                onChange={(e: any) => {
                  form.setFieldValue(name, e.$y)
                }}
                onBlur={(e: any) => form.handleBlur(e)}
              />
            </ConfigProvider>
          </div>
        )}
      </Field>
      <ErrorMessage name={name}>
        {(msg) => <FormError msg={msg} />}
      </ErrorMessage>
    </div>
  )
}