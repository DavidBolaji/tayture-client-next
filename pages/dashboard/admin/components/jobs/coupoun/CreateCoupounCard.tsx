
import React from 'react'
import { GrAppsRounded } from "react-icons/gr";
import CreateCoupounForm from './CreateCoupounForm';


const CreateCoupounCard = () => {
  return (
    <div className='bg-white border p-3 rounded-lg'>
        <div className='flex items-center gap-3 mb-3'>
            <div><GrAppsRounded /></div>
            <div>Create new Coupoun</div>
        </div>
        <div className='bg-[#fafafa] p-2 rounded-lg'>
            <CreateCoupounForm  />
        </div>
    </div>
  )
}

export default CreateCoupounCard