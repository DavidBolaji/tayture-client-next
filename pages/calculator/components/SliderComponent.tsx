import { Col, ConfigProvider, InputNumber, Row, Slider } from 'antd'
import { useState } from 'react'

interface ISlide {
  min: number
  max: number
  handleChange: (value: number) => void
}

function SliderComponent({ min, max, handleChange }: ISlide) {
  const [inputValue, setInputValue] = useState(0)

  const onChange = (newValue: any) => {
    setInputValue(newValue)
    handleChange(newValue)
  }
  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Slider: {
              handleColor: '#FF7517',
              handleActiveColor: '#FF7517',
              handleLineWidth: 4,
              handleSizeHover: 10,
              railBg: '#ffa3668c',
              railHoverBg: '#ffa3668c',
              railSize: 5,
              trackBg: '#FF7517',
              trackHoverBg: '#FF7517',
            },
          },
          token: {
            colorPrimary: '#FF7517',
          },
        }}
      >
        <div className="relative w-full">
          <div className="absolute top-7 flex justify-between w-[80%] -translate-x-2">
            <p className="text-[12px] md:text-[12px]">Low</p>
            <p className="text-[12px] md:text-[12px]">High</p>
          </div>
          <div className="absolute top-0 w-full">
            <Row>
              <Col span={18}>
                <Slider
                  handleStyle={{
                    backgroundColor: '#FF7517',
                    borderColor: '#FF7517',
                    color: '#FF7517',
                    // width: 400,
                  }}
                  // tooltip={{ open: true }}
                  max={max}
                  min={min}
                  onChange={onChange}
                  value={typeof inputValue === 'number' ? inputValue : 0}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={min}
                  max={max}
                  style={{ margin: '0 16px' }}
                  value={inputValue}
                  onChange={onChange}
                  bordered={false}
                />
              </Col>
            </Row>
          </div>
        </div>
      </ConfigProvider>
    </div>
  )
}

export default SliderComponent
