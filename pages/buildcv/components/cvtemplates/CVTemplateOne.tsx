'use client'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import NameComponent from '../CVform/NameComponent'
import { boldFont, regularFont } from '@/assets/fonts/fonts'
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md'
import Skills from '../CVform/Skills'

import { SortableContext } from '@dnd-kit/sortable'
import { Row } from '../CVform/DragableSection'
import { useOrder } from '@/hooks/useOrder'
import { DndContext } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { useGlobalContext } from '@/Context/store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Col, Divider, Modal, Segmented, Row as AntRow } from 'antd'
import CVTemplatePreview from '../../components2/cvtemplates/CVTemplatePreview'
import { FaArrowCircleLeft, FaCheck, FaDownload } from 'react-icons/fa'
import { Axios } from '@/request/request'
import { useRouter } from 'next/router'
import Stepper from '@/components/Stepper/Stepper'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import LoginForm, { ILogin } from '@/pages/auth/LoginForm/LoginForm'
import { AnimatePresence, motion } from 'framer-motion'
import RegisterForm from '@/pages/auth/registerGroup/RegisterForm/RegisterForm'
import Spinner from '@/components/Spinner/Spinner'
import Image from 'next/image'
import { Images } from '@/assets'
import OTPInput from 'react-otp-input'
import TimerComponent from '@/components/TimerComponent'
import { loginUser } from '@/lib/api/user'
import { valdateOTP } from '@/lib/services/user'

interface Props {
  initialValues: any
  onSubmit: () => void
}

