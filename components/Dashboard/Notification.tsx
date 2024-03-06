import React from 'react'
import { Badge } from 'antd'
import { HiOutlineBell } from 'react-icons/hi2'

const NotificationCom: React.FC<{
  color?: boolean
  show?: boolean
}> = ({ color, show }) => {
  return (
    <Badge size="default" dot={show || false} offset={[-10, 5]}>
      <HiOutlineBell
        color={color ? 'white' : 'black'}
        className="text-3xl cursor-pointer"
      />
    </Badge>
  )
}

export default NotificationCom
