import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosCloseCircle } from 'react-icons/io'
import { StyledModal } from './EducationModal'
import { useGlobalContext } from '@/Context/store'
import EducationEditForm from './EducationEditForm'

const EducationEditModal: React.FC = () => {
  const { setUI, ui } = useGlobalContext()
  const handleClose = () => {
    setUI((prev) => {
      return {
        ...prev,
        education2Modal: {
          ...prev.education2Modal,
          visibility: false,
        },
      }
    })
  }
  return (
    <StyledModal
      open={ui.education2Modal?.visibility}
      closable
      footer={null}
      onCancel={handleClose}
    >
      <div className="w-full h-full pt-[21px] pb-[41px] ">
        <h3 className="text-center mb-[48px] text-[24px] font-[600]">
          Update Education
        </h3>
        <EducationEditForm data={{ ...ui.education2Modal?.data }} />
      </div>
      <div
        className="absolute top-7 right-8 z-20 hover:scale-[1.1] delay-200 transition-transform cursor-pointer duration-1000 ease-in-out cursor-point rounded-full"
        onClick={handleClose}
      >
        <IoIosCloseCircle size={24} color="#666666" />
      </div>
    </StyledModal>
  )
}

export default EducationEditModal
