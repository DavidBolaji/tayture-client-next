import Button from '@/components/Button/Button'
import StyledTextarea from '@/components/Form/TextareaInput/StyledTextarea'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export const exceptSchema = Yup.object().shape({
  except: Yup.string()
    .max(30, 'Except cannot be more than 30 characters')
    .required('Except title is required'),
  text: Yup.string()
    .max(500, 'Text cannot be more than 30 characters')
    .required('Text is required'),
})

const CreateExceptAndText: React.FC<{ SW: any }> = ({ SW }) => {
    const [editorState, setEditorState] = useState('')
  return (
    <div className="pb-10 w-full p-2">
      <Formik
        validateOnMount={true}
        onSubmit={() => console.log('object')}
        initialValues={{
          except: '',
          text: '',
        }}
        validationSchema={exceptSchema}
      >
        {({ isValid, values }) => (
          <Form className="mt-[40px] -space-y-5">
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
              <h3 className={`ml-1 mb-1 text-[14px] font-[600]`}>
                Text
              </h3>
              <Field
                name="text"
                as={StyledTextarea}
                placeholder="text"
                type={'text'}
                // text={'text'}
                rows={7}
                spellCheck="false"
              />
              {/* <Editor
              //
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={setEditorState}
                /> */}
            </div>

            <div className="flex justify-between">
            <Button
                
                bold={false}
                
                text={'Back'}
                render="dark"
                  onClick={() => SW.prev()}
                type="button"
              />
            <Button
                disabled={!isValid}
                bold={false}
                hover={isValid}
                text={'Next'}
                render="light"
                //   onClick={() => handleSubmit(values)}
                type="button"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreateExceptAndText
