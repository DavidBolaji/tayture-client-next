import { boldFont } from '@/assets/fonts/fonts'
import Button from '@/components/Button/Button'
import { useRouter } from 'next/navigation'
import React from 'react'

const data = [
  {
    id: 'ex1',
    title: 'Explore Teaching Jobs',
    text: 'This section includes the following roles : primary school teachers , junior secondary school teachers and senior secondary school teachers',
    btn: 'Explore',
    href: '/jobs/teacher',
  },
  {
    id: 'ex2',
    title: 'Explore Administration Jobs',
    text: 'This section includes the following roles Vice Principals , School Assistants , School nurses',
    btn: 'Explore',
    href: '/jobs/admin',
  },
]

const Explore = () => {
  const router = useRouter()
  return (
    <div className="mt-[26px]">
      <h3 className={`text-black_200 mb-5 ${boldFont.className}`}>
        Explore By Type
      </h3>
      <div className="grid md:grid-cols-12 grid-cols-6 gap-[40px]">
        {data.map((d) => (
          <div
            key={d.id}
            className="col-span-6 px-[50px] py-[50px] bg-white rounded-md space-y-[16px] border border-[#666666] hover:shadow hover:cursor-pointer"
          >
            <h2 className="text-[24px]">{d.title}</h2>
            <p className="md:h-[72px]">{d.text}</p>
            <Button
              onClick={() => router.push(d.href)}
              render="dark"
              hover={true}
              bold={false}
              text={d.btn}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Explore
