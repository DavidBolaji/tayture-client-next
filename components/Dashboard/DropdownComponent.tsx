'use client'

import React, { useEffect, useMemo, useState } from 'react'
import {
  DownOutlined,
  LoginOutlined,
  SearchOutlined
} from '@ant-design/icons'
import {
  Drawer,
  Input,
  Badge,
  Dropdown,
  Space,
  Avatar as AntAvatar,
  Empty,
  Modal
} from 'antd'
import Avatar from 'react-avatar'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserSchool, getUserSchoolAdmin } from '@/lib/api/school'
import { regularFont } from '@/assets/fonts/fonts'
import { userSignout, userSignoutLimited } from '@/lib/api/user'
import { Profile, School, User } from '@prisma/client'
import { useGlobalContext } from '@/Context/store'
import { canManageSchool } from '@/utils/helpers'
import { Axios } from '@/request/request'

const url = process.env.NEXT_PUBLIC_ENV === "prod" ? "https://jelo.live" : "http://localhost:3000"

const StyledDropdown = styled(Dropdown)`
  .ant-dropdown-menu {
    width: 340px !important;
    border-radius: 12px;
  }

  .anticon.anticon-down > svg {
    color: #575757;
    transform: translateY(2px);
    transition: 0.3s ease-in color;
    &:hover {
      color: #ff7517;
    }
  }
`

const Container = styled.div<{ width?: string | number; height?: string | number }>`
  width: ${(props) => props.width || 40}px;
  height: ${(props) => props.height || 40}px;
  border-radius: 10px;
`

const StyledAvatar: React.FC<{ width?: string | number; height?: string | number; name: string }> = ({
  width,
  height,
  name,
}) => (
  <Container width={width} height={height}>
    <Avatar name={name} size="100%" round="10px" />
  </Container>
)

