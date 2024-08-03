'use client'
import React, { useEffect } from 'react'
import { DownOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar as AntAvatar, Badge, Dropdown, Select, Space, Tooltip } from 'antd'
import Avatar from 'react-avatar'

import styled from '@emotion/styled'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserSchool } from '@/lib/api/school'
import { regularFont } from '@/assets/fonts/fonts'
import { userSignout } from '@/lib/api/user'
import { Profile, School, SchoolAdmin, User } from '@prisma/client'
import { useGlobalContext } from '@/Context/store'
import { canManageSchool } from '@/utils/helpers'

export const StyledDropdown = styled(Dropdown)`
  .ant-dropdown {
    width: 390px !important;
  }
  .anticon.anticon-down > svg {
    color: #575757;
    transform: translateY(2px);
    transition: 0.3 ease-in color;
    &:hover {
      color: #ff7517;
    }
  }
`

const Container = styled.div<{
  width: string | number | undefined
  height: string | number | undefined
}>`
  width: ${(props) => (props.width ? `${props.width}px` : '40px')};
  height: ${(props) => (props.height ? `${props.height}px` : '40px')};
  border-radius: 10px;
`

interface StyledAvatarProps {
  width?: string | number
  height?: string | number
  name: string
}

export const StyledAvatar: React.FC<StyledAvatarProps> = ({
  width,
  height,
  name,
}) => (
  <Container width={width} height={height}>
    <Avatar name={name} size="100%" round="10px" />
  </Container>
)

const DropdownComponent: React.FC<{
  isAdmin?: boolean
}> = ({ isAdmin }) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { defaultSchool, setDefaultSchool, setSchAccess } = useGlobalContext();

  const user = queryClient.getQueryData(['user']) as User & { profile: Profile }

  const auth = user ? user : null
  const profile = { picture: user?.profile?.picture ?? '' }

  
  const { data: school } = useQuery({
    queryKey: ['school'],
    queryFn: async () => {
      const req = await getUserSchool()
      return req.data.school[defaultSchool]
    },
  })

  const { data: allSchool } = useQuery({
    queryKey: ['allSchoolz'],
    queryFn: async () => {
      const req = await getUserSchool()
      return req.data.school
    },
  })

  const { mutate } = useMutation({
    mutationFn: async () => {
      return await userSignout()
    },

    onSuccess: () => {
      queryClient.clear()
      localStorage.clear()
      window.location.replace('/auth/login'); 
    },
  })

  let holder: MenuProps['items'] = []

  const schAll = allSchool?.map((school: School & {sch_admin: SchoolAdmin[]}, idx: number) => {
    return {
      key: `${idx}_sch`,
      label:  (
         <div className='max-w-48' 
         onClick={() => {
          setDefaultSchool(+idx)
          window.location.assign('/dashboard')
        }
        }
         >
           <Badge size="default">
            <Space>
              {school?.sch_logo ? (
                <AntAvatar
                  src={school?.sch_logo}
                  shape="circle"
                  size="large"
                />
              ) : (
                <AntAvatar shape="circle" size="large" />
              )}
              <Space className={regularFont.className} direction="vertical">
                <span className="text-[16px] max-w-4">{school?.sch_name}</span>
               
              </Space>
            </Space>
          </Badge>
         </div>
      ),
    }
  })

  if (school?.sch_name) {
    holder = [
      {
        label:  (
          <Link href="/dashboard/school">
            <Badge size="default">
              <Space>
                {school?.sch_logo ? (
                  <AntAvatar
                    src={school?.sch_logo}
                    shape="circle"
                    size="large"
                  />
                ) : (
                  <AntAvatar shape="circle" size="large" />
                )}
                <div className={`max-w-48 ${regularFont.className}`} >
                  <div className="text-[16px]">{school?.sch_name}</div>
                  <div className="text-[12px] mt-1 flex h-4 space-x-1 overflow-x-hidden text-ellipsis">
                    <div>Admin:</div>
                    <div className='text-ellipsis overflow-hidden'>
                      <Tooltip title={school.sch_admin && school?.sch_admin.length > 0
                      ? school?.sch_admin[0].sch_admin_email
                      : ''}>
                      {school.sch_admin && school?.sch_admin.length > 0
                      ? school?.sch_admin[0].sch_admin_email
                      : ''}
                      </Tooltip>
                      </div>
                  </div>
                </div>
              </Space>
            </Badge>
          </Link>
        ),
        key: 'school',
        children: schAll,
        style: { display: school ? 'block' : 'none' },
      },
      {
        label: (
          <Link className={regularFont.className} href={`/dashboard/school/admin`}>
            School Admin
          </Link>
        ),
        key: 'createSchool',
      },
      {
        label: (
          <div
            className={regularFont.className}
            onClick={
              isAdmin
                ? () => router.push('/dashboard/school/new')
                : () => router.push('/dashboard/school/new')
            }
          >
            View School
          </div>
        ),
        key: 'view_school',
        style: { display: school ? 'block' : 'none' },
      },
      {
        label: (
          <div
            className={regularFont.className}
            onClick={
              isAdmin
                ? () => router.push('/dashboard/school/manage/all')
                : () => router.push('/dashboard/school/manage/all')
            }
          >
            Manage jobs
          </div>
        ),
        key: 'manage_jobs',
      },
    ]
  }
  const hadleClick = async () => {
    mutate()
  }

  const items: MenuProps['items'] = [
    {
      label: (
        <Badge size="default">
          <Space>
            {profile?.picture ? (
              <AntAvatar src={profile?.picture} shape="circle" size="large" />
            ) : (
              <StyledAvatar name={`${auth?.fname}`} />
            )}
            <span className={regularFont.className}>
              {auth?.fname} {auth?.lname}
            </span>
          </Space>
        </Badge>
      ),
      key: '0',
    },
    {
      label: (
        <Link className={regularFont.className} href={`/dashboard/profile`}>
          View Profile
        </Link>
      ),
      key: 'profile',
    },

    {
      key: 'divider',
      type: 'divider',
    },
    ...holder,
    {
      key: 'signout',
      label: (
        <span className={regularFont.className} onClick={() => hadleClick()}>
          Signout
        </span>
      ),
    },
  ]

  useEffect(() => {
    const hasAccess = canManageSchool(school?.sch_admin, user?.email, user?.id === school?.schUserId)
    setSchAccess(hasAccess)
  }, [user, school, setSchAccess])

  return (
    <StyledDropdown
      menu={{ items }}
      trigger={['click']}
      placement="bottomRight"
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Badge size="default">
            <Space>
              {profile?.picture ? (
                <AntAvatar src={profile?.picture} shape="square" size="large" />
              ) : (
                <StyledAvatar name={`${auth?.fname}`} />
              )}
              <span className="hidden md:block">{auth?.fname}</span>
            </Space>
          </Badge>
          <DownOutlined />
        </Space>
      </a>
    </StyledDropdown>
  )
}

export default DropdownComponent
