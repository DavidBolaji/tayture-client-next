import React from 'react'
import { ConfigProvider, Grid, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { FaRegBookmark } from 'react-icons/fa'
import styled from '@emotion/styled'
import { regularFont } from '@/assets/fonts/fonts'

const StyledTab = styled(Tabs)`
  && {
    .ant-tabs-nav::before {
      border-bottom: 0px !important;
    }
    .ant-tabs-tab-btn {
      font-size: 16px;
    }
    .ant-tabs-tab-btn:hover {
      color: #ff7517;
    }
    .ant-tabs-tab.ant-tabs-tab-active > * {
      color: #ff7517;
    }
    .ant-tabs-tab.ant-tabs-tab-active > .primary {
      color: #ff7517 !important;
    }
    /* .ant-tabs-tab-active {
      border-bottom: 2px solid #ff7517 !important;
      z-index: 1000;
    } */
    .ant-tabs-nav-list {
      border-bottom: 0px #ff7517;
    }
  }
`

const { useBreakpoint } = Grid

export function BookmarkIcon() {
  return (
    <div className="h-6 w-6 flex items-center justify-center rounded-full bg-slate-300">
      <FaRegBookmark size={12} />
    </div>
  )
}

const DashBoardTab: React.FC = () => {
  const screen = useBreakpoint()
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Most Recent',
      children: <h1>4</h1>,
    },
    {
      key: '2',
      label: 'Best Matches',
      children: <h2>2</h2>,
    },
    {
      key: '3',
      label: 'Saved jobs',
      children: <h1>3</h1>,
    },
  ]

  const onChange = (_title: string) => {
    console.log(_title)
  }
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#050505',
        },
      }}
    >
      <StyledTab
        className={`${regularFont.className}`}
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </ConfigProvider>
  )
}

export default DashBoardTab
