import Button from '@/components/Button/Button'
import StyledInput from '@/components/Form/NomalInput/StyledInput'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { UserCardProps } from '../../card/UserCard'
import Spinner from '@/components/Spinner/Spinner'
import StyledTextarea from '@/components/Form/TextareaInput/StyledTextarea'
import * as Yup from 'yup'
import { Switch } from 'antd'
import RadioComponent from './RadioComponent'
import { regularFont } from '@/assets/fonts/fonts'
import { useGlobalContext } from '@/Context/store'
import { useMutation } from '@tanstack/react-query'
import { Axios } from '@/request/request'

export const userFormSchema = Yup.object().shape({
  fname: Yup.string()
    .min(3, 'First name must be more than 3 characters')
    .required('First name is required'),
  lname: Yup.string()
    .min(5, 'Last name must be 3 characters')
    .required('Last name is required'),
  summary: Yup.string().required('Headline is required'),
  available: Yup.boolean().notRequired(),
})

const UserForm: React.FC<UserCardProps> = ({
  fname,
  lname,
  available,
  summary,
}) => {
  const userInitialValues = {
    fname: fname,
    lname: lname,
    summary: summary,
    available:
      typeof available === 'undefined' || !available
        ? "I'm casually looking"
        : "I'm open to work",
  }

  const { img } = useGlobalContext()
  const { mutate } = useMutation({
    mutationFn: async (data: { picture: string }) => {
      if (data.picture.trim().length > 5) {
        // await Axios.put('/profile/update', {picture: data.picture})
      }
    },
  })

  const handleClick: any = async (values: any) => {
    mutate({ ...values, picture: img })
  }
  return (
    <Formik
      initialValues={userInitialValues}
      onSubmit={handleClick}
      validationSchema={userFormSchema}
      validateOnMount
    >
      {({
        handleSubmit,
        isValid,
        isSubmitting,
        setFieldValue,
        handleChange,
        values,
      }) => (
        <Form
          className="w-full md:px-10 px-10 space-y-10"
          onSubmit={handleSubmit}
        >
          <Field
            name="fname"
            as={StyledInput}
            placeholder="First Name"
            type={'text'}
            text={'First Name'}
          />
          <Field
            name="lname"
            as={StyledInput}
            placeholder="Last Name"
            type={'text'}
            text={'Last Name'}
            className="mb-10"
          />

          <Field
            name="summary"
            as={StyledTextarea}
            placeholder="Professional headline e.g Experienced math teacher dedicated to fostering student learning and problem-solving skills through engaging lessons."
            type={'text'}
            text="Headline"
            maxLength={300}
            rows={5}
            spellCheck="false"
          />

          <div className="-mt-20">
            <label
              className={`inline-block text-[16px] font-[500] ${regularFont.className}`}
            >
              Availability
            </label>
            <div className="scale-95 -translate-x-5">
              <RadioComponent
                key={values.available}
                value={available ? "I'm open to work" : "I'm casually looking"}
                distance
                options={["I'm open to work", "I'm casually looking"]}
                handleChange={(e) => {
                  handleChange(e)
                  setFieldValue(
                    'available',
                    e === "I'm open to work" ? true : false,
                  )
                }}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              disabled={isSubmitting || !isValid}
              bold={false}
              hover={isSubmitting}
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

export default UserForm
