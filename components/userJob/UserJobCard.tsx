import { Collapse } from 'antd'
import './UserJobCard.css'
import { FC, ReactNode } from 'react'

const UserJobCard: FC<{
  label: string | ReactNode
  render: string | ReactNode
  id: string
}> = ({ label, render, id }) => {
  const data = [
    {
      key: id,
      label,
      children: render,
    },
  ]
  return (
    <div className="mb-[24px]">
      <Collapse
        defaultActiveKey={['1']}
        expandIconPosition="end"
        size="large"
        items={data}
      />
    </div>
  )
}

export default UserJobCard
