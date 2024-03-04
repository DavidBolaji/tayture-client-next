'use client'
import React from 'react'

import HomeLayout from '@/components/layouts/HomeLayout'
import Wrapper from '@/components/Wrapper/Wrapper'
import { AnimatePresence, motion } from 'framer-motion'
import { boldFont } from '@/assets/fonts/fonts'
import Stepper from '@/components/Stepper/Stepper'
import AssesementOne from './components/AssesementOne'
import InputComponent from './components/InputComponent'
import RadioComponent from './components/RadioComponent'
import SliderComponent from './components/SliderComponent'
import CheckComponent from './components/CheckComponent'
import useAssesement from '@/hooks/useAssesement'
import { Iques } from '@/Context/store'
import { ques } from '@/Context/data'
import { Alert, Drawer, Grid, Space } from 'antd'
import { Icons, Images } from '@/assets'
import Button from '@/components/Button/Button'
import Image from 'next/image'
import Spinner from '@/components/Spinner/Spinner'
import { isValidEmail } from '@/utils/helpers'
import RenderProgress from './components/RenderProgress'
const { useBreakpoint } = Grid

const Calculator = () => {
  const {
    fn,
    SW,
    setSW,
    path,
    error,
    start,
    end,
    loading,
    cur,
    visible,
    email,
    name,
    num,
    animating,
    isPending,
  } = useAssesement()
  const screen = useBreakpoint()

  const renderPath = path.map((p: any) =>
    ques[p].map((q: Iques, ind: number) => (
      <div key={q.id} className="flex flex-col items-center ">
        <p className="text-ash_400  w-full text-sm sm:text-md md:text-md mb-1 mt-3">
          Question {ind + 1} of {ques[p].length}
        </p>
        <h2 className="text-[18px] sm:text-[20px] max-w-[700px] w-full mb-3 no-s text-sm sm:text-md md:text-lg leading-6">
          {q.question}
        </h2>
        <div className="w-full flex items-start">
          <div className="w-3/4 ">
            {q.type === 'input' && (
              <InputComponent
                value={ind === 0 ? name : email}
                onBlur={(e) => {
                  fn.inputBlur(q.input_placeholder!)
                  fn.handleInputChange({ id: q.id, path: p }, e.target.value)
                }}
                placeholder={q.input_placeholder}
                onChange={(e) => {
                  fn.handleInput(e.target.value)
                  fn.setError('')
                }}
              />
            )}
            {error && (
              <Alert
                key={error}
                message={error}
                type="error"
                showIcon
                closable
              />
            )}
          </div>
        </div>
        <div className="w-full ">
          {q.type === 'radio' && (
            <RadioComponent
              options={q.options!}
              handleChange={fn.handleInputChange.bind(null, {
                id: q.id,
                path: p,
              })}
            />
          )}
        </div>
        <div className="w-full ml-2">
          <div className="md:w-[380px] sm:w-[300px]">
            {q.type === 'slider' && (
              <SliderComponent
                min={q.min ? q.min : 0}
                max={q.max ? q.max : 10}
                handleChange={fn.handleSlideChange.bind(null, {
                  id: q.id,
                  path: p,
                })}
              />
            )}
          </div>
        </div>
        <div className="w-full -mt-5">
          {q.type === 'checkbox' && (
            <CheckComponent
              defaultValue={[]}
              options={q.options!}
              handleChange={() =>
                fn.handleInputChange.bind(null, {
                  id: q.id,
                  path: p,
                })
              }
            />
          )}
        </div>
      </div>
    )),
  )

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          y: 0,
          opacity: 0,
        }}
        animate={{
          y: 82,
          opacity: 1,
          transition: { type: 'spring', duration: 1.5 },
        }}
        className={``}
      >
        <Wrapper>
          <div className="px-6 sm:px-24 mx-auto max-w-[800px]">
            <h2
              className={`text-xl text-center sm:text-2xl md:text-3xl text-black_400 mb-[16px] ${boldFont.className}`}
            >
              Tayture&apos;s Calculator
            </h2>
            <p className="text-ash_400 text-center mb-[25px] md:mb-[14px]">
              Kindly answer the questions as accurately as you possibly can.
            </p>
            <AnimatePresence mode="wait">
              {SW?.current > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { type: 'spring', duration: 1 },
                  }}
                >
                  <RenderProgress
                    box={ques[path[cur]]?.length}
                    done={num}
                    path={path[cur]}
                  />{' '}
                </motion.div>
              )}
            </AnimatePresence>
            <Stepper init={(data) => setSW(data)} className="overflow-hidden">
              <AssesementOne SW={SW} setPath={fn.handlePath} path={path} />
              {renderPath}
            </Stepper>
            <AnimatePresence mode="wait">
              {SW?.current > 0 && (
                <motion.div
                  initial={{
                    y: 200,
                  }}
                  animate={{
                    y: -20,
                  }}
                  className={`flex justify-end -mt-10 `}
                >
                  <Space>
                    {!end && (
                      <>
                        <div
                          onClick={() =>
                            start
                              ? null
                              : animating
                              ? {}
                              : fn.handleChange('prev')
                          }
                        >
                          <Icons.PrevCaret
                            width={screen.lg ? '45' : '40'}
                            height={screen.lg ? '45' : '40'}
                            disabled={start || animating}
                          />
                        </div>
                        <div
                          onClick={() =>
                            start && !name
                              ? fn.setError('First name is required')
                              : animating
                              ? {}
                              : fn.handleChange('next')
                          }
                        >
                          <Icons.NextCaret
                            width={screen.lg ? '45' : '40'}
                            height={screen.lg ? '45' : '40'}
                            disabled={(start && !name) || animating}
                          />
                        </div>
                      </>
                    )}
                    {end && (
                      <Button
                        type="button"
                        render="light"
                        bold={false}
                        text={
                          isPending ? <Spinner color={'white'} /> : 'Submit'
                        }
                        onClick={() => fn.handleSubmit()}
                        disabled={
                          (end && !email) || !isValidEmail(email) || isPending
                        }
                      />
                    )}
                  </Space>
                </motion.div>
              )}
            </AnimatePresence>
            <Drawer
              placement="bottom"
              closable={false}
              height={screen.lg ? '87%' : '90vh'}
              mask={false}
              open={visible}
            >
              <div className="flex items-center justify-center flex-col w-full h-full text-center">
                <div className="mb-5">
                  <Image src={Images.Transition} alt="transition" />
                </div>
                <p className="dsm:text-[24px] font-[500] text-black_400 dsm:max-w-[600px]">
                  Great work on completing the {path[cur]} Path quiz Now,
                  le&apos;s focus on your role as a {path[cur + 1]}
                </p>
                <p className="dsm:text-[20px] text-ash_400 mb-5">
                  Click continue to go the {path[cur + 1]} path quiz
                </p>
                <Button
                  bold={false}
                  text={loading ? <Spinner /> : 'continue'}
                  render="light"
                  hover
                  onClick={fn.handleTransition}
                />
              </div>
            </Drawer>
          </div>
        </Wrapper>
      </motion.div>
    </AnimatePresence>
  )
}

Calculator.getLayout = function getLayout(page: React.ReactNode) {
  return <HomeLayout>{page}</HomeLayout>
}
export default Calculator
