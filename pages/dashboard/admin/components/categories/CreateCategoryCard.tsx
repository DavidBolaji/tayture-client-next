import { Formik } from 'formik';
import React from 'react'
import { GrAppsRounded } from "react-icons/gr";
import CreateCategoryForm from './CreateCategoryForm';

const CreateCategoryCard = () => {
  return (
    <div className='bg-white border p-3 rounded-lg'>
        <div className='flex items-center gap-3 mb-3'>
            <div><GrAppsRounded /></div>
            <div>Create new category</div>
        </div>
       <CreateCategoryForm />
    </div>
  )
}

export default CreateCategoryCard