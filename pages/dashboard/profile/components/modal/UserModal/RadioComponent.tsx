import { Col, ConfigProvider, Radio, Row } from 'antd'

interface RadioComponentProps {
  options: string[]
  handleChange: (value: string) => void
  distance?: boolean
  value?: string
}

function RadioComponent({
  options,
  handleChange,
  distance = false,
  value = '',
}: RadioComponentProps) {
  const onChange = (checkedValues: any) => {
    handleChange(checkedValues.target.value)
  }
  return (
    <div>
      <Radio.Group
        style={{ width: '100%' }}
        onChange={onChange}
        defaultValue={value}
      >
        <Row>
          {options.map((path) => (
            <Col
              span={24}
              className={`mb-5 ml-2 ${distance && 'mb-[8px]'}`}
              key={path}
            >
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#FF7517',
                    borderRadiusLG: 0,
                    colorBorder: '#70645C',
                    marginXS: 0.3,
                  },
                }}
              >
                <Radio
                  value={path}
                  className="font-[500] text-[1rem] capitalize"
                >
                  {path}
                </Radio>
              </ConfigProvider>
            </Col>
          ))}
        </Row>
      </Radio.Group>
    </div>
  )
}

export default RadioComponent
