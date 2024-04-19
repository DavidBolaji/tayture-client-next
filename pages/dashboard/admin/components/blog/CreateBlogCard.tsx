import { Formik } from 'formik';
import React, { useState } from 'react'
import { GrAppsRounded } from "react-icons/gr";
import Stepper, { StepperChildProps } from '@/components/Stepper/Stepper';
import CreateBlogForm from './CreateBlogForm';
import CreateExceptAndText from './CreateExceptAndText';

const CreateBlogCard = () => {
    const [SW, setSW] = useState<StepperChildProps | null>(null)
  return (
    <div className='bg-white border p-3 rounded-lg'>
        <div className='flex items-center gap-3 mb-3'>
            <div><GrAppsRounded /></div>
            <div>Create new Blog</div>
        </div>
        <Stepper init={setSW} className=' bg-[#fafafa] p-2 rounded-lg'>
            <CreateBlogForm SW={SW} />
            <CreateExceptAndText SW={SW} />
        </Stepper>
    </div>
  )
}

export default CreateBlogCard