import React from 'react'

const MatchedCardTableTitle = () => {
  return (
    <div className="grid grid-cols-12 bg-white p-[24px] rounded-t-[15px] sticky top-10 z-20 ">
      <div className="col-span-1">Name</div>
      <div className="col-span-3">Details</div>
      <div className="col-span-1 text-center">Experience</div>
      <div className="col-span-2 text-center">Qualification</div>
      <div className="col-span-1 text-center">Location</div>
      <div className="col-span-1 text-center">Status</div>
      <div className="col-span-2 text-center">Date</div>
      <div className="col-span-1 text-center">Hired</div>
    </div>
  )
}

export default MatchedCardTableTitle
