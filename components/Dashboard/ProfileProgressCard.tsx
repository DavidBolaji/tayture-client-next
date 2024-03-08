'use client'
import React from 'react'
import { ConfigProvider, Progress } from 'antd'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button/Button'
import { regularFont } from '@/assets/fonts/fonts'

const ProfileProgressCard: React.FC = () => {
  const router = useRouter()
  return (
    <div
      className={`w-full md:h-48 md:grid grid-cols-9 rounded-[18px] overflow-hidden cursor-pointer hover:shadow ${regularFont.className}`}
    >
      <div className="col-span-2 md:py-0 py-3 bg-orange flex items-center justify-center ">
        <ConfigProvider
          theme={{
            token: {
              colorInfo: '#000',
            },
          }}
        >
          <Progress percent={50} type="circle" />
        </ConfigProvider>
      </div>
      <div className="col-span-7 px-10 py-[36px] md:flex items-center bg-white justify-between">
        <div className="">
          <h3 className="text-black_200 text-[16px] mb-[8px]">
            Complete your profile
          </h3>
          <p className="max-w-[302px] text-ash_400 text-[12px] mb-3">
            Only applicants with a profile completion of 70% or higher are
            eligible to apply for job openings
          </p>
        </div>
        <div className="">
          <Button
            render="dark"
            text="Complete setup"
            onClick={() => router.push('/dashboard/profile')}
            gray
            hover={false}
            bold={false}
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileProgressCard
