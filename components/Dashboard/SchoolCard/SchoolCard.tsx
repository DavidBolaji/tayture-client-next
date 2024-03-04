import { schoolData } from '@/utils/data'
import React, { FC } from 'react'
import DashboardCard from '../DashboardCard'

const SchoolCard: FC<{ screen: any; isSchAdmin: boolean }> = ({
  screen,
  isSchAdmin,
}) => {
  return (
    <>
      <div className="grid-cols-3 gap-[21px] flex no-s overflow-x-auto ">
        {schoolData(isSchAdmin).map((d) => (
          <div
            key={d.title}
            className="space-x-4 col-span-3 gap-4 min-w-[300px] md:col-span-1"
          >
            <DashboardCard
              title={d.title}
              text={d.text}
              max
              img={d.img}
              icon={d.icon}
              link={d.link}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default SchoolCard
