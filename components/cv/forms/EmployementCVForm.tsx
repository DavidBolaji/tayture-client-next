import React from 'react'
import { ICVForm } from '../DraggableSection'
import StyledInput from '@/components/Form/NomalInput/StyledInput'
import {
  ErrorMessage,
  Field,
  FieldArray,
  FieldProps,
  FormikHelpers,
  FormikProps,
} from 'formik'
import Button from '@/components/Button/Button'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { SelectInput } from '@/components/Form/SelectInput/SelectInput'
import { months } from '@/utils/data'
import { selecttheme } from '../data'
import { ConfigProvider } from 'antd'
import InputDateComponent from '@/pages/dashboard/profile/components/InputDateComponent'
import dayjs from 'dayjs'
import FormError from '@/components/Form/FormError/FormError'


const EmployementCVForm: React.FC<ICVForm & { formik: FormikProps<any> }> = ({
  name,
  index,
  formik,
}) => {
  return (
    <>
      <Field
        as={StyledInput}
        name={`${name}[${index}].title`}
        placeholder="Job Title"
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
          </div>

          <div className="-mt-4">
            <ErrorMessage name={`${name}[${index}].startYear`}>
              {(msg) => <FormError msg={msg} />}
            </ErrorMessage>
          </div>
        </div>
      </div>
      <h3 className="-mt-[12px] ml-1 text-[16px] font-[600]">End date</h3>

      <div className="grid grid-cols-2 md:gap-3 mt-2 mb-8">
        <div className="col-span-2 sm:col-span-1  md:col-span-1 lg:col-span-1 xl:col-span-1">
          <Field
            name={`${name}[${index}].endMonth`}
            as={SelectInput}
            placeholder="Select End month"
            text="Select End month"
            option={months}
          />
        </div>
        <h3 className="mb-1 ml-1 text-[16px] -mt-6 font-[600] md:hidden block">
          End year
        </h3>
        <div className="w-full col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 md:mb-6">
          <div className="col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
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
          </div>
          <div className="-mt-4">
            <ErrorMessage name={`${name}[${index}].endYear`}>
              {(msg) => <FormError msg={msg} />}
            </ErrorMessage>
          </div>
        </div>
      </div>
       <Field
        as={StyledInput}
        name={`${name}[${index}].location`}
        placeholder="Enter Job location"
      />

      <FieldArray
        name={`${name}[${index}].roles`}
        render={(arrayHelpers) => (
          <div className="">
            {formik.values[name][index].roles.map(
              (role: string, roleIndex: number) => (
                <div key={roleIndex} className="flex gap-x-4">
                  <div className="w-full h-full">
                    <StyledInput
                      name={`${name}[${index}].roles[${roleIndex}]`}
                      value={role}
                      onChange={formik.handleChange}
                      className="flex-grow mr-2"
                      placeholder={`Enter role ${roleIndex + 1}`}
                    />
                  </div>
                  <div className="flex  h-full mt-3">
                    <button
                      type="button"
                      className="rounded-full border w-5 h-5 p-1 flex items-center justify-center"
                      onClick={() => arrayHelpers.remove(roleIndex)}
                    >
                      <FaMinus color="black" />
                    </button>
                  </div>
                </div>
              ),
            )}
            <Button
              type="button"
              onClick={() => arrayHelpers.push('')}
              render="dark"
              bold={false}
              text={<FaPlus />}
            />
          </div>
        )}
      />
    </>
  )
}

export default EmployementCVForm
