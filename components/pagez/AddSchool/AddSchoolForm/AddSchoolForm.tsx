import StyledInput from '@/components/Form/NomalInput/StyledInput'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { AddSchoolSchema } from './Schema/AddSchoolSchema'
import StyledTextarea from '@/components/Form/TextareaInput/StyledTextarea'
import { SelectInput } from '@/components/Form/SelectInput/SelectInput'
import { employes } from '@/utils/data'
import CustomPhoneInput from '@/components/Form/CustomPhoneInput/CustomPhoneInput'
import LocationComponent from '@/components/Form/LocationComponent/LocationComponent'
import Button from '@/components/Button/Button'
import { ISchData, useGlobalContext } from '@/Context/store'

import UploadComponent from '@/components/UploadComponent/UploadComponent'
import Spinner from '@/components/Spinner/Spinner'
import { FaAsterisk } from 'react-icons/fa'

const initialValues = {
  sch_no_emp: '',
  sch_address: '',
  sch_city: '',
  sch_state: '',
  sch_lga: '',
  sch_url: '',
  sch_phone: '',
  sch_name: '',
}

const AddSchoolForm: React.FC<{ SW: any }> = ({ SW }) => {
  const { img, setCreateSch } = useGlobalContext()
  const [loading, setLoading] = useState(false)
  const noImage = img.trim().length < 1
  const handleSubmit = (data: Partial<ISchData>) => {
    setLoading(true)
    setCreateSch(() => data)

    const t = setTimeout(() => {
      if (typeof document !== 'undefined') {
        const doc = document.querySelector('.ant-layout-content')
        doc?.scrollTo({
          behavior: 'smooth',
          top: 0,
        })
      }
      const b = setTimeout(() => {
        SW?.next()
        setLoading(false)
        clearTimeout(b)
      }, 600)
      clearTimeout(t)
    }, 400)
  }
  return (
    <div className='pb-10'>
      <h2 className="w-full font-br">School information</h2>
      <p className='flex items-center gap-1'>
        <FaAsterisk color="red" size={12} />
        <span className='text-xs'>Logo is required</span>
      </p>
      <div className="pt-[32px] flex justify-center">
        <UploadComponent />
      </div>

      <Formik
        validateOnMount={true}
        onSubmit={() => console.log('object')}
        initialValues={initialValues}
        validationSchema={AddSchoolSchema}
      >
        {({ isValid, values }) => (
          <Form className="mt-[40px]">
            <Field
              name="sch_name"
              as={StyledInput}
              placeholder="School name"
              type={'text'}
              text={'School name'}
            />
            <Field
              name="sch_no_emp"
              as={SelectInput}
              placeholder="Select No of Employees"
              text={'No of Employees'}
              option={employes}
            />
            <Field
              as={LocationComponent}
              city="sch_city"
              state="sch_state"
              lga="sch_lga"
            />

            <Field
              name="sch_address"
              as={StyledTextarea}
              placeholder="School Address"
              text={'School Address'}
              rows={5}
              spellCheck="false"
            />
            <Field
              name="sch_url"
              as={StyledInput}
              placeholder="School website url"
              type={'text'}
              text={'School website url'}
            />
            <div className="relative">
              <Field
                name="sch_phone"
                as={CustomPhoneInput}
                type={'text'}
                placeholder={'phone'}
                text={'Phone No'}
              />
            </div>
            <div className="text-center">
              <Button
                disabled={!isValid || noImage}
                bold={false}
                hover={isValid || !noImage}
                text={loading ? <Spinner color="white" /> : 'Next'}
                render="light"
                onClick={() => handleSubmit(values)}
                type="button"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddSchoolForm
