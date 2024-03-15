import { ConfigProvider, Space } from 'antd'
import {
  ErrorMessage,
  Field,
  FieldArray,
  FieldProps,
  Form,
  Formik,
} from 'formik'
import React from 'react'
import { AnimatePresence, easeIn, motion } from 'framer-motion'
import dayjs from 'dayjs'
import { WorkHistory, WorkRole } from '@prisma/client'
import { validationSchema } from './ExperienceForm'
import StyledInput from '@/components/Form/NomalInput/StyledInput'
import { SelectInput } from '@/components/Form/SelectInput/SelectInput'
import { months } from '@/utils/data'
import InputDateComponent from '../../InputDateComponent'
import FormError from '@/components/Form/FormError/FormError'
import CheckComponent from '@/pages/calculator/components/CheckComponent'
import LocationComponent from '@/components/Form/LocationComponent/LocationComponent'
import StyledTextarea from '@/components/Form/TextareaInput/StyledTextarea'
import Button from '@/components/Button/Button'
import { FaPlus } from 'react-icons/fa'
import { MinusCircleOutlined } from '@ant-design/icons'
import Spinner from '@/components/Spinner/Spinner'
import { v4 as uuid } from 'uuid'
import { useGlobalContext } from '@/Context/store'
import { useMutation } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { regularFont } from '@/assets/fonts/fonts'

const ExperienceEditForm: React.FC<{
  exp: WorkHistory & { roles: WorkRole[] }
}> = ({ exp }) => {
  const { setUI, setMessage } = useGlobalContext()
  const { mutate } = useMutation({
    mutationFn: async (data: WorkHistory) => {
      await Axios.put(`/users/work/me/update/${exp.id}`, data)
    },
    onSuccess: () => {
      setUI((prev) => {
        return {
          ...prev,
          experienceEditModal: {
            visibility: false,
          },
        }
      })
      setMessage(() => 'Work Experience updated successfully')
      const t = setTimeout(() => {
        setMessage(() => '')
        window.location.reload()
        clearTimeout(t)
      }, 4000)
    },
  })

  const handleClick: any = async (
    values: WorkHistory,
    { resetForm }: { resetForm: any },
  ) => {
    mutate(values)
    resetForm()
  }

  return (
    <Formik
      key={exp.id}
      initialValues={{
        location: exp.location ?? '',
        title: exp.title ?? '',
        startMonth: exp.startMonth ?? '',
        startYear: exp.startYear ?? '',
        endMonth: exp.endMonth ?? '',
        endYear: exp.endYear ?? '',
        endDate: exp.endDate ?? '',
        city: exp.city ?? '',
        state: exp.state ?? '',
        lga: exp.lga ?? '',
        roles: exp?.roles,
        address: exp?.address,
      }}
      onSubmit={handleClick}
      validationSchema={validationSchema}
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
            text="Location"
            placeholder="Location"
            name="location"
            as={StyledInput}
          />
          <Field
            text="Title"
            placeholder="Title"
            name="title"
            as={StyledInput}
          />

          <h3 className="ml-1 text-[16px] font-[600]">Start date</h3>

          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
              <Field
                name="startMonth"
                as={SelectInput}
                placeholder="Select start month"
                text="Select start month"
                option={months}
              />
            </div>
            <div className="w-full col-span-2 sm:col-span-1 dsm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
              <div className="col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
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
                          picker="year"
                          // @ts-ignore
                          border={errors.startYear && touched.startYear}
                          defaultValue={dayjs(exp.startYear, 'YYYY')}
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
                <ErrorMessage name="startYear">
                  {(msg) => <FormError msg={msg} />}
                </ErrorMessage>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {values.endDate.length < 1 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 120 }}
                transition={{
                  duration: 0.5,
                  ease: easeIn,
                }}
                exit={{
                  position: 'relative',
                  zIndex: -300,
                  height: 9,
                  visibility: 'hidden',
                  transition: {
                    duration: 0.5,
                    ease: easeIn,
                  },
                }}
              >
                <h3 className="dsm:-mt-[12px] ml-1 text-[16px] font-[600]">
                  End date
                </h3>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="col-span-2 mb-12 sm:mb-0  md:mb-0 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
                    <Field
                      name="endMonth"
                      as={SelectInput}
                      placeholder="Select end month"
                      text="Select end month"
                      option={months}
                    />
                  </div>
                  <div className="w-full col-span-2 sm:col-span-1 dsm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 mb-6">
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
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
                                defaultValue={dayjs(exp.endYear, 'YYYY')}
                                onChange={(e: any) => {
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
                      <ErrorMessage name="endYear">
                        {(msg) => <FormError msg={msg} />}
                      </ErrorMessage>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mb-5">
            <Field name="endDate">
              {({ field }: { field: FieldProps['field'] }) => (
                <CheckComponent
                  {...field}
                  
                  options={['I currently work here']}
                  
                  defaultValue={['I currently work here']}
                  onChange={(e: any) => {
                    setFieldValue('endDate', e.length > 0 ? 'Current' : '')
                    setFieldValue(
                      'endMonth',
                      e.length > 0 ? values.startMonth : '',
                    )
                    setFieldValue(
                      'endYear',
                      e.length > 0 ? values.startYear : '',
                    )
                  }}
                />
              )}
            </Field>
          </div>

          <Field as={LocationComponent} city="city" state="state" lga="lga" />

          <div className="mt-[60px]">
            <Field
              name="address"
              as={StyledTextarea}
              placeholder="Address"
              text={'Address'}
              rows={5}
              spellCheck="false"
            />
          </div>

          <h3 className="ml-1 text-[16px] font-[600] mb-2">Roles</h3>
          <FieldArray name="roles">
            {({ remove, push }: any) => (
              <div>
                {values.roles.length > 0 &&
                  values.roles.map((friend, index) => (
                    <div className="relative" key={index}>
                      <Field
                        name={`roles.${index}.role`}
                        as={StyledTextarea}
                        placeholder="Role"
                        rows={1}
                        spellCheck="false"
                      />
                      {index === 0 ? null : (
                        <div className="flex items-center justify-end absolute -top-6 right-1">
                          <MinusCircleOutlined onClick={() => remove(index)} />
                        </div>
                      )}
                    </div>
                  ))}
                <Button
                  render="light"
                  transparent
                  onClick={() =>
                    push({
                      id: uuid(),
                      role: '',
                    })
                  }
                  bold={false}
                  rounded
                  text={
                    <Space>
                      <FaPlus color="#FF7517" />
                      <span className="text-[12px] text-orange">
                        Another role
                      </span>
                    </Space>
                  }
                />
              </div>
            )}
          </FieldArray>

          <div className="flex justify-center">
            <Button
              disabled={isSubmitting || !isValid}
              bold={false}
              hover={isSubmitting || !isValid}
              text={false ? <Spinner /> : 'Submit'}
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

export default ExperienceEditForm
