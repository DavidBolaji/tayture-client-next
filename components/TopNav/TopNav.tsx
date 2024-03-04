'use client'
import { regularFont } from '@/assets/fonts/fonts'
import { Menu, MenuProps } from 'antd'
import React, { useState } from 'react'

import styled from '@emotion/styled'

const MenuStyled = styled(Menu)`
  background-color: #fafafa !important;
  margin-bottom: 20px;

  .ant-menu-item:hover::after {
    border-bottom-color: #050505 !important;
  }

  .ant-menu-item.ant-menu-item-selected {
    color: #050505 !important;
    width: 175px !important;
  }

  & > li {
    display: inline-block !important;
    margin-right: 85px !important;
    font-size: 18px;
    /* font-family: var(${regularFont.variable}) !important; */
    font-weight: 600;
    color: #70645c;

    &.ant-menu-item-selected::after {
      border-bottom-color: #050505 !important;
    }
  }

  @media (max-width: 976px) {
    & > li {
      margin-right: 65px !important;
      font-size: 14px;
    }
  }

  @media (max-width: 476px) {
    & > li {
      margin-right: 10px !important;
      font-size: 14px;
    }
  }
`

const items: MenuProps['items'] = [
  {
    label: 'MOST RECENT',
    key: 'recent',
  },
  {
    label: 'SAVED JOBS',
    key: 'saved',
  },
]

const TopNav = () => {
  const [current, setCurrent] = useState('best')

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }
  return (
    <MenuStyled
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      className={`${regularFont.className}`}
    />
  )
}

export default TopNav
