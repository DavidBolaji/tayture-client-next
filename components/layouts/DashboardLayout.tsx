'use client'
import { Layout } from 'antd'
import React, { PropsWithChildren, useState } from 'react'
import { PiCaretDoubleRightBold, PiCaretDoubleLeftBold } from 'react-icons/pi'
import Link from 'next/link'
import DashboardMenu from '../Dashboard/DashboardMenu'
import DashboardNav from '../Dashboard/DashboardNav'
import DropdownComponent from '../Dashboard/DropdownComponent'
import { regularFont } from '@/assets/fonts/fonts'
import { useGlobalContext } from '@/Context/store'
import { useRouter } from 'next/router'
import AuthLayer from './AuthLayer'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '@/lib/api/user'
import NotificationDropdown from '../Dashboard/NotificationDropdown'

const { Header, Sider, Content } = Layout

const DashboardLayout = (props: PropsWithChildren) => {
  const [collapsed, setCollapsed] = useState(false)
  const { setUI } = useGlobalContext()
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const req = await getUser()
      return req.data.user
    },
  })

  const router = useRouter()
  const isSchAdmin = !user
    ? false
    : user.path && typeof user.path === 'string' && user.path.trim() !== ''
    ? JSON.parse(user.path.replace(/'/g, '"')).includes('school admin')
    : false

  const handleClick = (link: string) => {
    if (isSchAdmin) {
      router.push(link)
    } else {
      setUI((prev) => ({
        ...prev,
        attentionModal: {
          ...prev.attentionModal,
          visibility: true,
        },
      }))
    }
  }
  return (
    <AuthLayer>
      <Layout>
        <div className={`h-full md:block hidden ${regularFont.className}`}>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{
              backgroundColor: '#000',
              height: '100vh',
              maxHeight: '100vh',
              position: 'sticky',
              top: 0,
              zIndex: 300,
            }}
            width={248}
            className="pt-10 px-[12px]"
          >
            <DashboardMenu collapsed={collapsed} />
          </Sider>
        </div>
        <Layout
          style={{
            background: '#faf9f9',
          }}
        >
          <Header
            className="shadow-lg"
            style={{
              paddingLeft: 0,
              paddingRight: '40px',
              background: '#fff',
            }}
            id="shadow"
          >
            <div className="md:hidden block absolute w-full z-50">
              <DashboardNav />
            </div>
            <div className="md:block hidden ">
              <div className="flex h-full justify-between">
                <button
                  type="button"
                  onClick={() => setCollapsed(!collapsed)}
                  className="bg-[#333333] "
                >
                  {collapsed ? (
                    <PiCaretDoubleRightBold color="white" size={12} />
                  ) : (
                    <PiCaretDoubleLeftBold color="white" size={12} />
                  )}
                </button>
                <div
                  className={`flex ${regularFont.className} transition-color `}
                >
                  <div
                    className="hover:text-orange cursor-pointer text-black"
                    onClick={() => handleClick('/dashboard/school/new')}
                  >
                    Add School
                  </div>
                  <div className="ml-[24px]">
                    <Link
                      className="hover:text-orange text-black"
                      href="/dashboard/jobs"
                    >
                      Find a job
                    </Link>
                  </div>
                  <div
                    className="ml-[24px] hover:text-orange text-black cursor-pointer"
                    onClick={() =>
                      handleClick('/dashboard/school/new?post_job=1')
                    }
                  >
                    Post a job
                  </div>
                  <div className="mx-[20px] flex items-center">
                    <NotificationDropdown mobile={false} />
                  </div>
                  <DropdownComponent isAdmin={isSchAdmin} />
                </div>
              </div>
            </div>
          </Header>

          <Content
            style={{
              padding: '0px 12px 100px 12px',
              marginTop: 50,
              minHeight: '100vh',
              height: '100vh',
            }}
            className={`overflow-auto md:mx-[24px] md:py-[24px] px-5 py-10 no-s ${regularFont.className}`}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </AuthLayer>
  )
}

export default DashboardLayout
