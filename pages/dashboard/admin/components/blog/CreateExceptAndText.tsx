import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Button from '@/components/Button/Button'
import StyledTextarea from '@/components/Form/TextareaInput/StyledTextarea'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { message } from 'antd'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Blog } from '@prisma/client'
import moment from 'moment'
import { Axios } from '@/request/request'
import { AxiosResponse } from 'axios'
import Spinner from '@/components/Spinner/Spinner'
import { useGlobalContext } from '@/Context/store'

// Import react-draft-wysiwyg dynamically to avoid server-side rendering
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  {
    ssr: false,
  },
)

const exceptSchema = Yup.object().shape({
  except: Yup.string()
    .max(50, 'Except cannot be more than 30 characters')
    .required('Except title is required'),
})


const CreateExceptAndText: React.FC<{ SW: any }> = ({ SW }) => {
  const queryClient = useQueryClient()
  const {setMessage} = useGlobalContext()
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty(),
  )
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState<string>('')

  const {mutate: createBlog, isPending} = useMutation({
    mutationFn: async (data: Partial<Blog>) => {
      return await Axios.post('/blog/create/me', {...data})
    },
    onSuccess: (res: AxiosResponse) => {
      setMessage(() => res.data.message)
      SW.prev();
      setEditorState(EditorState.createEmpty())
      queryClient.removeQueries({
        queryKey: ['blogCreate']
      })
      queryClient.setQueryData(['allBlog'], (oldData: Blog[]) => {
        return [...oldData, res.data.blog]
      })

    }
  })

  const onSubmit = (values: { except: string }) => {
    const editorContent = convertToRaw(editorState.getCurrentContent())

    const isEmpty = editorContent.blocks.every((b) => b.text === '')
    if (
      !editorContent ||
      !editorContent.blocks ||
      editorContent.blocks.length === 0 ||
      isEmpty
    ) {
      message.error('Text cannot be empty')
      return
    }
    const remain = queryClient.getQueryData(['blogCreate']) as Partial<Blog>
    const current = moment()
    const currentPlus2 = current.add(2, "weeks")
    const currentPlus2DT = currentPlus2.format('YYYY-MM-DD HH:mm:ss')
    createBlog({ except: values.except, text: content, ...remain, updatedIsEditor: new Date(currentPlus2DT)  })
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  // Ensure window is defined and loading is done before rendering
  if (typeof window === 'undefined' || loading) return null

  return (
    <div className="pb-10 w-full p-2">
      <Formik
        validateOnMount={true}
        onSubmit={onSubmit}
        initialValues={{
          except: '',
        }}
        validationSchema={exceptSchema}
      >
        {({ isValid, handleSubmit }) => (
          <Form className="mt-[40px] -space-y-5" onSubmit={handleSubmit}>
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
            <div>
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
              <Button
                disabled={!isValid || isPending}
                bold={false}
                hover={isValid || !isPending}
                text={isPending ? <Spinner /> :'Create'}
                render="light"
                type="submit"
                full
              />
           
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreateExceptAndText
