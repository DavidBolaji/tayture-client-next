import Button from '@/components/Button/Button'
import StyledInput from '@/components/Form/NomalInput/StyledInput'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { UserCardProps } from '../../card/UserCard'
import Spinner from '@/components/Spinner/Spinner'
import StyledTextarea from '@/components/Form/TextareaInput/StyledTextarea'
import * as Yup from 'yup'
import RadioComponent from './RadioComponent'
import { regularFont } from '@/assets/fonts/fonts'
import { useGlobalContext } from '@/Context/store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import UploadComponent from '@/components/UploadComponent/UploadComponent'

export const userFormSchema = Yup.object().shape({
  fname: Yup.string()
    .min(3, 'First name must be more than 3 characters')
    .required('First name is required'),
  lname: Yup.string()
    .min(5, 'Last name must be 3 characters')
    .required('Last name is required'),
  summary: Yup.string().required('Headline is required'),
  available: Yup.string().notRequired(),
})

const UserForm: React.FC<UserCardProps> = ({
  fname,
  lname,
  available,
  summary,
  picture,
}) => {
  const { img, setMessage } = useGlobalContext()
  const queryClient = useQueryClient()
  const noImage = img.trim().length < 1
  console.log(img)
  console.log(noImage)
  const userInitialValues = {
    fname: fname,
    lname: lname,
    summary: summary,
    available:
      typeof available === 'undefined'
        ? ''
        : available
        ? "I'm open to work"
        : "I'm casually looking",
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: {
      picture: string
      summary: string
      available: string
      fname: string
      lname: string
    }) => {
      const picture = Axios.put('/users/profile/update/me', {
        picture: data.picture,
        available: data.available === "I'm open to work" ? true : false,
      })
      const summary = Axios.put('/users/summary/update/me', {
        text: data.summary,
      })
      const user = Axios.put('/users/update/me', {
        fname: data.fname,
        lname: data.lname,
      })
      return await Promise.all([picture, summary, user])
    },
    onSuccess: () => {
      setMessage(() => 'Profile updated Succesfully')
      setTimeout(() => {
        setMessage(() => '')
        window.location.reload()
      }, 4000)
    },
  })

  const handleClick: any = async (values: any) => {
    mutate({ ...values, picture: img })
  }
  return (
    <>
      <div className="pt-[32px] pb-[48px] flex justify-center">
        <UploadComponent image={img ?? picture} />
      </div>
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
                  // key={values.available}
                  value={
                    available ? "I'm open to work" : "I'm casually looking"
                  }
                  distance
                  options={["I'm open to work", "I'm casually looking"]}
                  handleChange={(e) => {
                    handleChange(e)
                    setFieldValue('available', e)
                  }}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                disabled={isSubmitting || !isValid || noImage}
                bold={false}
                hover={isSubmitting || noImage}
                text={isPending ? <Spinner color="white" /> : 'Submit'}
                render="light"
                full={false}
                type="submit"
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default UserForm
