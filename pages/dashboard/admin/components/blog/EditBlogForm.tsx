import Button from '@/components/Button/Button'
import StyledInput from '@/components/Form/NomalInput/StyledInput'
import { Blog, Categories } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import BlogBanner from './BlogBanner'
import { useGlobalContext } from '@/Context/store'
import { SelectInput } from '@/components/Form/SelectInput/SelectInput'
import dynamic from 'next/dynamic'
import StyledTextarea from '@/components/Form/TextareaInput/StyledTextarea'
import htmlToDraft from 'html-to-draftjs'
import { ContentState, EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import Spinner from '@/components/Spinner/Spinner'
import { message } from 'antd'

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  {
    ssr: false,
  },
)

export const blogSchema = Yup.object().shape({
  title: Yup.string()
    .max(30, 'Blog title cannot be more than 30 characters')
    .required('Blog title is required'),
  blogCategoryId: Yup.string().required('Blog Category is required'),
  except: Yup.string()
    .max(50, 'Except cannot be more than 50 characters')
    .required('Except title is required'),
})

const EditBlogForm: React.FC<{
  blog: Blog | null
  updateBlog: (data: Partial<Blog>) => void
}> = ({ blog, updateBlog }) => {
  const queryClient = useQueryClient()
  const { setImg } = useGlobalContext()
  const categories = queryClient.getQueryData(['allCategory']) as Categories[]
  const [content, setContent] = useState<string>('')
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty(),
  )
  const { img } = useGlobalContext()
  const noImage = img.trim().length < 1

  const convertBlogContent = (content: string) => {
    const cBlock = htmlToDraft(content)
    const cState = ContentState.createFromBlockArray(cBlock.contentBlocks)
    const eState = EditorState.createWithContent(cState)
    setEditorState(eState)
  }

  useEffect(() => {
    if (blog) {
      console.log(blog)
      // setImg(() => blog!.banner)
      convertBlogContent(blog!.text)
    }
  }, [blog])

  const onSubmit = (
    values: Partial<Blog>,
    { resetForm, setSubmitting }: FormikHelpers<Partial<Blog>>,
  ) => {
    const editorContent = convertToRaw(editorState.getCurrentContent())

    const isEmpty = editorContent.blocks.every((b) => b.text === '')
    if (
      !editorContent ||
      !editorContent.blocks ||
      editorContent.blocks.length === 0 ||
      isEmpty
    ) {
      message.error('Text cannot be empty')
      setSubmitting(false)
      return
    }
    updateBlog({ id: blog?.id, ...values, text: content, banner: img })
    resetForm({
      values: {
        title: '',
        blogCategoryId: '',
        except: '',
      },
    })
  }

  return (
    <div className="w-full">
      <Formik
        initialValues={{
          title: blog?.title ?? '',
          blogCategoryId: blog?.blogCategoryId ?? '',
          except: blog?.except,
        }}
        validationSchema={blogSchema}
        onSubmit={onSubmit}
        validateOnMount
        enableReinitialize
        key={(blog?.id || img) ?? 0}
      >
        {({ handleSubmit, isValid, handleBlur, handleChange, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="flex justify-center mt-8 mb-2">
                <BlogBanner />
              </div>
              <div className='-mb-4'>
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
                  option={categories.map((cat) => ({
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
              <div>
                <label htmlFor="except"></label>
                <Field
                  name="except"
                  as={StyledTextarea}
                  placeholder="except"
                  type={'text'}
                  text={'Except'}
                  rows={2}
                  spellCheck="false"
                />
              </div>
              <div className=''>
                <h3 className={`ml-1 mb-1 text-[14px] font-[600]`}>Text</h3>
                <div className="border p-2 bg-white mb-10">

                  <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={(newState) => {
                      setEditorState(newState)
                      setContent(
                        draftToHtml(convertToRaw(newState.getCurrentContent())),
                      )
                    }}
                    toolbar={{
                      options: [
                        'inline',
                        'blockType',
                        'fontSize',
                        'list',
                        'textAlign',
                        'history',
                        'embedded',
                        'emoji',
                      ],
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                      history: { inDropdown: true },
                    }}
                  />
                </div>
              </div>
            </div>
            <Button
              disabled={!isValid || noImage || isSubmitting}
              hover={isValid}

              render="light"
              bold={false}
              text={isSubmitting ? <Spinner /> : 'Update'}
              type="submit"
              full
            />
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EditBlogForm
