import React, { useRef, useEffect, useState } from 'react'
import {
  ErrorMessage,
  Field,
  FieldProps,
  Form,
  Formik,
  useFormikContext,
} from 'formik'
import cn from 'classnames'
import { MdOutlineModeEdit } from 'react-icons/md'
import { regularFont } from '@/assets/fonts/fonts'
import { ConfigProvider, Drawer, Tooltip } from 'antd'
import { IoIosClose } from 'react-icons/io'
import LocationComponent from '@/components/Form/LocationComponent/LocationComponent'
import StyledTextarea from '@/components/Form/TextareaInput/StyledTextarea'
import Button from '@/components/Button/Button'
import * as Yup from 'yup'
import { useQueryClient } from '@tanstack/react-query'
import FormError from '@/components/Form/FormError/FormError'
import { SelectInput } from '@/components/Form/SelectInput/SelectInput'
import { degree, months } from '@/utils/data'
import InputDateComponent from '@/pages/dashboard/profile/components/InputDateComponent'
import StyledInput from '@/components/Form/NomalInput/StyledInput'
import CheckComponent from '@/pages/calculator/components/CheckComponent'
import { AnimatePresence, easeIn, motion } from 'framer-motion'

export const LocationSchema = Yup.object().shape({
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  lga: Yup.string().required('LGA is required'),
  address: Yup.string().required('Address is required'),
})
export const LocationSchema2 = Yup.object().shape({
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  lga: Yup.string().required('LGA is required'),
  address: Yup.string().required('Address is required'),
  location: Yup.string().required('Location is required'),
})

const educationFormSchema = Yup.object().shape({
  startMonth: Yup.string().required('Month is required'),
  startYear: Yup.string().required('Year is required'),
  endMonth: Yup.string().required('Month is required'),
  endYear: Yup.string()
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
const experienceFormSchema = Yup.object().shape({
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
    is: (endDate: string) => !endDate,
    then: Yup.string().required('End Year is required'),
    otherwise: Yup.string().notRequired(),
  }),
endMonth: Yup.string().when(['endDate'], {
  is: (endDate: string) => !endDate,
  then: Yup.string().required('End Month is required'),
  otherwise: Yup.string().notRequired(),
}),
startYear: Yup.string().when(['endDate'], {
  is: (endDate: string) => !endDate,
  then: Yup.string().required('End Year is required'),
  otherwise: Yup.string().notRequired(),
}),
endDate: Yup.string().notRequired(),
})
const degreeFormSchema = Yup.object().shape({
  degree: Yup.string().required('Degree is required'),
})

export type Ilocation = {
  state: string
  lga: string
  address: string
  city: string
}
interface ITextarea {
  name?: string
  defaultValue?: string
  className?: string
  dir?: 'top' | 'bottom'
  st?: any
  hide?: boolean
  length?: number
}

