import Stepper, { StepperChildProps } from '@/components/Stepper/Stepper'
import { Drawer } from 'antd'
import React, { useState } from 'react'
import ForgotPasswordInput from './ForgotPasswordInput'
import ForgotOTP from './ForgotOTP'

const ForgotDrawer: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const [SW, setSW] = useState<StepperChildProps | null>(null)

  return (
    <Drawer
      title="Forgot password"
      placement="right"
      onClose={onClose}
      open={open}
    >
      <Stepper init={setSW}>
        <ForgotPasswordInput SW={SW} />
        <ForgotOTP close={onClose} SW={SW} />
      </Stepper>
    </Drawer>
  )
}

export default ForgotDrawer
