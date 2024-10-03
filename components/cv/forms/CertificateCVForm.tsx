import React from 'react'
import { ICVForm } from '../DraggableSection'
import StyledInput from '@/components/Form/NomalInput/StyledInput'
import { ErrorMessage, Field, FieldProps, FormikProps } from 'formik'
import { SelectInput } from '@/components/Form/SelectInput/SelectInput'
import { months } from '@/utils/data'
import { selecttheme } from '../data'
import { ConfigProvider } from 'antd'
import InputDateComponent from '@/pages/dashboard/profile/components/InputDateComponent'
import dayjs from 'dayjs'
import FormError from '@/components/Form/FormError/FormError'

const CertificateCVForm: React.FC<ICVForm> = ({ name, index }) => {
  return (
    <>
      <Field
        as={StyledInput}
        name={`${name}[${index}].name`}
        placeholder="Certificate Name"
      />
      <h3 className="mb-2 ml-1 text-[16px] font-[600]">Start date</h3>
      <div className="grid md:grid-cols-2 md:gap-3 mb-6 md:mb-0">
        <div className="col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
          <Field
            name={`${name}[${index}].startMonth`}
            as={SelectInput}
            placeholder="Select start month"
            text="Select start month"
            option={months}
          />
        </div>
        <h3 className="mb-1 ml-1 text-[16px] -mt-6 font-[600] md:hidden block">
          Start year
        </h3>
        <div className="w-full col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 mb-6">
          <div className="col-span-2 sm:col-span-1  md:col-span-1 lg:col-span-1 xl:col-span-1">
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
          </div>

          <div className="-mt-4">
            <ErrorMessage name={`${name}[${index}].startYear`}>
              {(msg) => <FormError msg={msg} />}
            </ErrorMessage>
          </div>
        </div>
      </div>
      <Field
        as={StyledInput}
        name={`${name}[${index}].issuer`}
        placeholder="Issuer"
      />
      <Field
        as={StyledInput}
        name={`${name}[${index}].link`}
        placeholder="Link"
      />
    </>
  )
}

export default CertificateCVForm