const CVTemplateOne = ({ hide }: { hide?: boolean }) => {
  const router = useRouter()

  const { dataSource, onDragEnd, init } = useOrder()
  const { user, setMessage, setCount, colorList } = useGlobalContext()
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData(['cvData']) as any
  const order = queryClient.getQueryData(['sectionOrder']) as string[]

  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [SW, setSW] = useState<any>(null)
  const [page, setPage] = useState('login')
  const [otp, setOtp] = useState('')

  useEffect(() => {
    queryClient.setQueryData(['cvLocation'], {
      state: 'Adamawa State',
      lga: 'Ganye',
      city: 'Gombi',
      address: 'wisdom street',
    })
    queryClient.setQueryData(['0.history'], {"location":"Wordhouse Green Primary School, Ghana","city":"Aba","state":"Abia State","lga":"Bende","address":"hajs, will"})
  }, [])

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: async (values: ILogin) => await loginUser({ ...values }),
    onSuccess: async (res) => {
      localStorage.setItem(
        'token',
        //@ts-ignore
        JSON.stringify(res.headers.getAuthorization().replace('Bearer ', '')),
      )
      await downloadCv()
      const t = setTimeout(() => {
        window.location.assign('/dashboard?profile=1')
        clearTimeout(t)
      }, 3000)
    },
    onError: (err) => {
      setMessage(() => (err as Error).message)
    },
  })

  const { mutate, isPending: isValidating } = useMutation({
    mutationFn: async (otp: string) => {
      return await valdateOTP({
        otp,
        pinId: user?.pinId as string,
        email: user.email as string,
      })
    },
    onSuccess: (res: any) => {
      const { verified, attemptsRemaining } = res.data
      setMessage(() => 'Hurray!!!, phone number verified')
      const t = setTimeout(() => {
        setMessage(() => '')
        clearTimeout(t)
      }, 1000)
      if (verified) {
        loginMutate({
          email: user.email as string,
          password: user.pass as string,
        })

        queryClient.invalidateQueries({
          queryKey: ['user'],
        })
      } else {
        setOtp('')
        setMessage(
          () => `Incorrect OTP. You  have ${attemptsRemaining} more attempt(s)`,
        )
        const t = setTimeout(() => {
          setMessage(() => '')
          clearTimeout(t)
        }, 1000)
      }
    },
    onError: (err) => {
      setOtp('')
      setMessage(() => (err as Error).message)
    },
  })

  useEffect(() => {
    if (otp.trim().length === 4) {
      mutate(otp.trim())
    }
  }, [otp])

  const isAuthenticated = () => localStorage.getItem('token')

  const downloadCv = async () => {
    setLoading(true)
    const loc = queryClient.getQueryData(['cvLocation'])
    const history = data.history.map((e: any, idx: number) => {
      const res = queryClient.getQueryData([`${idx}.history`]) as any
      return {
        ...e,
        lga: res.lga,
        city: res.city,
        state: res.state,
        address: res.address,

      }
    })
    const newObj = {
      ...data,
      history
    }

    try {
      const response = await Axios.post('/pdf', { data: newObj, colorList, loc })
      setMessage(() => response.data.message)
      const t = setTimeout(() => {
        setMessage(() => '')
        clearTimeout(t)
      }, 4000)
    } catch (error) {
      console.error('Error downloading PDF:', (error as Error).message)
      setMessage(() => (error as Error).message)
    } finally {
      setShow(false)
      setLoading(false)
    }
  }

  const handleClick = (values: any) => {
    const fVal = values
    const order = dataSource.map((e) => e.section.type.name)
    queryClient.setQueryData(['cvData'], fVal)
    queryClient.setQueryData(['sectionOrder'], order)
    const t = setTimeout(() => {
      setShow(true)
      setCount((prev) => prev + 1)
    }, 300)
  }

  const handleNext = () => {
    SW.next()
  }

  return (
    <>
      <Formik
        enableReinitialize
        key={init.history.length}
        initialValues={init}
        onSubmit={() => {}}
      >
        {({ values }) => (
          <Form className="w-full grid grid-cols-10  max-w-[742px] mb-48 border rounded-md shadow-lg">
            <div
              style={{
                backgroundColor: colorList.foreground,
              }}
              className={`col-span-7 p-5`}
            >
              <Field
                as={NameComponent}
                defaultValue={values.name}
                name="name"
                className="text-sm sm:text-md md:text-4xl lg:text-5xl font-bold uppercase"
                st={{
                  color: colorList.background,
                }}
              />
              <hr
                className="border-1.5 my-2"
                style={{
                  borderColor: colorList.background,
                }}
              />
              <h2
                className={`mt-10 text-xl ${boldFont.className} uppercase`}
                style={{
                  color: colorList.background,
                }}
              >
                Professional Summary
              </h2>
              <hr
                className="border-1.5 mb-2"
                style={{
                  borderColor: colorList.background,
                }}
              />
              <Field
                as={NameComponent}
                defaultValue={values.summary}
                name="summary"
                length={300}
                className="text-xs md:text-sm font-light"
                st={{
                  color: colorList.colorParagraph,
                }}
              />

              <div>
                <DndContext
                  modifiers={[restrictToVerticalAxis]}
                  onDragEnd={onDragEnd}
                >
                  <SortableContext items={dataSource.map((item) => item.key)}>
                    {dataSource.map((item) => (
                      <Row key={item.key} data-row-key={item.key}>
                        {item.section}
                      </Row>
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
            </div>
            <div
              className="col-span-3 items-center px-5 pt-10 space-y-4"
              style={{
                backgroundColor: colorList.background,
              }}
            >
              <div className="flex gap-3">
                <div
                  className="flex items-center w-7 h-6 justify-center rounded-full"
                  style={{
                    backgroundColor: colorList.textOne,
                  }}
                >
                  <MdLocationOn
                    style={{
                      color: colorList.background,
                    }}
                  />
                </div>
                <Field
                  as={NameComponent}
                  defaultValue={values.location}
                  name="location"
                  className="text-[10px]"
                  st={{
                    color: colorList.textOne,
                  }}
                />
              </div>
              <div className="flex gap-3">
                <div
                  className="flex items-center justify-center w-6 h-6 rounded-full p-1"
                  style={{
                    backgroundColor: colorList.textOne,
                  }}
                >
                  <MdPhone
                    style={{
                      color: colorList.background,
                    }}
                  />
                </div>
                <Field
                  as={NameComponent}
                  defaultValue={values.number}
                  name="number"
                  className="text-[12px] background] mt-0.5"
                  st={{
                    color: colorList.textOne,
                  }}
                />
              </div>
              <div className="flex gap-3">
                <div
                  className="flex items-center justify-center w-7 h-6 rounded-full bg-white"
                  style={{
                    backgroundColor: colorList.textOne,
                  }}
                >
                  <MdEmail
                    style={{
                      color: colorList.background,
                    }}
                  />
                </div>
                <Field
                  as={NameComponent}
                  defaultValue={values.email}
                  name="email"
                  className="text-[10px] mt-0.5 bg-[#102a73] text-white"
                  st={{
                    color: colorList.textOne,
                  }}
                />
              </div>
              <Skills skills={values.skills} />
            </div>
            <button
              type="button"
              onClick={() => handleClick(values)}
              className="px-2 border-orange border py-1 w-12 h-12 absolute bottom-[500px] md:left-10 lg:left-20 right-8 rounded-full transition-all items-center flex justify-center duration-300 hover:scale-110 bg-white"
            >
              <FaCheck color="green" />
            </button>
          </Form>
        )}
      </Formik>
      <Modal
        open={show}
        onCancel={() => setShow(false)}
        footer={null}
        closeIcon={null}
        width={800}
      >
        <Stepper init={(data) => setSW(data)}>
          <div id="ui">
            <div className="flex-col w-full justify-center relative">
              <button
                type="button"
                disabled={loading}
                className="absolute right-3 -top-5"
                onClick={() =>
                  !isAuthenticated() ? handleNext() : downloadCv()
                }
              >
                {loading ? (
                  <Spinner color="orange" />
                ) : (
                  <FaDownload color="#000000" />
                )}
              </button>
              <div className="mt-5">
                <CVTemplatePreview />
              </div>
            </div>
          </div>
          <div>
            <button
              type="button"
              disabled={loading}
              className=""
              onClick={() => {
                SW.prev()
              }}
            >
              <FaArrowCircleLeft size={18} />
            </button>
            <Divider>
              <span className="text-xl font-semibold md:text-2xl">
                Continue{' '}
              </span>
            </Divider>
            <p className="w-full text-center italic -mt-4">
              Login or register to download curriculum vitae
            </p>
            <div className="mt-5 w-full text-center">
              <Segmented
                defaultValue={page}
                onChange={(page) => setPage(page as string)}
                options={[
                  { label: 'Login', value: 'login', icon: <BarsOutlined /> },
                  {
                    label: 'Sign up',
                    value: 'signup',
                    icon: <AppstoreOutlined />,
                  },
                ]}
              />
              <div className="px-32">
                <AnimatePresence mode="wait">
                  {page === 'login' && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -100,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { type: 'spring', duration: 100 },
                      }}
                      exit={{
                        opacity: 0,
                        y: -100,
                      }}
                    >
                      <LoginForm show={false} />
                    </motion.div>
                  )}
                  {page === 'signup' && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -100,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { type: 'spring', duration: 100 },
                      }}
                      exit={{
                        opacity: 0,
                        y: -100,
                      }}
                    >
                      <RegisterForm
                        show={false}
                        cb={() => {
                          queryClient
                          SW.next()
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div>
            <AntRow>
              <Col
                span={24}
                className={`w-full relative dsm:mb-[32px] md:mb-[16px] mb-[16px] ${regularFont.className}`}
              >
                <div className="flex w-[300px] items-center mx-auto justify-center mt-5">
                  <Image
                    src={Images.Mail}
                    alt="mail"
                    width={190}
                    height={127}
                    className=""
                    priority
                  />
                </div>
              </Col>
              <Col span={24}>
                <h2
                  className={`text-black_200 font-[500] text-[16px] mb-[8px] text-center ${regularFont.className}`}
                >
                  Enter OTP
                </h2>
                <div className={`px-[49px] ${regularFont.className}`}>
                  <p className="text-ash_400 -mt-1 mb-[20px] text-[12px] xl:text-center sm:text-center md:text-center dsm:text-center lg:text-center text-center">
                    Enter the One-time Password you receive via SMS below.
                  </p>
                </div>
                <div className="text-center flex justify-center items-center mb-[8px] px-20">
                  {isPending || isValidating ? (
                    <Spinner color="orange" />
                  ) : (
                    <OTPInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={4}
                      placeholder="****"
                      inputStyle={{
                        border: 'none',
                        width: 50,
                        height: 50,
                        borderRadius: 10,
                        outline: 'none',
                      }}
                      containerStyle={{
                        gap: 32,
                        border: '0px',
                      }}
                      shouldAutoFocus
                      renderInput={(props) => (
                        <div className="border border-[#666666] rounded-[10px] focus-within:border-orange">
                          <input
                            {...props}
                            disabled={isPending || isValidating}
                          />
                        </div>
                      )}
                    />
                  )}
                </div>
                <div>
                  <TimerComponent />
                </div>
              </Col>
            </AntRow>
          </div>
        </Stepper>
      </Modal>
    </>
  )
}

export default CVTemplateOne
