import { Checkbox, ConfigProvider, Space } from 'antd'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import React, { useRef } from 'react'
import { regularFont } from '@/assets/fonts/fonts'
import styled from '@emotion/styled'
import Button from '@/components/Button/Button'

const StyledCheckbox = styled(Checkbox)`
  > * input[type='checkbox'] {
    border: 2px solid black !important;
  }
  && {
    .ant-checkbox-input {
      outline: none;
    }
  }
`

interface AssessmentOneProps {
  SW: any
  path: string[]
  setPath: (data: string[]) => void
}

const validationSchema = Yup.object().shape({
  selected: Yup.array()
    .required('Must select at least one path')
    .min(1, 'Minimum of 1 path'),
})

const AssessmentOne: React.FC<AssessmentOneProps> = ({ SW, setPath, path }) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const onSubmit = (values: { selected: string[] }) => {
    setPath(values.selected)
  }

  return (
    <div className="w-full">
      <h3 className={`text-lg sm:text-xl md:text-2xl text-black_400 mb-[16px]`}>
        Kindly select all that apply to you?
      </h3>
      <Formik
        validateOnMount={true}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        initialValues={{
          selected: [],
        }}
      >
        {({ isValid, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#FF7517',
                  borderRadiusLG: 0,
                  colorBorder: '#70645C',
                },
              }}
            >
              <Checkbox.Group
                key={SW?.current}
                defaultValue={path}
                onChange={(checked) => {
                  setFieldValue('selected', checked)
                  const t = setTimeout(() => {
                    btnRef.current?.click()
                  }, 500)
                }}
              >
                <Space direction="vertical" className="gap-y-7">
                  {['teacher', 'school admin', 'parent'].map((path: string) => (
                    <StyledCheckbox key={path} value={path}>
                      <span
                        className={`capitalize ${regularFont.className} ml-2`}
                      >
                        {path}
                      </span>
                    </StyledCheckbox>
                  ))}
                </Space>
              </Checkbox.Group>
            </ConfigProvider>
            <div className="mt-12 flex justify-end ml-auto">
              <Button
                type="button"
                onClick={() => SW.next()}
                text="Next"
                render="light"
                bold={false}
                disabled={!isValid}
                hover={isValid}
              />
            </div>
            <button type={'submit'} className="hidden" ref={btnRef}></button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AssessmentOne
