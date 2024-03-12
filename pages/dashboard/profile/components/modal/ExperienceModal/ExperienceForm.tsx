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
import * as Yup from 'yup'
import { AnimatePresence, easeIn, motion } from 'framer-motion'
import { WorkHistory } from '@prisma/client'
import StyledInput from '@/components/Form/NomalInput/StyledInput'
import { SelectInput } from '@/components/Form/SelectInput/SelectInput'
import InputDateComponent from '../../InputDateComponent'
import FormError from '@/components/Form/FormError/FormError'
import LocationComponent from '@/components/Form/LocationComponent/LocationComponent'
import StyledTextarea from '@/components/Form/TextareaInput/StyledTextarea'
import Button from '@/components/Button/Button'
import Spinner from '@/components/Spinner/Spinner'
import CheckComponent from '@/pages/calculator/components/CheckComponent'
import { months } from '@/utils/data'
import { FaPlus } from 'react-icons/fa'
import { v4 as uuid } from 'uuid'
import { regularFont } from '@/assets/fonts/fonts'
import { MinusCircleOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { useGlobalContext } from '@/Context/store'

export const validationSchema = Yup.object().shape({
  location: Yup.string().required('Location i.e where you worked is required'),
  title: Yup.string().required('Title is required'),
  startMonth: Yup.string().required('Month is required'),
  endYear: Yup.string()
    .required('Year is required')
    .test(
      'startYearBeforeEndYear',
      'End year must be greater than or equal to start year',
      function (startYear) {
        const endYear = +this.parent.startYear
        return +startYear! >= endYear
      },
    )
    .when(['endDate'], {
      is: (expEndDate: string) => !expEndDate,
      then: Yup.string().required('End Year is required'),
      otherwise: Yup.string().notRequired(),
    }),
  endMonth: Yup.string().when(['endDate'], {
    is: (expEndDate: string) => !expEndDate,
    then: Yup.string().required('End Month is required'),
    otherwise: Yup.string().notRequired(),
  }),
  startYear: Yup.string().when(['endDate'], {
    is: (expEndDate: string) => !expEndDate,
    then: Yup.string().required('End Year is required'),
    otherwise: Yup.string().notRequired(),
  }),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  lga: Yup.string().required('Lga is required'),
  address: Yup.string().required('Address is required'),
  endDate: Yup.string().notRequired(),
  roles: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().required('ID is a required field'),
        role: Yup.string().required('Enter role'),
      }),
    )
    .min(1)
    .required('Role is a required field'),
})

const ExperienceForm: React.FC = () => {
  const { setUI, setMessage } = useGlobalContext()
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: WorkHistory) => {
      return await Axios.post('/users/work/me', data)
    },
    onSuccess: () => {
      setUI((prev) => {
        return {
          ...prev,
          experienceModal: {
            visibility: false,
          },
        }
      })
      setMessage(() => 'Experience created succesfully')
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
    // resetForm();
  }

  return (
    <Formik
      initialValues={{
        location: '',
        title: '',
        startMonth: '',
        startYear: '',
        endMonth: '',
        endYear: '',
        endDate: '',
        city: '',
        state: '',
        address: '',
        lga: '',
        roles: [],
      }}
      onSubmit={handleClick}
      validationSchema={validationSchema}
      validateOnMount
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        isValid,
        setFieldTouched,
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
            <div className="w-full col-span-2 sm:col-span-1  md:col-span-1 lg:col-span-1 xl:col-span-1">
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
            {values.endDate !== 'Present' && (
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
                <h3 className="ml-1 text-[16px] font-[600]">End date</h3>

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
                  <div className="w-full col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
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

          <div className="mb-4">
            <Field name="endDate">
              {({ field }: { field: FieldProps['field'] }) => (
                <CheckComponent
                  {...field}
                  options={['I currently work here']}
                  defaultValue={[]}
                  onChange={(e: any) => {
                    setFieldValue('endDate', e.length > 0 ? 'Present' : '')
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

          <Field
            name="address"
            as={StyledTextarea}
            placeholder="Address"
            text={'Address'}
            rows={5}
            spellCheck="false"
          />

          <h3 className="ml-1 text-[16px] font-[600] mb-2">Roles</h3>
          <FieldArray name="roles">
            {({ remove, push }: any) => (
              <div>
                {values.roles.length > 0 &&
                  values.roles.map((_, index) => (
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
                        {values.roles.length > 0 ? 'Another role' : 'Add role'}
                      </span>
                    </Space>
                  }
                />
              </div>
            )}
          </FieldArray>
          <div className="flex justify-center mt-10">
            <Button
              disabled={!isValid}
              bold={false}
              hover={isValid}
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

export default ExperienceForm
