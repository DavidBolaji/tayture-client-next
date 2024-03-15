'use client'

import { useGlobalContext } from '@/Context/store'
import React, { ChangeEvent, useRef, useState } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import UploadModal from '../UploadModal/UploadModal'
import { checkFileExtension } from '@/utils/helpers'
import CVComponent from '../CVComponent'
import Spinner from '../Spinner/Spinner'
import Cloudinary from '@/request/cloudinary'
import { Profile, User } from '@prisma/client'
import { Form, Formik } from 'formik'
import Button from '../Button/Button'
import { Axios } from '@/request/request'
import * as Yup from 'yup'

export const cvSchema = Yup.object().shape({
  cv: Yup.string().required('Upload Cv to submit'),
})

const isAllowedFileType = (fileType: string) =>
  [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ].includes(fileType)

const HandleUpload = () => {
  const { ui, setUI, setMessage } = useGlobalContext()
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData(['user']) as User & { profile: Profile }

  const [loading, setLoading] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    fn: (name: string, val: any) => void,
  ) => {
    const inputElement = e.target
    const files = inputElement.files

    if (files && files.length > 0) {
      const selectedFile = files[0]

      if (!isAllowedFileType(files[0].type))
        return setMessage(
          () => 'Invalid file type. Please upload a PDF, DOC, or DOCX file.',
        )

      const isLt2M = files[0].size / 1024 / 1024 < 2
      if (!isLt2M) return setMessage(() => 'Image must smaller than 2MB!')
      setLoading(true)

      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append(
        'upload_preset',
        `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`,
      )

      try {
        const response = await Cloudinary.post('/auto/upload', formData)
        const { secure_url } = response.data
        fn('cv', secure_url)
      } catch (error: any) {
        setMessage(() => `Error uploading banner: ${error.message}`)
      } finally {
        setLoading(false)
      }
    }
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      return await Axios.put('/users/profile/update/me', data)
    },
    onSuccess: (res) => {
      handleClose()
      queryClient.invalidateQueries({
        queryKey: ['users'],
      })
      setMessage(() => res.data.message)
      const t = setTimeout(() => {
        setMessage(() => '')
        clearTimeout(t)
      }, 5000)
    },
    onError: (err) => {
      setMessage(() => err.message)
      const t = setTimeout(() => {
        setMessage(() => '')
        clearTimeout(t)
      }, 5000)
    },
  })

  const handleClose = () => {
    setUI((prev) => {
      return {
        ...prev,
        uploadModal: {
          ...prev.uploadModal,
          visibility: false,
        },
      }
    })
  }

  const handleOk = () => {}

  const onSubmit = (values: any) => {
    mutate(values)
  }
  return (
    <UploadModal
      ok={handleOk}
      isOpen={ui.uploadModal?.visibility ? ui.uploadModal?.visibility : false}
      close={handleClose}
    >
      <Formik
        validateOnMount
        initialValues={{
          cv: user?.profile?.cv ?? '',
        }}
        validationSchema={cvSchema}
        onSubmit={onSubmit}
        enableReinitialize
        key={user?.profile?.cv ?? ''}
      >
        {({ values, setFieldValue, isValid, handleSubmit }) => (
          <Form className="w-full" onSubmit={handleSubmit}>
            <label className="mb-2 inline-block text-[20px] ml-1">
              Curriculum Vitae
            </label>
            {loading && (
              <div className="mb-3 flex items-center justify-center">
                <Spinner color="#ff7617" />
              </div>
            )}
            {values.cv && !loading && (
              <div className="mb-3">
                <CVComponent
                  ext={checkFileExtension(values.cv)}
                  onClick={() => window.location.assign(values.cv as string)}
                  name={values.cv.split('/')[values.cv.split('/').length - 1]}
                />
              </div>
            )}
            <button
              type="button"
              className="bg-transparent border text-orange border-orange rounded-full text-[14px] px-6 py-1 block"
              onClick={() => inputRef.current?.click()}
            >
              {values.cv ? 'Replace' : 'Upload'}
            </button>
            <small className="text-ash_400 ml-2 mt-2 inline-block ">
              DOC, PDF (5mb)
            </small>
            <input
              type="file"
              className="hidden"
              ref={inputRef}
              accept=".pdf, .doc, .docx"
              onChange={(e) => handleUpload(e, setFieldValue)}
            />
            <div className="pt-10 text-center">
              <Button
                disabled={!isValid || isPending}
                text={isPending ? <Spinner color="white" /> : 'Submit'}
                bold={false}
                render="light"
                type="submit"
              />
            </div>
          </Form>
        )}
      </Formik>
    </UploadModal>
  )
}

export default HandleUpload
