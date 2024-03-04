'use client'
import { regularFont } from '@/assets/fonts/fonts'
import React, { useState } from 'react'

import EditSchoolForm from './EditSchoolForm/EditSchoolForm'
import EditSchoolFormAdmin from './EditSchoolFormAdmin/EditSchoolFormAdmin'
import Stepper from '@/components/Stepper/Stepper'

const EditSchool = () => {
  const [SW, setSW] = useState<any>(null)
  return (
    <div className={`${regularFont.className} w-full`}>
      <Stepper init={(init) => setSW(init)} className="bg-white">
        <div>
          <EditSchoolForm SW={SW} />
        </div>
        <div>
          <EditSchoolFormAdmin />
        </div>
      </Stepper>
    </div>
  )
}

export default EditSchool
