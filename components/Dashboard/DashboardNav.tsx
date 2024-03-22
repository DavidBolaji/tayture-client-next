'use client'
import React, { useState } from 'react'

import { IoMdClose } from 'react-icons/io'
import { RxHamburgerMenu } from 'react-icons/rx'
// import NotificationDropdown from './NotificationDropdown';
import DropdownComponent from './DropdownComponent'
import NotificationDropdown from './NotificationDropdown'
import DashboardDrawer from './DashboardDrawer'

const DashboardNav: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const toggle = () => {
    setVisible((prev) => !prev)
  }
  return (
    <>
      <nav className="justify-between relative z-[5000] shadow-lg shrink-0 bg-[#050505] h-[5rem] xl:px-[4rem] px-[1.5rem] py-[1.25rem] flex items-center">
        <DropdownComponent isAdmin={false} />
        {/* <ul className="xl:flex hidden items-center gap-[4rem] ">{renderNav}</ul> */}
        <div className="flex gap-[0.625rem]">
          <NotificationDropdown mobile />
          <div
            onClick={toggle}
            className="dsm:hidden block cursor-pointer hover:scale-[1.05] duration-300 transition-transform"
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
        <DashboardDrawer visible={visible} isAdmin={false} feedback={() => setVisible(false)} />
      </div>
    </>
  )
}

export default DashboardNav
