'use client'
import React, { useState } from 'react'

import { IoMdClose } from 'react-icons/io'
import { RxHamburgerMenu } from 'react-icons/rx'
import DropdownComponent from './DropdownComponent'
import NotificationDropdown from './NotificationDropdown'
import DashboardDrawer from './DashboardDrawer'
import Whatsapp2 from '../Whatsapp/Whatsapp2'
import { useQueryClient } from '@tanstack/react-query'
import { User } from '@prisma/client'

const DashboardNav: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const queryClient = useQueryClient()
  const permission = queryClient.getQueryData(['permission'])
  const permissionGranted = permission !== 'limited'

  const user = queryClient.getQueryData(['user']) as User
  const isSuperAdmin = user?.role === "SUPER_ADMIN" || false
  const toggle = () => {
    setVisible((prev) => !prev)
  }
  return (
    <>
      <nav className="justify-between relative z-[5000] shadow-lg shrink-0 bg-[#050505] h-[5rem] xl:px-[4rem] px-[1.5rem] py-[1.25rem] flex items-center">
        <DropdownComponent isAdmin={false} />
        <div className="flex gap-[0.625rem]">
          <div className="scale-50 translate-y-[23px] translate-x-[13px]">
          {/* <a
            href={'https://wa.me/+2347067799302'}
            rel="noreferrer"
            target="_blank"
          >
            <Whatsapp2 />
          </a> */}
          </div>
          {permissionGranted && <NotificationDropdown mobile />}
          <div
            onClick={toggle}
            className="block cursor-pointer hover:scale-[1.05] duration-300 transition-transform"
          >
            {visible ? (
              <IoMdClose color="white" size={30} />
            ) : (
              <RxHamburgerMenu color="white" size={30} />
            )}
          </div>
        </div>
      </nav>
      <div className="">
        <DashboardDrawer
          visible={visible}
          isAdmin={isSuperAdmin}
          feedback={() => setVisible(false)}
        />
      </div>
    </>
  )
}

export default DashboardNav
