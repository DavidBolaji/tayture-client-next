import { Checkbox, Col, ConfigProvider, Row } from 'antd'
import { CheckboxValueType } from 'antd/es/checkbox/Group'

function CheckComponent({
  options,
  handleChange,
  onChange,
  defaultValue,
  ...rest
}: {
  options: string[]
  handleChange?: (value: string) => void
  onChange?: (data: any) => any
  defaultValue: CheckboxValueType[]
}) {
  return (
    <div>
      <Checkbox.Group
        style={{ width: '100%' }}
        onChange={onChange}
        defaultValue={defaultValue && defaultValue}
      >
        <Row>
          {options.map((path) => (
            <Col span={24} className="mb-5 ml-2" key={path}>
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
                  {...rest}
                  value={path}
                  className="font-[500] text-[1rem] capitalize"
                >
                  {path}
                </Checkbox>
              </ConfigProvider>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    </div>
  )
}
export default CheckComponent
