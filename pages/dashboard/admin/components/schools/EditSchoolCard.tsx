import EditSchool from '@/components/pagez/EditSchool'
import { Collapse } from 'antd'
import React from 'react'
import { GrAppsRounded } from 'react-icons/gr'

const EditSchoolCard:React.FC<{count: number, setCount: (val: number) => void}> = ({count, setCount}) => {

  return (
    <div className="bg-white border p-3 rounded-lg">
      <div className="flex items-center gap-3 mb-3">
        <div>
          <GrAppsRounded />
        </div>
        <div>Edit School</div>
      </div>

      <Collapse
        key={count}
        onChange={() => setCount(count === 0 ? 1: 0)}
        activeKey={count}
        defaultActiveKey={[count]}
        items={[
          {
           key: 1, 
            label: 'Edit School',
            collapsible: 'header',
            children: <EditSchool />,
          },
        ]}
      />
    </div>
  )
}

export default EditSchoolCard