const NameComponent: React.FC<ITextarea> = ({
  name,
  dir,
  st,
  hide,
  length,
  ...rest
}) => {
  const { getFieldProps, getFieldMeta, setFieldValue } = useFormikContext()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [disabled, setDisabled] = useState(true)
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [openDegree, setOpenDegree] = useState(false)
  const [openDate, setOpenDate] = useState(false)
  const [work, setWork] = useState(false)
  const queryClient = useQueryClient()
  const fieldProps = getFieldProps(name!)
  const { error, value } = getFieldMeta(name!)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [value])

  if (!fieldProps) {
    return null
  }

  const handleEditClick = () => {
    if (name === 'location') {
      setOpen(true)
    } else if (name?.split('.')[1] === 'date') {
      setOpenDate(true)
    } else if (name?.split('.')[1] === 'year') {
      setOpen1(true)
    } else if (name?.split('.')[1] === 'degree') {
      setOpenDegree(true)
    } else if (name?.split('.')[1] === 'location') {
      setWork(true)
    } else {
      setDisabled((prev) => !prev)
      if (textareaRef.current) {
        const t = setTimeout(() => {
          if (document) {
            const el = document.getElementById(name!)
            el!.focus()

            const length = (el as any).value.length as number
            ;(el as any).setSelectionRange(0, length, 'forward')
          }
          clearTimeout(t)
        }, 0)
      }
    }
  }

  const onSubmit = (data: Ilocation) => {
    queryClient.setQueryData(['cvLocation'], data)
    setFieldValue(
      name!,
      `${data.address}, ${data.lga}, ${data.city}, ${data.state}`,
    )
    setOpen(false)
  }

  const onSubmit2 = (data: any) => {
    setFieldValue(
      name!,
      `${data.startMonth}, ${data.startYear} - ${data.endMonth}, ${data.endYear}`,
    )
    setOpen1(false)
  }

  const onSubmit5 = (data: any) => {
    setFieldValue(
      name!,
      `${data.startMonth}, ${data.startYear} -  ${data.endDate.length > 1 ? "Current": `${data.endMonth} ${data.endYear}`}`,
    )
    setOpen1(false)
    setOpenDate(false)
  }
  const onSubmit3 = (data: any) => {
    setFieldValue(name!, `${data.degree}, ${data.field}`)
    setOpenDegree(false)
  }
  const onSubmit4 = (data: any) => {
    const idx = name?.split('.')[0].split('[')[1].replace("]", "");
    queryClient.setQueryData([`${idx}.history`], data)
    setFieldValue(name!, `${data.location}`)
    setWork(false)
  }

  return (
    <div className="w-full relative">
      <textarea
        id={name}
        disabled={disabled}
        ref={textareaRef}
        {...fieldProps}
        spellCheck={false}
        maxLength={length}
        autoFocus
        className={cn(
          `border-none w-full outline-none bg-transparent whitespace-pre-line ring-0  ${regularFont.className}`,
          rest.className,
        )}
        style={{ resize: 'none', overflow: 'hidden', ...st }}
      />
      {!hide && (
        <Tooltip title={`Edit ${name}`}>
          <div
            onClick={handleEditClick}
            className={`absolute cursor-pointer right-0 rounded-full hover:scale-105 bg-slate-300 hover:bg-orange transition-all duration-300 p-1 flex items-center justify-center ${
              dir === 'top' ? 'top-0' : 'bottom-0'
            }`}
          >
            {disabled ? (
              <MdOutlineModeEdit size={8} />
            ) : (
              <IoIosClose size={8} />
            )}
          </div>
        </Tooltip>
      )}
      <Drawer open={open} title="Set Location" onClose={() => setOpen(false)}>
        <Formik
          validationSchema={LocationSchema}
          validateOnMount
          initialValues={{
            state: '',
            lga: '',
            city: '',
            address: '',
          }}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isValid }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                as={LocationComponent}
                city="city"
                state="state"
                lga="lga"
              />
              <Field
                name="address"
                as={StyledTextarea}
                placeholder="User Address"
                text={'School Address'}
                rows={3}
                spellCheck="false"
              />
              <div className="text-center">
                <Button
                  disabled={!isValid}
                  bold={false}
                  hover={isValid}
                  text={'Done'}
                  render="light"
                  type="submit"
                />
              </div>
            </Form>
          )}
        </Formik>
      </Drawer>
      <Drawer
        open={open1}
        title="Set Education Date"
        onClose={() => setOpen1(false)}
      >
        <Formik
          validationSchema={educationFormSchema}
          validateOnMount
          initialValues={{
            startYear: '',
            startMonth: '',
            endYear: '',
            endMonth: '',
          }}
          onSubmit={onSubmit2}
        >
          {({
            handleSubmit,
            isValid,
            values,
            handleBlur,
            errors,
            touched,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
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
                  <div className="col-span-2 sm:col-span-1 dsm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
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
              <div className="text-center">
                <Button
                  disabled={!isValid}
                  bold={false}
                  hover={isValid}
                  text={'Done'}
                  render="light"
                  type="submit"
                />
              </div>
            </Form>
          )}
        </Formik>
      </Drawer>
      <Drawer
        open={openDegree}
        title="Select Degree"
        onClose={() => setOpenDegree(false)}
      >
        <Formik
          validationSchema={degreeFormSchema}
          validateOnMount
          initialValues={{
            degree: '',
            field: '',
          }}
          onSubmit={onSubmit3}
        >
          {({ handleSubmit, isValid }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                name="field"
                as={StyledInput}
                placeholder="Field of study"
                text="Field ofStudy"
              />

              <Field
                name="degree"
                as={SelectInput}
                placeholder="Minimum educational qualification"
                text="Minimum educational qualification"
                option={degree}
              />
              <div className="text-center">
                <Button
                  disabled={!isValid}
                  bold={false}
                  hover={isValid}
                  text={'Done'}
                  render="light"
                  type="submit"
                />
              </div>
            </Form>
          )}
        </Formik>
      </Drawer>
      <Drawer
        open={openDate}
        title="Set Work Date"
        onClose={() => setOpenDate(false)}
       
      >
        <Formik
          validationSchema={experienceFormSchema}
          validateOnMount
          enableReinitialize
          initialValues={{
            startYear: '',
            startMonth: '',
            endYear: '',
            endDate: '',
            endMonth: '',
          }}
          onSubmit={onSubmit5}
        >
          {({
            handleSubmit,
            isValid,
            values,
            handleBlur,
            errors,
            touched,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
             
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
                  <div className="col-span-2 sm:col-span-1 dsm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
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
                <h3 className="ml-1 text-[16px] font-[600]"
               
                >End date</h3>

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

          <div className="mb-4"
          
          >
            <Field name="endDate">
              {({ field }: { field: FieldProps['field'] }) => (
                <CheckComponent
                  {...field}
                  //@ts-ignore
                  id="endDate"
                  name="endDate"
                  options={[...['I currently work here']]}
                  defaultValue={[]}
                 
                  onChange={(e: any) => {
                    const check = e.length > 0;
                    if (check) { 
                      setFieldValue('endMonth', values.startMonth);
                    } else {
                
                      setFieldValue('endMonth', '');
                    }
                    // Set other fields accordingly
                    setFieldValue('endDate', check ? 'Present' : '');
                    setFieldValue('endYear', check ? values.startYear : '');
                    inputRef.current?.focus()
                    setTimeout(() => {
                      inputRef?.current?.blur();
                    }, 100)
                   
                  }}
                />
              )}
            </Field>
          
           
          </div>
              <div className="text-center">
                <Button
                  disabled={!isValid}
                  bold={false}
                  hover={isValid}
                  text={'Done'}
                  render="light"
                  type="submit"
                />
              </div>
              <input name="endDate" type="text" className='focus:ring-0 focus:outline-none blinker bg-transparent' ref={inputRef} onBlur={handleBlur} />
            </Form>
          )}
        </Formik>
      </Drawer>

      <Drawer open={work} title="Set Work Info" onClose={() => setWork(false)}>
        <Formik
          validationSchema={LocationSchema2}
          validateOnMount
          initialValues={{
            location: '',
            city: "",
            state: "",
            lga  : "",
            address: ""
          }}
          onSubmit={onSubmit4}
        >
          {({ handleSubmit, isValid }) => (
            <Form onSubmit={handleSubmit} className={regularFont.className}>
              <div className='mt-5'>
              <Field
                as={StyledInput}
                name="location"
                text={'Company'}
                placeholder="Company"
              />
              </div>
             
              <Field
                as={LocationComponent}
                city="city"
                state="state"
                lga="lga"
              />
              <Field
                name="address"
                as={StyledTextarea}
                placeholder="User Address"
                text={'School Address'}
                rows={3}
                spellCheck="false"
              />
              <div className="text-center">
                <Button
                  disabled={!isValid}
                  bold={false}
                  hover={isValid}
                  text={'Done'}
                  render="light"
                  type="submit"
                />
              </div>
            </Form>
          )}
        </Formik>
      </Drawer>
    </div>
  )
}

export default NameComponent
