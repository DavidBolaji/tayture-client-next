import React, { useRef, useEffect, useState } from 'react'
import { Field, Form, Formik, useFormikContext } from 'formik'
import cn from 'classnames'
import { MdOutlineModeEdit } from 'react-icons/md'
import { regularFont } from '@/assets/fonts/fonts'
import { Drawer, Tooltip } from 'antd'
import { IoIosClose } from 'react-icons/io'
import LocationComponent from '@/components/LocationComponent/LocationComponent'
import StyledTextarea from '@/components/Form/TextareaInput/StyledTextarea'
import Button from '@/components/Button/Button'
import * as Yup from 'yup';
import {useQueryClient } from '@tanstack/react-query'

export const LocationSchema = Yup.object().shape({
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  lga: Yup.string().required('LGA is required'),
  address: Yup.string().required('Address is required')
})

export type Ilocation = {state: string; lga: string; address: string, city: string}
interface ITextarea {
  name?: string
  defaultValue?: string
  className?: string
  dir?: 'top' | 'bottom'
  st?: any
  hide?: boolean,
}

const NameComponent: React.FC<ITextarea> = ({
  name,
  dir,
  st,
  hide,
  ...rest
}) => {
  const { getFieldProps, getFieldMeta, setFieldValue } = useFormikContext()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [disabled, setDisabled] = useState(true)
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const fieldProps = getFieldProps(name!)
  const { error, value } = getFieldMeta(name!)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [value])

  if (!fieldProps) {
    return null
  }

  const handleEditClick = () => {
    if (name === "location") {
      setOpen(true)
    } else {
      setDisabled((prev) => !prev)
      if (textareaRef.current) {
        const t = setTimeout(() => {
          if (document) {
            const el = document.getElementById(name!)
            el!.focus()
  
            const length = (el as any).value.length as number
            ;(el as any).setSelectionRange(0, length, 'forward')
          }
          clearTimeout(t)
        }, 0)
      }
    }
  }

  const onSubmit = (data: Ilocation) => {
   queryClient.setQueryData(['cvLocation'], data)
   setFieldValue(name!, `${data.address}, ${data.lga}, ${data.city}, ${data.state}`)
   setOpen(false)
  }

  return (
    <div className="w-full relative">
      <textarea
        id={name}
        disabled={disabled}
        ref={textareaRef}
        {...fieldProps}
        spellCheck={false}
        autoFocus
        className={cn(
          `border-none w-full outline-none bg-transparent whitespace-pre-line ring-0  ${regularFont.className}`,
          rest.className,
        )}
        style={{ resize: 'none', overflow: 'hidden', ...st }}
      />
      {!hide && (
        <Tooltip title={`Edit ${name}`}>
          <div
            onClick={handleEditClick}
            className={`absolute cursor-pointer right-0 rounded-full hover:scale-105 bg-slate-300 hover:bg-orange transition-all duration-300 p-1 flex items-center justify-center ${
              dir === 'top' ? 'top-0' : 'bottom-0'
            }`}
          >
            {disabled ? (
              <MdOutlineModeEdit size={8} />
            ) : (
              <IoIosClose size={8} />
            )}
          </div>
        </Tooltip>
      )}
      <Drawer
        open={open}
        title="Set Location"
        onClose={() => setOpen(false)}
      >
        <Formik
          validationSchema={LocationSchema}
          validateOnMount
          initialValues={{
            state: '',
            lga: '',
            city: '',
            address: ''
          }}
          onSubmit={onSubmit}
        >
          {({handleSubmit, isValid}) => (
            <Form onSubmit={handleSubmit}>
              <Field as={LocationComponent} 
                city="city"
                state="state"
                lga="lga" 
              />
              <Field
                name="address"
                as={StyledTextarea}
                placeholder="User Address"
                text={'School Address'}
                rows={3}
                spellCheck="false"
              />
              <div className="text-center">
                <Button
                  disabled={!isValid}
                  bold={false}
                  hover={isValid}
                  text={'Done'}
                  render="light"
                  type="submit"
                />
            </div>

            </Form>
          )}
        </Formik>
      </Drawer>
    </div>
  )
}

export default NameComponent
