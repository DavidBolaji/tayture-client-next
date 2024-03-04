import StyledInput from '@/components/Form/NomalInput/StyledInput'
import { Field, Form, Formik } from 'formik'
import React from 'react'

import StyledTextarea from '@/components/Form/TextareaInput/StyledTextarea'
import { SelectInput } from '@/components/Form/SelectInput/SelectInput'
import { employes } from '@/utils/data'
import CustomPhoneInput from '@/components/Form/CustomPhoneInput/CustomPhoneInput'
import LocationComponent from '@/components/LocationComponent/LocationComponent'
import Button from '@/components/Button/Button'
import { ISchData, useGlobalContext } from '@/Context/store'

import UploadComponent from '@/components/UploadComponent/UploadComponent'
import { AddSchoolSchema } from '../pagez/AddSchool/AddSchoolForm/Schema/AddSchoolSchema'
import { regularFont } from '@/assets/fonts/fonts'

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

const PostSchoolCreateForm: React.FC<{ SW: any }> = ({ SW }) => {
  const { img, setCreateSch } = useGlobalContext()
  const noImage = img.trim().length < 1
  const handleSubmit = (data: Partial<ISchData>) => {
    setCreateSch(() => data)
    SW?.next()
  }
  return (
    <div>
      <div className={regularFont.className}>
        <h3 className="md:text-[24px] text-[20px] text-center font-[600] text-black_400">
          Add a school
        </h3>

        <p className="text-center text-ash_400 md:text-[16px] text-[12px] max-w-[387px] mx-auto mb-[40px]">
          You haven&apos;t posted a job before, so you&apos;ll have to add your
          school information
        </p>
      </div>
      <h2 className="w-full font-br font-bold">School information</h2>
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
                text={'Next'}
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

export default PostSchoolCreateForm
