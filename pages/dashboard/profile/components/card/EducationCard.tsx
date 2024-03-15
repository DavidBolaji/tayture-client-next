import React from 'react'
import { FaPen, FaTrash } from 'react-icons/fa'
import { Alert, Empty, Space } from 'antd'
import { MdOutlineError } from 'react-icons/md'
import CardWrapper from '@/components/Dashboard/CardWrapper'
import { Education } from '@prisma/client'
import EducationModal from '../modal/EducationModal/EducationModal'
import { useGlobalContext } from '@/Context/store'
import { useMutation } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import EducationEditModal from '../modal/EducationModal/EducationEditModal'

interface EducationCardProp {
  education: Education[]
}

const EducationCard: React.FC<EducationCardProp> = ({ education }) => {
  const { setUI, setMessage } = useGlobalContext()

  const handleOpen = () => {
    setUI((prev) => {
      return {
        ...prev,
        educationModal: {
          ...prev.educationModal,
          visibility: true,
        },
      }
    })
  }
  const handleOpen2 = (edu: Education) => {
    setUI((prev) => {
      return {
        ...prev,
        education2Modal: {
          data: edu,
          visibility: true,
        },
      }
    })
  }
  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string) => {
      return Axios.delete(`/users/education/me/delete/${id}`)
    },
    onSuccess: () => {
      setMessage(() => 'Education removed successfully')
      window.location.reload()
    },
  })
  return (
    <CardWrapper
      key="education"
      plus
      title={
        <Space direction="vertical">
          <span>Education</span>
          <div className="-translate-x-8 -mb-3 -mt-3 scale-90">
            <Alert
              type="error"
              showIcon
              message="List your educational qualification from the highest to the lowest"
              className="bg-transparent -translate-x-1 border-none text-[15px]"
              icon={
                <span className="inline-block mt-2 -translate-y-1">
                  <MdOutlineError color="#B3261E" />
                </span>
              }
            />
          </div>
        </Space>
      }
      onClick={handleOpen}
      loading={isPending}
    >
      {education.map((edu) => (
        <div key={edu.id}>
          <div className="grid grid-cols-7 ">
            <div className="col-span-5 text-black_400 text-[14px] md:text-[16px] font-[600]">
              {edu.school}
            </div>
            <div className="col-span-2 flex items-center gap-5 justify-end w-full">
              <div
                onClick={() => handleOpen2(edu)}
                className="w-[32px] h-[32px] rounded-full bg-ash_200 flex items-center justify-center border cursor-pointer hover:scale-110 border-ash_600 hover:border hover:border-ash_600  transition-all duration-300"
              >
                <FaPen color="#FFA466" />
              </div>
              <div
                onClick={() => mutate(edu.id)}
                className="w-[32px] h-[32px] rounded-full bg-ash_200 flex items-center justify-center border cursor-pointer hover:scale-110 border-ash_600 hover:border hover:border-ash_600  transition-all duration-300"
              >
                <FaTrash color="#FFA466" />
              </div>
            </div>
          </div>
          <p className="text-black_400 md:max-w-none max-w-[200px] md:text-[16px] text-[14px] font-[400] mb-[24px]">
            {edu.degree}
          </p>
        </div>
      ))}
      {education.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      <EducationModal />
      <EducationEditModal />
    </CardWrapper>
  )
}

export default EducationCard
