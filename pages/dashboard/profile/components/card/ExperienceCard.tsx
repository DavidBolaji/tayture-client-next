import React from 'react'
import { FaPen, FaTrash } from 'react-icons/fa'
import { Empty } from 'antd'
import CardWrapper from '@/components/Dashboard/CardWrapper'
import { WorkHistory, WorkRole } from '@prisma/client'
import ExperienceModal from '../modal/ExperienceModal/ExperienceModal'
import { useGlobalContext } from '@/Context/store'
import ExperienceEditModal from '../modal/ExperienceModal/ExperienceEditModal'
import { useMutation } from '@tanstack/react-query'
import { Axios } from '@/request/request'

interface ExperienceCardProp {
  experience: (WorkHistory & { roles: WorkRole[] })[]
}
const ExperienceCard: React.FC<ExperienceCardProp> = ({ experience }) => {
  const { setUI, setMessage } = useGlobalContext()

  const handleOpen = () => {
    setUI((prev) => {
      return {
        ...prev,
        experienceModal: {
          ...prev.experienceModal,
          visibility: true,
        },
      }
    })
  }

  const handleOpen2 = (exp:any) => {
    console.log(exp);
    setUI((prev) => {
      return {
        ...prev,
        experienceEditModal: {
          data: exp,
          visibility: true,
        },
      }
    })
  }
  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string) => {
      console.log(id)
      return Axios.delete(`/users/work/me/delete/${id}`)
    },
    onSuccess: () => {
      setMessage(() => 'Experience removed successfully')
      window.location.reload()
    },
  })
  return (
    <CardWrapper
      key="Work Experience"
      plus
      title="Work Experience"
      onClick={handleOpen}
      loading={isPending}
    >
      {experience.map((d: WorkHistory & { roles: WorkRole[] }) => (
        <div key={d.id} className="mb-8">
          <div className="grid grid-cols-7">
            <div className="col-span-5 text-black_400 text-[16px] font-[600]">
              {d.title}{' '}
              <span className="text-ash_400 text-[14px] font-[400] capitalize">
              ({d.startMonth} {d.startYear} - {' '}
              {/* @ts-ignore */}
                {d?.endDate.length > 1 ? d.endDate : `${d.endMonth} ${d.endYear}`})
              </span>
              <div className="text-ash_400 text-[14px] font-[400]">
                <p>{d.location}</p>
              </div>
            </div>
            <div className="col-span-2 flex gap-5 justify-end items-start w-full">
              <div
                onClick={() => handleOpen2(d)}
                className="w-[32px] h-[32px] rounded-full bg-ash_200 flex items-center justify-center border cursor-pointer hover:scale-110 border-ash_600 hover:border hover:border-ash_600  transition-all duration-300"
              >
                <FaPen color="#FFA466" />
              </div>
              <div
                onClick={() => mutate(d.id)}
                className="w-[32px] h-[32px] rounded-full bg-ash_200 flex items-center justify-center border cursor-pointer hover:scale-110 border-ash_600 hover:border hover:border-ash_600  transition-all duration-300"
              >
                <FaTrash color="#FFA466" />
              </div>
            </div>
          </div>
          <ul className="list-disc ml-5">
            {d.roles.map((role) => (
              <li
                key={role.id}
                className="text-black_200 text-[14px] font-[400] h-full  max-w-[748px] elipsis"
              >
                {role.role}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {experience.length === 0 && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      <ExperienceModal />
      <ExperienceEditModal />
    </CardWrapper>
  )
}

export default ExperienceCard
