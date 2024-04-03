'use client'
import React from 'react'

import { Icons, Images } from '@/assets'
import Image from 'next/image'
import { Menu } from 'antd'
import { useRouter } from 'next/navigation'
import { FcOnlineSupport } from 'react-icons/fc'
import { FiHome, FiBriefcase, FiLock } from 'react-icons/fi'
import type { MenuProps } from 'antd'
import usePath from '@/hooks/usePath'
import styled from '@emotion/styled'
import { regularFont } from '@/assets/fonts/fonts'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '@/lib/api/user'

const MenuStyled = styled(Menu)`
  && {
    background-color: black;
    .ant-menu-title-content {
      color: #e5e7eb;
      font-size: 14px;
      font-family: var(${regularFont.variable}) !important;
    }
    .ant-menu-item-icon {
      color: #e5e7eb;
    }
    .ant-menu-item.ant-menu-item-selected {
      background-color: #ff7517;
    }
    .ant-menu-item.ant-menu-item-selected > * {
      color: black;
    }
    .ant-menu-item.ant-menu-item-selected > .ant-menu-item-icon {
      color: black;
    }
    .ant-menu-item.ant-menu-item-active {
      background-color: #ff7517 !important;
    }
    .ant-menu-item.ant-menu-item-active > * {
      color: #000 !important;
    }
    > * {
      margin-bottom: 24px;
    }
  }
`

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('Home', '/dashboard', <FiHome />),
  getItem('Jobs', '/dashboard/jobs', <FiBriefcase />),
  getItem('My School', '/dashboard/school', <FiHome />),
  getItem('Admin', '/dashboard/admin', <FiLock />),
]

const DashboardMenu: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const { locationCurrent } = usePath()
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const req = await getUser()
      return req.data.user
    },
  })

  const isAdmin = !user ? false : user.role === 'ADMIN' ? true : false

  const router = useRouter()
  return (
    <>
      <div className={`pl-3 mb-8 -mt-5 -translate-x-1 flex flex-col`}>
        {!collapsed && <Icons.TaytureLogo width="90" />}
        {collapsed && (
          <Image
            src={Images.Logo}
            className="md:w-16 h-16 s mb-5"
            alt="Tayture"
          />
        )}
      </div>

      <MenuStyled
        className={'font-br'}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[locationCurrent]}
        selectedKeys={[locationCurrent]}
        onClick={(menuInfo) => router.push(menuInfo?.key)}
        items={items.filter((item) => {
          if (item!.key === '/dashboard/admin') {
            return isAdmin
          }
          return true
        })}
      />
    <a href={'https://wa.me/+2347067799302'} target='_blank'>
      {!collapsed && (
        
        <div className="absolute bottom-0  px-5 -translate-x-2 cursor-pointer">
          <Image src={Images.Support} alt="support" />
        </div>
        
      )}
      {collapsed && (
        <div className="absolute bottom-5 px-5 -translate-x-2 cursor-pointer">
          <FcOnlineSupport size={30} />
        </div>
      )}
      </a>
    </>
  )
}

export default DashboardMenu
