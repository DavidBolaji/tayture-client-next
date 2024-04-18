'use client'
import React, { useState } from 'react'
import Wrapper from '@/components/Wrapper/Wrapper'
import { Grid, Menu, Space } from 'antd'
import Button from '@/components/Button/Button'
import { Icons } from '@/assets'
import { DropdownMenu } from '@/components/DropdownMenu/DropdownMenu'
import { RxHamburgerMenu } from 'react-icons/rx'
import { IoMdClose } from 'react-icons/io'
import { useRouter } from 'next/navigation'
import type { MenuProps } from 'antd'
import styled from '@emotion/styled'
import usePath from '@/hooks/usePath'
import { regularFont } from '@/assets/fonts/fonts'

const StyledMenu = styled(Menu)`
  font-size: 14px;
  
  && {
    background-color: black;
    color: #d9d2d2 !important;
    transition: 500ms linear all;
    .ant-menu-item.ant-menu-item-active {
      background-color: transparent;
      color: #ff7517 !important;
    }
   

    & > *.ant-menu-item.ant-menu-item-active::after {
      border-bottom: 0px solid transparent;
    }
    
    .ant-menu-item.ant-menu-item-selected > .ant-menu-title-content {
      color:  #ff7517 !important;
    }
    .ant-menu-item > .ant-menu-title-content {
      color: #fff !important;
      &:hover {
        color:  #ff7517 !important;
      }
    }
    & > .ant-menu-item.ant-menu-item-selected::after {
      border-bottom: 0px solid transparent;
    }
  }
`
const { useBreakpoint } = Grid

const items: MenuProps['items'] = [
  {
    label: 'Calculator',
    key: '/calculator',
  },
  {
    label: 'Find a Job',
    key: '/find_job',
  },
  {
    label: 'Post a Job',
    key: '/post_landing',
  },
  // {
  //   label: 'Build CV',
  //   key: '/buildcv',
  // },
]

const Header = () => {
  const screen = useBreakpoint()
  const { locationCurrent } = usePath()
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()
  return (
    <>
      <nav
        className="sticky
          top-0
          w-full
          bg-black
          z-50
          shadow-lg
          h-[80px]
        "
      >
        <Wrapper>
          <div className="flex items-center justify-between h-[80px]">
            <div onClick={() => router.push('/')}>
              <Icons.TaytureLogo
                width={screen.lg ? '' : '85'}
                height={screen.lg ? '' : '85'}
                className="cursor-pointer"
              />
            </div>
            <div className="hidden md:block">
              <StyledMenu
                mode="horizontal"
                className={`font-semibold ${regularFont.className}`}
                style={{ width: 'auto' }}
                defaultSelectedKeys={[locationCurrent]}
                selectedKeys={[locationCurrent]}
                onClick={(menuInfo) => router.push(menuInfo?.key)}
                theme="dark"
                items={items}
                
              />
            </div>
            <div className="md:flex gap-3 hidden">
              <Button
                bold
                render="dark"
                text="Login"
                onClick={() => router.push('/auth/login')}
              />
              <Button
                bold
                render="light"
                text="Sign up"
                onClick={() => router.push('/auth/register')}
              />
            </div>
            <div
              onClick={() => setOpen((prev) => !prev)}
              className="md:hidden block cursor-pointer hover:scale-[1.05] duration-300 transition-transform"
            >
              {open ? (
                <IoMdClose color="white" size={30} />
              ) : (
                <RxHamburgerMenu color="white" size={30} />
              )}
            </div>
          </div>
        </Wrapper>
      </nav>
      <DropdownMenu open={open} handleClose={() => setOpen(false)} />
    </>
  )
}

export default Header
