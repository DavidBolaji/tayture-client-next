import Button from '@/components/Button/Button'
import StyledInput from '@/components/Form/NomalInput/StyledInput'

import { Blog, Categories } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import BlogBanner from './BlogBanner'
import { useGlobalContext } from '@/Context/store'


export const blogSchema = Yup.object().shape({
  title: Yup.string()
    .max(30, 'Blog title cannot be more than 30 characters')
    .required('Blog title is required'),
})

const CreateBlogForm:React.FC<{SW: any}> = ({SW}) => {
  const queryClient = useQueryClient()
  const { img } = useGlobalContext()
  const noImage = img.trim().length < 1

  const onSubmit = (
    values: Partial<Blog>,
  ) => {
    queryClient.setQueryData(['blogCreate'], {picture: img, title: values.title })
    SW.next()
}

  return (
    <div className='w-full'>
      <Formik
        initialValues={{
          title: '',
        }}
        validationSchema={blogSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {({ handleSubmit, isValid }) => (
          <Form onSubmit={handleSubmit}>
            <div className='space-y-1'>
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
            </div>
            <div
            className={`flex mt-2 mr-1 justify-end`}
          >
           
            <Button
              disabled={!isValid || noImage}
              hover={isValid || !noImage}
              render="light"
              bold={false}
              text={
                 'Next' 
              }
              type="submit"
            />
          </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreateBlogForm
