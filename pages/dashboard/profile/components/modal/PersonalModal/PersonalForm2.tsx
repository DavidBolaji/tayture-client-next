import { Others, User } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query'
import { Checkbox, Col, ConfigProvider, Row } from 'antd'
import { AnimatePresence, easeIn, easeOut, motion } from 'framer-motion'
import React, { useState } from 'react'

export default function PersonalForm2 ({cb}: {cb: (data: any) => void}) {
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData(['user']) as User & {others: Others[]};
    const [text, setText] = useState(user.othersText)
    const [textA, setTextA] = useState(user.others.map(e => e.text))
    const [checked, setChecked] = useState(user.others.length > 0 || (user.othersText && user.othersText?.trim().length > 0) ? true: false)

  return (
    <div className="mb-10">
    <Row>
      {['others'].map((p, id) => (
        <Col span={24} className="mb-5 ml-2" key={`${p}_${id}`}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#FF7517',
                borderRadiusLG: 0,
                colorBorder: '#70645C',
              },
            }}
          >
            <Checkbox
             checked={checked}
             onChange={(e) => {
                setChecked(e.target.checked)
                if(!e.target.checked) {
                    cb({
                        othersText: "",
                        others: []
                    })
                    setText("")
                    setTextA([])
                }
            }}
             className="font-[500] text-[1rem] capitalize">
              {p}
            </Checkbox>
          </ConfigProvider>
        </Col>
      ))}
    </Row>
  <AnimatePresence mode="wait">
    {checked  && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: 1,
          height: 230,
        }}
        transition={{
          duration: 0.5,
          ease: easeIn,
        }}
        exit={{
          opacity: 1,
          position: 'relative',
          zIndex: -300,
          height: -210,
          visibility: 'hidden',
          transition: {
            duration: 1,
            ease: easeOut,
          },
        }}
        className="translate-x-10 mb-10"
      >
        <Checkbox.Group
          style={{ width: '100%' }}
          onChange={(e: any) => {
            cb({
                othersText: text,
                others: e
            })
            setTextA(e)
        }
        }
          defaultValue={textA}
        >
          <Row>
            {['assistant', 'front desk', 'secretary', 'security'].map((p, id) => (
              <Col key={`${p}_${id}`} span={24} className="mb-5 ml-2">
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: '#FF7517',
                      borderRadiusLG: 0,
                      colorBorder: '#70645C',
                    },
                  }}
                >
                  <Checkbox
                    value={p}
                    className="font-[500] text-[1rem] capitalize"
                  >
                    {p}
                  </Checkbox>
                </ConfigProvider>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
        <input
          name="others"
          onChange={(e) => {
            setText(e.target.value)
            cb({
                othersText: e.target.value,
                others: textA
            })
        }}
          value={text ? text : ""}
          placeholder="Enter text"
          className="focus:outline-none focus:border-orange rounded-md py-2 px-2 border mb-5 inline-block"
        />
      </motion.div>
    )}
  </AnimatePresence>
</div>
  )
}
