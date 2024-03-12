import { Checkbox, Col, ConfigProvider, Row } from 'antd'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import React, { useState } from 'react'
import { PersonalInformationCardProp } from '../../card/PersonalInformationCard'
import * as Yup from 'yup'
import StyledInput from '@/components/Form/NomalInput/StyledInput'
import StyledTextarea from '@/components/Form/TextareaInput/StyledTextarea'
import LocationComponent from '@/components/Form/LocationComponent/LocationComponent'
import Button from '@/components/Button/Button'
import Spinner from '@/components/Spinner/Spinner'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '@prisma/client'
import { Axios } from '@/request/request'
import { regularFont } from '@/assets/fonts/fonts'
import { useGlobalContext } from '@/Context/store'
import PersonalForm2 from './PersonalForm2'

export const personalFormSchema = Yup.object().shape({
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  address: Yup.string().required('Address is required'),
  lga: Yup.string().required('Lga is required'),
  workplace: Yup.string().required('Workplace is required'),
  others: Yup.string().notRequired(),
})

const PersonalForm: React.FC<PersonalInformationCardProp> = ({
  email,
  state,
  city,
  lga,
  address,
  workplace,
}) => {
  const queryClient = useQueryClient()
  const auth = queryClient.getQueryData(['user']) as User
  const { setMessage, setUI } = useGlobalContext()
  const [path, setPath] = useState<any>(auth.path ?? [])
  const [data, setData] = useState<{ othersText: string; others: string[] }>({
    othersText: '',
    others: [],
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (
      data: PersonalInformationCardProp & { path: string } & {
        othersText: string
        others: string[]
      },
    ) => {
      const profile = Axios.put('/users/profile/update/me', {
        lga: data.lga,
        city: data.city,
        state: data.state,
        address: data.address,
        workplace: data.workplace,
      })

      let uniqueStringsSet = new Set(data.path)
      let uniqueStringsArray = Array.from(uniqueStringsSet)

      const user = Axios.put('/users/update/me', {
        path: JSON.stringify(uniqueStringsArray),
        othersText: data.othersText,
      })

      const others = Axios.put('/users/me/others', {
        others: data.others,
      })

      return await Promise.all([profile, user, others])
    },
    onSuccess: () => {
      setUI((prev) => {
        return {
          ...prev,
          personalModal: {
            ...prev.personalModal,
            visibility: false,
          },
        }
      })
      setMessage(() => 'Profile Updated Successfully')
      queryClient.invalidateQueries({
        queryKey: ['user'],
      })
      const t = setTimeout(() => {
        window.location.reload()
        clearTimeout(t)
      }, 4000)
    },
  })

  const onChange = (checkedValues: any) => {
    setPath(checkedValues)
  }

  const onSubmit = (values: any, { setSubmitting }: FormikHelpers<any>) => {
    setSubmitting(false)

    let p = path

    if (typeof path === 'string') {
      p = JSON.parse(path)
    }

    mutate({
      ...values,
      ...data,
      path: [...p],
    })
  }

  return (
    <Formik
      initialValues={{
        email: email,
        state: state ?? '',
        city: city ?? '',
        lga: lga ?? '',
        address: address ?? '',
        workplace: workplace ?? '',
      }}
      onSubmit={onSubmit}
      validationSchema={personalFormSchema}
      enableReinitialize
      validateOnMount
    >
      {({ handleSubmit }) => (
        <Form
          className={`w-full md:px-10 px-10 ${regularFont.className}`}
          onSubmit={handleSubmit}
        >
          <Field
            name="email"
            as={StyledInput}
            placeholder="Email"
            type={'email'}
            text={'Email'}
            disabled
          />
          <Field as={LocationComponent} city="city" state="state" lga="lga" />
          <div className="my-16">
            <Field
              name="address"
              placeholder="Address"
              as={StyledTextarea}
              type={'text'}
              text="Address"
              maxLength={300}
              rows={5}
              spellCheck="false"
            />
          </div>
          <Field
            name="workplace"
            placeholder="Workplace"
            as={StyledTextarea}
            type={'text'}
            text="Current Workplace"
            maxLength={300}
            rows={5}
            spellCheck="false"
          />

          <h3 className="ml-1 text-[16px] font-[600] mb-[30px]">Role</h3>
          <p className="text-ash_400 -mt-6 mb-5 w-full">
            Select all that applies to you
          </p>
          <div>
            <Checkbox.Group
              key={String(auth.path)}
              style={{ width: '100%' }}
              onChange={onChange}
              defaultValue={auth?.path ? auth?.path : path}
            >
              <Row>
                {['parent', 'teacher', 'school admin'].map((p, id) => (
                  <Col span={24} className="mb-5 ml-2" key={`${p}_${id}`}>
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: '#FF7517',
                          borderRadiusLG: 0,
                          colorBorder: '#70645C',
                        },
                      }}
                    >
                      <Checkbox
                        value={p}
                        className="font-[500] text-[1rem] capitalize"
                        checked
                      >
                        {p}
                      </Checkbox>
                    </ConfigProvider>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </div>
          <PersonalForm2 cb={(data: any) => setData(data)} />
          <div className="flex justify-center">
            <Button
              bold={false}
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

export default PersonalForm
