import Button from '@/components/Button/Button'
import StyledInput from '@/components/Form/NomalInput/StyledInput'
import Spinner from '@/components/Spinner/Spinner'
import { Axios } from '@/request/request'
import { Categories } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import React, { useEffect } from 'react'
import * as Yup from 'yup'

export const categorySchema = Yup.object().shape({
  title: Yup.string()
    .max(30, 'Category name cannot be more than 30 characters')
    .required('Category name is required'),
})

const CreateCategoryForm = () => {
  const queryClient = useQueryClient()
  //@ts-ignore
  // queryClient.setQueryData(['editCategory'], (data:any) => data, {retry: true})
  const editCategory = queryClient.getQueryData(['editCategory']) as Categories
  // const [count, setCount] = us
  const { mutate: createCategory, isPending } = useMutation({
    mutationFn: async (data: Partial<Categories>) => {
      return await Axios.post('/categories/create', { ...data })
    },
    onSuccess: (res) => {
      queryClient.setQueryData(['allCategory'], (oldData: Categories[]) => {
        let isNew = false

        const newData = oldData.map((oD) => {
          if (oD.id === res.data.category.id) {
            isNew = true
            return {
              ...res.data.category,
            }
          } else {
            return {
              ...oD,
            }
          }
        })

        if (isNew) {
          return newData
        } else {
          return [...newData, { ...res.data.category }]
        }
      })

      queryClient.removeQueries({
        queryKey: ['editCategory'],
      })
    },
  })

  const { mutate: resetForm } = useMutation({
    mutationFn: (data: Categories) => {
      return data as any
    },
    onSuccess: (data) => {
      queryClient.removeQueries({
        queryKey: ['editCategory'],
      })
    },
  })

  useEffect(() => {
    queryClient.removeQueries({
      queryKey: ['editCategory'],
    })
  }, [queryClient])

  const onSubmit = (
    values: Partial<Categories>,
    { resetForm }: FormikHelpers<Partial<Categories>>,
  ) => {
    createCategory(
      editCategory?.id
        ? { id: editCategory.id, title: values.title }
        : { title: values.title },
    )
    resetForm({
      values: {
        title: '',
      },
    })
  }

  return (
    <Formik
      initialValues={{
        title: editCategory?.title ?? '',
      }}
      validationSchema={categorySchema}
      onSubmit={onSubmit}
      validateOnMount
      enableReinitialize
      key={editCategory?.id || 0}
    >
      {({ handleSubmit, isValid }) => (
        <Form onSubmit={handleSubmit}>
          <div className="space-y-1 bg-[#fafafa] p-2 rounded-lg">
            <label htmlFor="title" className="ml-1 text-xs">
              Category name
            </label>
            <Field
              as={StyledInput}
              name={'title'}
              placeholder={'Admin'}
              className={'scale-75'}
            />
          </div>
          <div
            className={`flex mt-2 mr-1 ${
              editCategory?.id ? 'justify-between' : 'justify-end'
            }`}
          >
            {editCategory?.id && (
              <Button
                disabled={!isValid}
                hover={isValid}
                render="dark"
                onClick={() => resetForm(editCategory)}
                bold={false}
                text={'Reset'}
                type="button"
              />
            )}
            <Button
              disabled={!isValid}
              hover={isValid}
              render="light"
              bold={false}
              text={
                isPending ? <Spinner /> : editCategory?.id ? 'Update' : 'Create'
              }
              type="submit"
            />
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default CreateCategoryForm
