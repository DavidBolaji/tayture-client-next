'use client'
import React from 'react'
import { DownOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar as AntAvatar, Badge, Dropdown, Space } from 'antd'
import Avatar from 'react-avatar'

import styled from '@emotion/styled'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserSchool } from '@/lib/api/school'
import { regularFont } from '@/assets/fonts/fonts'
import { userSignout } from '@/lib/api/user'
import { IUser } from '@/pages/api/users/types'

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

  const user = queryClient.getQueryData(['user']) as IUser

  const auth = user ? user : null
  const profile = { picture: '' }

  const { data: school } = useQuery({
    queryKey: ['school'],
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
      window.location.assign('/auth/login')
      localStorage.clear()
      queryClient.clear()
    },
  })

  let holder: MenuProps['items'] = []
  if (school?.sch_name) {
    holder = [
      {
        label: (
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
                <Space className={regularFont.className} direction="vertical">
                  <span className="text-[16px]">{school?.sch_name}</span>
                  <span className="text-[12px]">
                    Admin:&nbsp;
                    {school.sch_admin && school?.sch_admin.length > 0
                      ? school?.sch_admin[0].sch_admin_email
                      : ''}
                  </span>
                </Space>
              </Space>
            </Badge>
          </Link>
        ),
        key: 'school',
        style: { display: school ? 'block' : 'none' },
      },
      {
        label: (
          <div
            className={regularFont.className}
            onClick={
              isAdmin
                ? () => router.push('/dashboard/school/new')
                : () => console.log('object')
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
                : () => console.log('object')
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
        <Link
          className={regularFont.className}
          href={`/dashboard/profile/${auth?.id}`}
        >
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
              <span className='hidden md:block'>{auth?.fname}</span>
            </Space>
          </Badge>
          <DownOutlined />
        </Space>
      </a>
    </StyledDropdown>
  )
}

export default DropdownComponent
// export function getServerSideProps() {

// }
