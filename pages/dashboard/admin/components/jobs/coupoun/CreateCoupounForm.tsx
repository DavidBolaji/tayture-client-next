import Button from '@/components/Button/Button'
import StyledInput from '@/components/Form/NomalInput/StyledInput'

import { Coupoun } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import * as Yup from 'yup'

import { Axios } from '@/request/request'
import { v4 as uuid } from 'uuid'
import { useGlobalContext } from '@/Context/store'
import { AxiosResponse } from 'axios'
import Spinner from '@/components/Spinner/Spinner'

export const coupounSchema = Yup.object().shape({
  value: Yup.string().required('Coupoun title is required'),
  amount: Yup.number().required('Amount is required'),
})

const CreateCoupounForm = () => {
  const queryClient = useQueryClient()
  const { setMessage } = useGlobalContext()

  const { mutate: createCoupoun, isPending } = useMutation({
    mutationFn: async (data: Partial<Coupoun>) => {
      return await Axios.post('/coupoun/create/me', { ...data })
    },
    onSuccess: (res: AxiosResponse) => {
      setMessage(() => res.data.message)
      queryClient.setQueryData(['allCoupoun'], (oldData: Coupoun[]) => {
        return [...oldData, res.data.coupoun]
      })
    },
  })

  const onSubmit = (
    values: Partial<Coupoun>,
    { resetForm }: FormikHelpers<Partial<Coupoun>>,
  ) => {
   
    createCoupoun(values)
    resetForm({
      values: {
        value: '',
        amount: 0,
      },
    })
  }

  return (
    <div className="w-full">
      <Formik
        initialValues={{
          value: '',
          amount: 0,
        }}
        validationSchema={coupounSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {({ handleSubmit, isValid, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <div>
                <label htmlFor="value" className="ml-1 text-xs">
                  Coupoun code
                </label>
                <div className="grid grid-cols-5 gap-x-2">
                  <div className='col-span-4'>
                    <Field
                      as={StyledInput}
                      name={'value'}
                      placeholder={'xx1356'}
                     
                    />
                  </div>
                  <div className='col-span-1 mt-1'>

                  <button
                    className="bg-black text-white px-2 py-2 rounded-lg"
                    type="button"
                    onClick={() => {
                      const id = uuid()
                      const idList = id.split('-')[0]
                      const code = idList.slice(0,6)
                      setFieldValue('value', code.toUpperCase())
                    }}
                  >
                    Generate
                  </button>
                  </div>
                </div>
              </div>
              <label htmlFor="amount" className="ml-1 text-xs">
                  Discount
                </label>
              <Field
                as={StyledInput}
                name={'amount'}
                type="num"
              />
            </div>
            <div >
                <Button
                disabled={!isValid}
                hover={isValid}
                render="light"
                bold={false}
                text={isPending ? <Spinner /> : 'Create'}
                type="submit"
                full
                />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreateCoupounForm
