import React, { memo } from 'react'

// import "./DashboardCard.css";
import Button from '../Button/Button'
import { regularFont } from '@/assets/fonts/fonts'
import { useRouter } from 'next/router'
import { useGlobalContext } from '@/Context/store'

const DashboardCard: React.FC<{
  title: string
  text: string
  icon?: React.ReactNode
  img?: string | React.ReactNode
  btn?: any
  max?: boolean
  link: string | null
}> = ({ title, text, icon, btn, img, max, link }) => {
  const router = useRouter()
  const { setUI } = useGlobalContext()

  const handleShow = () => {
    setUI((prev) => {
      return {
        ...prev,
        attentionModal: {
          ...prev.attentionModal,
          visibility: !prev.attentionModal?.visibility,
        },
      }
    })
  }

  const showUploadModal = () => {
    console.log('trig')
    setUI((prev) => {
      return {
        ...prev,
        uploadModal: {
          ...prev.uploadModal,
          visibility: true,
        },
      }
    })
  }

  console.log(title)

  return (
    <div
      onClick={() =>
        link && link.length > 1
          ? router.push(link)
          : title === 'Upload'
          ? showUploadModal()
          : title === 'coming'
          ? {}
          : handleShow()
      }
      className={`-z-[4] px-[16px] min-h-[146px] w-full transition-all ease-in duration-500 cursor-pointer hover:shadow border border-card_border rounded-[15px] py-[24px] flex flex-col justify-center bg-white ${
        title === 'Upload' && 'bg-upload'
      } ${regularFont.className}`}
    >
      <p
        className={`text-[12px] text-ash_400 font-[400] ${
          max ? 'max-w-[200px]' : ''
        }`}
      >
        {text}
      </p>

      <div className="relative">
        {title && title !== 'coming' ? (
          <div className="flex items-center gap-3">
            <h3 className="text-[16px] font-semibold mt-[8px]">{title}</h3>
            <div className="mt-2">{icon}</div>
          </div>
        ) : (
          <div className="mt-4">
            <div className="mb-[13px] text-[12px] bg-[#F6CDCB] rounded-full py-1 px-[8px] text-[#B3261E] inline">
              Coming soon
            </div>
          </div>
        )}
        <div className="mt-[15px] gap-4 grid grid-cols-2">
          <div className="col-span-1">{btn && <Button {...btn} />}</div>
          <div className="col-span-1 absolute right-0 -bottom-2">
            {img && img}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardCard
