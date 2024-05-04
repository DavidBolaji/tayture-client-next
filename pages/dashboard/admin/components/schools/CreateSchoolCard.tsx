import React from 'react'
import { GrAppsRounded } from 'react-icons/gr'
import AddSchool from '@/components/pagez/AddSchool'
import { Collapse } from 'antd'

const CreateSchoolCard = () => {
  return (
    <div className="bg-white border p-3 rounded-lg">
      <div className="flex items-center gap-3 mb-3">
        <div>
          <GrAppsRounded />
        </div>
        <div>Create new School</div>
      </div>

      <Collapse
        items={[
          {
            key: 'add',
            label: 'Create School',
            collapsible: 'header',
            children: <AddSchool />,
          },
        ]}
      />
    </div>
  )
}

export default CreateSchoolCard
