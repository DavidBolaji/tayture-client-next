'use client'
import { regularFont } from '@/assets/fonts/fonts'
import React, { useState } from 'react'
import AddSchoolForm from './AddSchoolForm/AddSchoolForm'
import AddSchoolFormAdmin from './AddSchoolFormAdmin/AddSchoolFormAdmin'
import Stepper from '@/components/Stepper/Stepper'

const AddSchool = () => {
  const [SW, setSW] = useState<any>(null)

  return (
    <div id="ele" className={`${regularFont.className} w-full`}>
      <Stepper init={(start) => setSW(start)}>
        <div className="active">
          <AddSchoolForm SW={SW} />
        </div>
        <div>
          <AddSchoolFormAdmin />
        </div>
      </Stepper>
    </div>
  )
}

export default AddSchool
