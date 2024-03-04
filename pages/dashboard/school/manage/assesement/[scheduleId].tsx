import { regularFont } from '@/assets/fonts/fonts'
import Button from '@/components/Button/Button'
import Spinner from '@/components/Spinner/Spinner'
import { createTest, getTest } from '@/lib/api/test'
import { accessData } from '@/utils/data'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Checkbox, Col, ConfigProvider, Input, Row, Space } from 'antd'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  test: Yup.array().min(1).required('Test cannot be empty'),
})

const AssesementInterview = () => {
  const router = useRouter()
  const { scheduleId } = router.query
  const [value, setValue] = useState('')
  const [other, setOther] = useState<string[]>([])
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: [`test/${scheduleId}`],
    queryFn: async () => {
      const res = await getTest(scheduleId as string)
      const all = res.data.test
      const unique = res.data.test.filter(
        (t: any) => !accessData.includes(t.text),
      )
      return {
        all: all.map((a: any) => a.text),
        unique: unique.map((u: any) => u.text),
      }
    },
  })

  const { mutate, isPending } = useMutation({
    mutationKey: [`test/${scheduleId}`],
    mutationFn: async (data) => {
      return await createTest(data)
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [`job/scheduled/${res.data.job}`],
      })

      router.push(`/dashboard/school/manage/${res.data.job}?default=3`)

      queryClient.invalidateQueries({
        queryKey: [`test/${scheduleId}`],
      })
    },
  })

  const onSubmit = (values: any) => {
    mutate({ ...values, scheduleId })
  }

  const trigger = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (value.trim() === '') {
        return
      }
      setOther((prev) => [...prev, value])
      setValue('')
    }
  }

  const trigger2 = (event: any) => {
    event.preventDefault()
    if (value.trim() === '') {
      return
    }
    setOther((prev) => [...prev, value])
    setValue('')
  }

  return (
    <div
      className="flex items-center justify-center flex-col max-w-[648px] bg-white mx-auto md:px-[60px] px-5 py-[40px] overflow-hidden"
      id="scroll-post"
    >
      <h3 className="md:text-[24px] text-[20px] text-center font-[600] text-black_400">
        Prepare for interview
      </h3>
      <div className={`${regularFont.className} w-full`}>
        <Formik
          validateOnMount={true}
          validationSchema={validationSchema}
          initialValues={{
            test: data?.all.length > 0 ? [...data?.all] : [],
          }}
          onSubmit={onSubmit}
          enableReinitialize
          key={0}
        >
          {({ handleSubmit, isValid, values, setFieldValue }) => (
            <Form onSubmit={handleSubmit} className="mt-[40px] ">
              <div>
                <h3
                  className={`text-[16px] text-black ${regularFont.className}`}
                >
                  Assessment parameters
                </h3>
                <p className="text-ash_400 text-[14px] mb-8 font-thin">
                  What are the areas you want to measure during this interview?
                  We want to help you keep them in mind to increase your
                  efficiency and help you make a faster decision without errors
                  due to sentiment or inaccurate records. Please note that this
                  parameters are for your use only. They are NOT shared with
                  candidates.
                </p>
              </div>
              <p className="text-ash_400 text-[14px] mb-4 font-thin">
                You can select multiple
              </p>
              <Checkbox.Group
                onChange={(checked) => {
                  setFieldValue('test', checked)
                }}
                key={String(values.test)}
                defaultValue={[...values.test]}
                disabled={isPending}
              >
                <Row>
                  {!isLoading &&
                    accessData
                      .concat(data?.unique)
                      .concat(...other)
                      .map((p, id) => (
                        <Col
                          span={9}
                          className="mb-5 ml-2 mr-12"
                          key={`${p}_${id}`}
                        >
                          <ConfigProvider
                            theme={{
                              token: {
                                colorPrimary: '#FF7517',
                              },
                            }}
                          >
                            <Checkbox
                              value={p}
                              className={`font-[500] whitespace-nowrap text-[12px] capitalize ${regularFont.className}`}
                              checked
                            >
                              {p}
                            </Checkbox>
                          </ConfigProvider>
                        </Col>
                      ))}
                </Row>
              </Checkbox.Group>
              <div className="w-full mb-10">
                <div className="w-full py-1 rounded-md flex items-center focus-within:border-orange border rouded-md overflow-hidden pr-4">
                  <Input
                    disabled={isPending}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={trigger}
                    value={value}
                    className="border-0 focus:ring-0 outline-none"
                    placeholder="Add others"
                  />
                  <FaPaperPlane
                    className="cursor-pointer"
                    color="orange"
                    onClick={trigger2}
                  />
                </div>
              </div>

              <div className="text-center">
                <Button
                  disabled={!isValid || isPending}
                  bold={false}
                  hover={isValid}
                  text={isPending ? <Spinner color="white" /> : 'Save'}
                  render="light"
                  type="submit"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AssesementInterview
