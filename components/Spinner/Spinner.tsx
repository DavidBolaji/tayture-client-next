import { ConfigProvider, Spin } from 'antd'
import React from 'react'

const Spinner: React.FC<{ color?: string }> = ({ color }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: color || 'white',
      },
    }}
  >
    <Spin />
  </ConfigProvider>
)

export default Spinner
