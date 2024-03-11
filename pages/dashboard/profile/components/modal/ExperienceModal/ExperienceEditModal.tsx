import React from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import { StyledModal } from './ExperienceModal'
import { useGlobalContext } from '@/Context/store'
import ExperienceEditForm from './ExperienceEditForm'

const ExperienceEditModal: React.FC = () => {
  const { ui, setUI } = useGlobalContext()
  const handleClose = () => {
    setUI((prev) => {
      return {
        ...prev,
        experienceEditModal: {
          ...prev.experienceEditModal,
          visibility: false,
        },
      }
    })
  }
  return (
    <StyledModal
      open={ui?.experienceEditModal?.visibility}
      closable
      footer={null}
      onCancel={handleClose}
    >
      <div className="w-full h-full pt-[21px] pb-[41px] ">
        <h3 className="text-center mb-[48px] text-[24px] font-[600]">
          Update Experience
        </h3>
        <ExperienceEditForm exp={{ ...ui.experienceEditModal?.data }} />
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

export default ExperienceEditModal
