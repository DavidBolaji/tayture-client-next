import StyledInput from '@/components/Form/NomalInput/StyledInput'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { EditSchoolSchema } from './Schema/EditSchoolSchema'
import StyledTextarea from '@/components/Form/TextareaInput/StyledTextarea'
import { SelectInput } from '@/components/Form/SelectInput/SelectInput'
import { employes } from '@/utils/data'
import CustomPhoneInput from '@/components/Form/CustomPhoneInput/CustomPhoneInput'
import LocationComponent from '@/components/Form/LocationComponent/LocationComponent'
import Button from '@/components/Button/Button'
import { useGlobalContext } from '@/Context/store'

import UploadComponent from '@/components/UploadComponent/UploadComponent'
import { useQueryClient } from '@tanstack/react-query'
import { School } from '@prisma/client'
import { IUser } from '@/pages/api/users/types'

const formatVal = (data: School) => {
  return {
    sch_no_emp: data.sch_no_emp,
    sch_address: data.sch_address,
    sch_city: data.sch_city,
    sch_state: data.sch_state,
    sch_lga: data.sch_lga,
    sch_url: data.sch_url,
    sch_phone: data.sch_phone,
    sch_name: data.sch_name,
    landmark: data.landmark || '',
    country: data.country ?? ''
  }
}

const EditSchoolForm: React.FC<{ SW: any }> = ({ SW }) => {
  const { img, setCreateSch } = useGlobalContext()
  const queryClient = useQueryClient()
  const sch = queryClient.getQueryData(['school']) as School
  const initialValues = formatVal(sch)
  const user = queryClient.getQueryData(['user']) as IUser

  const noImage = img.trim().length < 1 && sch.sch_logo!.trim().length < 1
  const handleSubmit = (data: Partial<School>) => {
    //@ts-ignore
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
        clearTimeout(b)
      }, 600)
      clearTimeout(t)
    }, 400)
  }
  return (
    <Formik
      validateOnMount={true}
      onSubmit={() => console.log('object')}
      initialValues={initialValues}
      validationSchema={EditSchoolSchema}
      enableReinitialize
      key={sch.sch_id ?? 0}
    >
      {({ isValid, values }) => (
        <>
          {/* <h2 className="w-full font-br">Update information</h2> */}
          <div className="pt-[32px] flex justify-center pb-10">
            <UploadComponent image={sch.sch_logo!} />
          </div>
          <Form className="mt-[40px]">
            <Field
              name="sch_name"
              as={StyledInput}
              placeholder="School name"
              type={'text'}
              text={'School name'}
              disabled={user.role !== "SUPER_ADMIN"}
            />
            <h3 className={`ml-1 mb-1 text-[14px] font-[600]`}>No of employees</h3>
            <Field
              name="sch_no_emp"
              as={SelectInput}
              placeholder="No of Employees"
              text={'No of Employees'}
              option={employes}
            />
            <Field
              as={LocationComponent}
              country="country"
              city="sch_city"
              state="sch_state"
              lga="sch_lga"
              disabled={user.role !== "SUPER_ADMIN"}
            />
            <Field
              name="landmark"
              as={StyledInput}
              placeholder="Closest bus stop/Landmark"
              type={'text'}
              text={'Closest bus stop/Landmark'}
              disabled={user.role !== "SUPER_ADMIN"}
            />

            <Field
              name="sch_address"
              as={StyledTextarea}
              placeholder="School Address"
              text={'School Address'}
              rows={5}
              spellCheck="false"
              disabled={user.role !== "SUPER_ADMIN"}
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
                disabled={user.role !== "SUPER_ADMIN"}
              />
            </div>
            <div className="text-center pb-20">
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
        </>
      )}
    </Formik>
  )
}

export default EditSchoolForm
