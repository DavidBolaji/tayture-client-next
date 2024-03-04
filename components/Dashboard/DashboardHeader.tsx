// import '../index.css'
import React from 'react'
import { PiCaretDoubleRightBold, PiCaretDoubleLeftBold } from 'react-icons/pi'
import { Button, Layout } from 'antd'

import DropdownComponent from './DropdownComponent'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/Context/store'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '@/lib/api/user'
import NotificationDropdown from './NotificationDropdown'

const { Header } = Layout

const DashboardHeader: React.FC<{
  collapsed: boolean
  trigger: () => void
}> = ({ collapsed, trigger }) => {
  const router = useRouter()
  const { setUI } = useGlobalContext()
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const req = await getUser()
      return req.data.user
    },
  })

  const isSchAdmin =
    Object.keys(user).length > 1 &&
    JSON.parse(user.role).includes('school admin')
      ? true
      : false
  console.log(isSchAdmin)

  const handleClick = (link: string) => {
    if (!isSchAdmin) {
      console.log(isSchAdmin)
      router.push(link)
    } else {
      console.log('here')
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
    <Header
      className="shadow-md z-50"
      style={{
        padding: 0,
        background: '#fff',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 500,
      }}
    >
      <div className="flex">
        <Button
          type="text"
          icon={
            collapsed ? (
              <div className="bg-[#333333] w-5 h-5 flex items-center justify-center">
                <PiCaretDoubleRightBold color="white" size={12} />
              </div>
            ) : (
              <div className="bg-[#333333] w-5 h-5 flex items-center justify-center">
                <PiCaretDoubleLeftBold color="white" size={12} />{' '}
              </div>
            )
          }
          onClick={trigger}
          className="-translate-x-3"
          style={{
            fontSize: '16px',
            height: 64,
          }}
        />
        <div className={`flex justify-end items-center w-full `}>
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
              Find job
            </Link>
          </div>
          <div
            className="ml-[24px] hover:text-orange text-black cursor-pointer"
            onClick={() => handleClick('/dashboard/school/post')}
          >
            Post a job
          </div>
          helo
          {/* <div className="mx-[20px]"> */}
            <NotificationDropdown mobile={false} />
          {/* </div> */}
          <DropdownComponent isAdmin={isSchAdmin} />
        </div>
      </div>
    </Header>
  )
}

export default DashboardHeader
