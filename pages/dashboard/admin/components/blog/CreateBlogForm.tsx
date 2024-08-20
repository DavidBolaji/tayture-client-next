import Button from '@/components/Button/Button'
import StyledInput from '@/components/Form/NomalInput/StyledInput'

import { Blog, Categories } from '@prisma/client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import BlogBanner from './BlogBanner'
import { useGlobalContext } from '@/Context/store'
import { SelectInput } from '@/components/Form/SelectInput/SelectInput'
import { Axios } from '@/request/request'

export const blogSchema = Yup.object().shape({
  title: Yup.string()
    .max(300, 'Blog title cannot be more than 300 characters')
    .required('Blog title is required'),
  blogCategoryId: Yup.string().required('Blog Category is required'),
})

const CreateBlogForm: React.FC<{ SW: any }> = ({ SW }) => {
  const queryClient = useQueryClient()
  const {data: categories } = useQuery({
    queryKey: ['allCategory'],
    queryFn: async () => {
      const sch = await Axios.get('/categories')
      return sch.data.category as Categories[]
    },
  })

  const { img } = useGlobalContext()
  const noImage = img?.trim().length < 1

  const onSubmit = (values: Partial<Blog>,
    { resetForm }: FormikHelpers<Partial<Blog>>,
  ) => {
   
    queryClient.setQueryData(['blogCreate'], () => ({
      picture: noImage ? "https://placehold.co/600x400" : img,
      title: values.title,
      blogCategoryId: values.blogCategoryId,
    }))
    resetForm({
      values: {
        title: '',
        blogCategoryId: '',
      }
    })
    SW.next()
  }

  return (
    <div className="w-full">
      <Formik
        initialValues={{
          title: '',
          blogCategoryId: '',
        }}
        validationSchema={blogSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {({ handleSubmit, isValid, handleBlur, handleChange }) => (
          <Form onSubmit={handleSubmit}>
            <div className="space-y-1">
              <div className="flex justify-center mt-8 mb-2">
                <BlogBanner />
              </div>
              <div>
                <label htmlFor="title" className="ml-1 text-xs">
                  Blog Title
                </label>
                <Field
                  as={StyledInput}
                  name={'title'}
                  placeholder={'Being an outstanding Teacher'}
                  className={'scale-75'}
                />
              </div>
              <div>
                <label htmlFor="blogCategoryId" className="ml-1 text-xs">
                  Blog Category
                </label>
                <Field
                  name={'blogCategoryId'}
                  option={categories?.map((cat) => ({
                    key: cat.id,
                    value: cat.title,
                  }))}
                  as={SelectInput}
                  placeholder={'Select Category'}
                  onChange={(e: any) => {
                    console.log(e)
                    handleChange(e)
                  }}
                  onBlur={handleBlur}
                />
              </div>
            </div>
              <Button
                disabled={!isValid}
                hover={isValid}
                render="light"
                bold={false}
                text={'Next'}
                type="submit"
                full
                
              />
          
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreateBlogForm
