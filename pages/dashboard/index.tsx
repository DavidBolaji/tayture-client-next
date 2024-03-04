import DashboardCard from '@/components/Dashboard/DashboardCard'
import ProfileProgressCard from '@/components/Dashboard/ProfileProgressCard'
import RenderName from '@/components/Dashboard/RenderName'
import { dataCarousel } from '@/utils/data'
import React from 'react'
import { regularFont } from '@/assets/fonts/fonts'
import DashboardLayout from '@/components/layouts/DashboardLayout'

const Dashboard = () => {
  return (
    <>
      <RenderName />
      <p
        className={`max-w-[487px] md:mb-[40px] mb-[20px] text-black md:text-[32px] text-[16px] ${regularFont.className}`}
      >
        How would you improve your professional life today
      </p>
      <div className="overflow-x-auto w-full whitespace-no-wrap no-s block">
        <div className="flex space-x-4 mb-5">
          {dataCarousel.map((d) => (
            <div key={d.id} className="min-w-[300px]">
              <DashboardCard
                title={d.title}
                text={d.text}
                img={d.img}
                icon={d.icon}
                link={!d.link ? null : d.link}
                max
              />
            </div>
          ))}
        </div>
      </div>
      <div className="my-10">
        <ProfileProgressCard />
      </div>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: React.ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Dashboard
