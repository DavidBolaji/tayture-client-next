'use client'
import { ErrorMessage, useFormikContext } from 'formik'
import React, { FC, useState } from 'react'
import { Checkbox, ConfigProvider, Radio, RadioChangeEvent, Space } from 'antd'
import {
  FaCaretDown,
  FaCaretLeft,
  FaCaretRight,
  FaCaretUp,
} from 'react-icons/fa'
import { regularFont } from '@/assets/fonts/fonts'
import { AnimatePresence, motion } from 'framer-motion'
import { AdministratorHire, teacherHire } from '@/utils/data'
import FormError from '@/components/FormError/FormError'

const { Group, Button } = Radio

const JobRadioComponent: FC<{ name: string; name2: string; SW: any }> = ({
  name,
  name2,
  SW,
  ...rest
}) => {
  /**formik props */
  const { getFieldProps, getFieldMeta, setFieldValue } = useFormikContext()

  const fieldProps = getFieldProps(name!)
  /**value for main radio => teacher or admin */
  const { error, touched, value } = getFieldMeta(name!)
  /** value for secondary checkbox and radio option radio */
  const { value: v } = getFieldMeta(name2!)
  const isNotArrayJson = !(rest as any).defaultValue?.includes('[')

  const defaultV = isNotArrayJson
    ? v
    : !(v as any).trim().length
    ? JSON.stringify([])
    : JSON.parse(v as string)

  if (!fieldProps) {
    return null
  }
  /**main group change */
  const onChange = (e: any) => {
    setFieldValue(name, e.target.value)
  }

  /** radio options addmin change listener */
  const onChange3 = (e: RadioChangeEvent) => {
    setFieldValue(name2, e.target.value)
  }

  /**Checkbox change listener */
  const onChange2 = (field: string, checked: any) => {
    /**is default value empty, page just initialized
     * in that casw push first element and create array
     */
    if (!defaultV.length) {
      setFieldValue(name2, JSON.stringify([field]))
    } else {
      /**check if value is an array
       * case - a radio was previously selected
       */
      if ((defaultV as string)?.includes('[')) {
        /**check if value is already in array
         * inference is it should be removed
         */
        if (defaultV.includes(field)) {
          setFieldValue(
            name2,
            JSON.stringify(
              JSON.parse(defaultV).filter((v: string) => v !== field),
            ),
          )
        } else {
          /** value is not in array
           * inference add it to array
           */
          setFieldValue(
            name2,
            JSON.stringify(JSON.parse(defaultV.trim()).concat(field)),
          )
        }
      } else {
        setFieldValue(name2, JSON.stringify([field]))
      }
    }
  }

  return (
    <div className="mb-10 ">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#393939',
          },
        }}
      >
        <Group
          onChange={onChange}
          disabled={(rest as any).disabled ? (rest as any).disabled : false}
        >
          <div className="flex flex-col gap-5">
            <Button
              value="teacher"
              className="relative flex items-center w-10 "
            >
              {value === 'teacher' ? (
                <FaCaretDown className="-ml-[3px]" />
              ) : (
                <FaCaretRight className="-ml-[2px] mt-[2px]" />
              )}
              <span
                className={`absolute -right-[75px] bottom-0 ${regularFont.className}`}
              >
                Teacher
              </span>
            </Button>
            <AnimatePresence mode="wait">
              {value === 'teacher' && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: 80,
                    transition: { type: 'spring' },
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  className="ml-3 -mt-2"
                >
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: '#ff7517',
                      },
                    }}
                  >
                    {teacherHire.map((admin) => {
                      return (
                        <motion.div key={admin.label}>
                          {defaultV.includes(admin.value)}
                          <Checkbox
                            key={defaultV}
                            disabled={
                              (rest as any).disabled
                                ? (rest as any).disabled
                                : false
                            }
                            className="w-full mb-2"
                            onChange={onChange2.bind(null, admin.label)}
                            defaultChecked={defaultV.includes(admin.value)}
                          >
                            {admin.value}
                          </Checkbox>
                        </motion.div>
                      )
                    })}
                  </ConfigProvider>
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              value="admin"
              className="relative flex items-center w-10 rotate-180 border "
            >
              {value === 'admin' ? (
                <FaCaretUp className="-ml-[3px]" />
              ) : (
                <FaCaretLeft className="-ml-[4px]" />
              )}
              <span
                className={`absolute -left-[115px] top-0 rotate-180 ${regularFont.className}`}
              >
                Administrator
              </span>
            </Button>
            <AnimatePresence mode="wait">
              {value === 'admin' && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: 225,
                    transition: { type: 'spring' },
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  className="ml-3 -mt-3"
                >
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: '#ff7517',
                      },
                    }}
                  >
                    <Group
                      key={defaultV as any}
                      className="block w-full"
                      defaultValue={defaultV}
                      onChange={onChange3}
                      disabled={
                        (rest as any).disabled ? (rest as any).disabled : false
                      }
                    >
                      {AdministratorHire.map((admin) => {
                        return (
                          <motion.div key={admin.key}>
                            <Radio
                              className="block w-full mb-2"
                              value={admin.key}
                            >
                              {admin.value}
                            </Radio>
                          </motion.div>
                        )
                      })}
                    </Group>
                  </ConfigProvider>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Group>
      </ConfigProvider>
      <ErrorMessage name={name!}>
        {(msg) => <FormError msg={msg} />}
      </ErrorMessage>
      <ErrorMessage name={name2!}>
        {(msg) => <FormError msg={msg} />}
      </ErrorMessage>
    </div>
  )
}

export default JobRadioComponent