const DropdownComponent: React.FC<{ isAdmin?: boolean }> = ({ isAdmin }) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { defaultSchool, setDefaultSchool, setSchAccess } = useGlobalContext()
  const permission = queryClient.getQueryData(['permission'])
  const permissionGranted = permission !== 'limited'

  const user = queryClient.getQueryData<User & { profile: Profile }>(['user'])
  const auth = user ?? null
  const profilePicture = user?.profile?.picture ?? ''

  // ✅ Missing useStates
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  // ✅ Fetch schools
  const fetchSchool = async () => {
    const req = permissionGranted ? await getUserSchool() : await getUserSchoolAdmin()
    return req.data.school[defaultSchool]
  }

  const { data: school } = useQuery({ queryKey: ['school'], queryFn: fetchSchool })

  const { data: allSchools } = useQuery({
    queryKey: ['allSchoolz'],
    queryFn: async () => {
      const req = permissionGranted ? await getUserSchool() : await getUserSchoolAdmin()
      return req.data.school
    },
  })

  const currentSchool = allSchools?.[defaultSchool] ?? null

  // ✅ Signout logic
  const { mutate: signout } = useMutation({
    mutationFn: permissionGranted ? userSignout : userSignoutLimited,
    onSuccess: () => {
      queryClient.clear()
      localStorage.clear()
      router.replace('/auth/login')
    },
  })

  // ✅ Filtered schools
  const filteredSchools = useMemo(() => {
    if (!allSchools?.length) return []
    return allSchools.filter((s: School) =>
      s.sch_name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
    )
  }, [allSchools, searchTerm])

  const handleSchoolClick = (name: string) => {
    const ind = allSchools.findIndex((s: any) => s.sch_name === name)
    setDefaultSchool(ind)
    if (permissionGranted) {
      window.location.assign('/dashboard')
    } else {
      window.location.assign(router.asPath)
    }
  }

  // ✅ Login to J.com handler
  const handleJLogin = async () => {
    setLoading(true)
    try {
      await Axios.post(
        '/assesement/jelo/auth',
        { schoolId: currentSchool?.sch_id },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      )

      Modal.success({
        title: 'Login successful!',
        content: 'Redirecting you to J Dashboard...',
      })

      setTimeout(() => {
       window.open(`${url}/dashboard`, '_blank')
      //  window.location.replace(`${url}/dashboard`)
      }, 1500)
    } catch (err: any) {
      if (err.response) {
        Modal.error({
          title: 'Login failed',
          content: err.response.data?.error || 'Invalid credentials',
        })
      } else {
        Modal.error({
          title: 'Network error',
          content: err.message || 'Something went wrong',
        })
      }
    } finally {
      setLoading(false)
    }
  }

  // ✅ Dropdown items
  const userItems = [
    {
      label: (
        <Badge size="default">
          <Space>
            {profilePicture ? (
              <AntAvatar src={profilePicture} shape="circle" size="large" />
            ) : (
              <StyledAvatar name={auth?.fname ?? 'Admin'} />
            )}
            <span className={`${regularFont.className} font-medium`}>
              {permissionGranted ? `${auth?.fname} ${auth?.lname}` : ''}
            </span>
          </Space>
        </Badge>
      ),
      key: 'userInfo',
    },
    { key: 'divider1', type: 'divider' },
    {
      label: (
        <Badge>
          <div className='text-xs font-bold mb-3'>Active School</div>
          <Space>
            {currentSchool ? (
              <AntAvatar src={currentSchool?.sch_logo} shape="square" size="large" />
            ) : profilePicture ? (
              <AntAvatar src={profilePicture} shape="square" size="large" />
            ) : (
              <StyledAvatar name={auth?.fname ?? 'Admin'} />
            )}
            <div>
              <div className="hidden md:block">
                {currentSchool ? currentSchool?.sch_name : auth?.fname ?? 'User'}
              </div>
              <div className="text-xs text-gray-500">
                {currentSchool?.landmark ?? 'No location'}
              </div>
            </div>
          </Space>
        </Badge>
      ),
      key: 'defaultschInfo',
    },
    { key: 'divider2', type: 'divider' },
    {
      label: <Link href="/dashboard/profile">View Profile</Link>,
      key: 'profile',
    },
    { key: 'divider', type: 'divider' },
  ]

  const schoolAdminItems = [
    {
      label: (
        <Link href={`/dashboard/school/admin`} className={regularFont.className}>
          School Admin
        </Link>
      ),
      key: 'admin',
    },
    {
      label: (
        <div className={`${regularFont.className}`} onClick={() => setDrawerOpen(true)}>
          View School
        </div>
      ),
      key: 'view_school',
    },
    user?.role === 'SUPER_ADMIN' && {
      label: (
        <div
          className={regularFont.className}
          onClick={() => router.push('/dashboard/school/manage/all')}
        >
          Manage Jobs
        </div>
      ),
      key: 'manage_jobs',
    },
  ].filter(Boolean)

  const allItems = [
    ...userItems,
    ...schoolAdminItems,
    {
      key: 'login_j',
      label: (
        <div onClick={handleJLogin} className="text-blue-500 flex items-center gap-2">
          <LoginOutlined /> Login to Jelo
        </div>
      ),
    },
    {
      key: 'signout',
      label: (
        <span
          className={`${regularFont.className} inline-block w-full text-red-500`}
          onClick={() => signout()}
        >
          Sign out
        </span>
      ),
    },
  ]

  useEffect(() => {
    const hasAccess = canManageSchool(
      school?.sch_admin,
      user?.email as string,
      user?.id === school?.schUserId,
    )
    setSchAccess(hasAccess)
  }, [user, school, setSchAccess])

  return (
    <>
      <StyledDropdown
        //@ts-ignore
        menu={{ items: allItems }}
        trigger={['click']}
        placement="bottomRight"
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Badge>
              <Space>
                {profilePicture ? (
                  <AntAvatar src={profilePicture} shape="square" size="large" />
                ) : (
                  <StyledAvatar name={auth?.fname ?? 'Admin'} />
                )}
                <span className="hidden md:block">{permissionGranted ? auth?.fname : ''}</span>
              </Space>
            </Badge>

            <DownOutlined />
          </Space>
        </a>
      </StyledDropdown>

      {/* SIDE DRAWER FOR SCHOOL LIST */}
      <Drawer
        title={
          <div className="flex flex-col gap-2">
            <span className={`${regularFont.className} text-lg font-semibold`}>My Schools</span>
            <Input
              placeholder="Search schools..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </div>
        }
        closeIcon={null}
        placement="right"
        width={380}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        bodyStyle={{ padding: '12px 16px' }}
      >
        {filteredSchools.length ? (
          <div className="flex flex-col gap-3">
            {filteredSchools.map((s: School, idx: number) => {
              const isSelected = idx === defaultSchool
              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${isSelected ? 'bg-orange-50 border border-orange-400' : 'hover:bg-gray-100'
                    }`}
                  onClick={() => handleSchoolClick(s.sch_name)}
                >
                  <Space>
                    {s.sch_logo ? (
                      <AntAvatar src={s.sch_logo} shape="circle" size="large" />
                    ) : (
                      <AntAvatar shape="circle" size="large" />
                    )}
                    <div className={`${regularFont.className}`}>
                      <div className="font-medium flex items-center gap-2">
                        {s.sch_name}
                        {isSelected && (
                          <Badge
                            color="orange"
                            text={<span className="text-xs text-orange-500">Default</span>}
                          />
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        {s.landmark ?? 'No location'}
                      </div>
                    </div>
                  </Space>
                </div>
              )
            })}
          </div>
        ) : (
          <Empty description="No schools found" />
        )}
      </Drawer>
    </>
  )
}

export default DropdownComponent
