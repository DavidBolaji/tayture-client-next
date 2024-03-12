import React from 'react'
import { Empty } from 'antd'
import CardWrapper from '@/components/Dashboard/CardWrapper'
import { Skills } from '@prisma/client'
import SkillModal from '../modal/SkillModal/SkillModal'
import { useGlobalContext } from '@/Context/store'

interface SkillCardProp {
  skills: Skills[]
}

const SkillCard: React.FC<SkillCardProp> = ({ skills }) => {
  const { ui, setUI } = useGlobalContext()

  const handleOpen = () => {
    setUI((prev) => {
      return {
        ...prev,
        skillModal: {
          data: skills.map(e => e.skill),
          visibility: true,
        },
      }
    })
  }
  return (
    <CardWrapper key="Skills" title="Skills" onClick={handleOpen}>
      {skills.map((sk: Skills) => (
        <span
          className="bg-orange inline-block  px-[27px] py-[5px] rounded-full text-center ml-2 mb-4"
          key={sk.id}
        >
          {sk.skill}
        </span>
      ))}
      {skills.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      <SkillModal />
    </CardWrapper>
  )
}

export default SkillCard
