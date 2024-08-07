import React from 'react'
import { PiCaretDoubleRightBold, PiCaretDoubleLeftBold } from 'react-icons/pi'
import { Button, Layout } from 'antd'

import DropdownComponent from './DropdownComponent'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '@/Context/store'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getUser } from '@/lib/api/user'
import NotificationDropdown from './NotificationDropdown'


const { Header } = Layout

const DashboardHeader: React.FC<{
  collapsed: boolean
  trigger: () => void
}> = ({ collapsed, trigger }) => {
  const router = useRouter()
  const { setUI } = useGlobalContext()
  const queryClient = useQueryClient()
  const permission = queryClient.getQueryData(['permission'])
  const permissionGranted = permission !== "limited"

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (permissionGranted) {
        const req = await getUser()
        return req.data.user
      }
      return queryClient.getQueryData(['user'])
    },
  
  })

  const isSchAdmin =
    Object.keys(user).length > 1 &&
    JSON.parse(user.role).includes('school admin')
      ? true
      : false
  


  const handleClick = (link: string) => {
    if (!isSchAdmin) {
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
          {permissionGranted && <div
            className="hover:text-orange cursor-pointer text-black"
            onClick={() => handleClick('/dashboard/school/new')}
          >
            Add School
          </div>}
          {permissionGranted && <div className="ml-[24px]">
            <Link
              className="hover:text-orange text-black"
              href="/dashboard/jobs"
            >
              Find job
            </Link>
          </div>}
          {permissionGranted && <div
            className="ml-[24px] hover:text-orange text-black cursor-pointer"
            onClick={() => handleClick('/dashboard/school/post')}
          >
            Post a job
          </div>}

          {/* <div className="mx-[20px]"> */}
          {/* <Whatsapp2 /> */}
          <NotificationDropdown mobile={false} />
          {/* </div> */}
          <DropdownComponent isAdmin={isSchAdmin} />
        </div>
      </div>
    </Header>
  )
}

export default DashboardHeader
