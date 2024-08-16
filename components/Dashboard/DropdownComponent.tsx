'use client'
import React, { useEffect } from 'react'
import { DownOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'
import { Avatar as AntAvatar, Badge, Dropdown, Space, Tooltip } from 'antd'
import Avatar from 'react-avatar'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserSchool, getUserSchoolAdmin } from '@/lib/api/school'
import { regularFont } from '@/assets/fonts/fonts'
import { userSignout, userSignoutLimited } from '@/lib/api/user'
import { Profile, School, SchoolAdmin, User } from '@prisma/client'
import { useGlobalContext } from '@/Context/store'
import { canManageSchool } from '@/utils/helpers'

const StyledDropdown = styled(Dropdown)`
  .ant-dropdown {
    width: 390px !important;
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

const Container = styled.div<{
  width: string | number
  height: string | number
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

const StyledAvatar: React.FC<StyledAvatarProps> = ({ width, height, name }) => (
  <Container
    width={width as unknown as string}
    height={height as unknown as string}
  >
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

  const fetchSchool = async () => {
    if (permissionGranted) {
      const req = await getUserSchool()
      return req.data.school[defaultSchool]
    } else {
      const req = await getUserSchoolAdmin()
      return req.data.school[defaultSchool]
    }
  }

  const { data: school } = useQuery({
    queryKey: ['school'],
    queryFn: fetchSchool,
  })
  const { data: allSchools } = useQuery({
    queryKey: ['allSchoolz'],
    queryFn: async () => {
      if (permissionGranted) {
        const req = await getUserSchool()
        return req.data.school
      } else {
        const req = await getUserSchoolAdmin()
        return req.data.school
      }
    },
  })

  const { mutate: signout } = useMutation({
    mutationFn: permissionGranted ? userSignout : userSignoutLimited,
    mutationKey: ['signout'],
    onSuccess: () => {
      queryClient.clear()
      localStorage.clear()
      router.replace('/auth/login')
    },
  })

  const schoolItems = allSchools?.length
    ? allSchools?.map(
        (school: School & { sch_admin: SchoolAdmin[] }, idx: number) => ({
          key: `${idx}_sch`,
          label: (
            <div
              className="max-w-48"
              onClick={() => {
                setDefaultSchool(+idx)
                if (permissionGranted) {
                  window.location.assign('/dashboard')
                } else {
                  router.replace(router.asPath)
                }
              }}
            >
              <Badge size="default">
                <Space>
                  {school?.sch_logo ? (
                    <AntAvatar
                      src={school.sch_logo}
                      shape="circle"
                      size="large"
                    />
                  ) : (
                    <AntAvatar shape="circle" size="large" />
                  )}
                  <Space className={regularFont.className} direction="vertical">
                    <span className="text-[16px] max-w-4">
                      {school.sch_name}
                    </span>
                  </Space>
                </Space>
              </Badge>
            </div>
          ),
        }),
      )
    : []

  const userItems: MenuProps['items'] = [
    {
      label: (
        <Badge size="default">
          <Space>
            {profilePicture ? (
              !permissionGranted ? (
                <StyledAvatar name="Guest" />
              ) : (
                <AntAvatar src={profilePicture} shape="circle" size="large" />
              )
            ) : !permissionGranted ? (
              <StyledAvatar name="Admin" />
            ) : (
              <StyledAvatar name={auth?.fname ?? ''} />
            )}
            <span className={regularFont.className}>
              {permissionGranted ? `${auth?.fname} ${auth?.lname}` : ''}
            </span>
          </Space>
        </Badge>
      ),
      key: '0',
    },
    {
      label: <Link href="/dashboard/profile">View Profile</Link>,
      key: 'profile',
    },
    { key: 'divider', type: 'divider' },
  ]

  const allUsers = permissionGranted ? userItems : []

  const schoolList = [
    {
      label: (
        <Link href="/dashboard/school">
          <Badge size="default">
            <Space>
              {school?.sch_logo ? (
                <AntAvatar src={school?.sch_logo} shape="circle" size="large" />
              ) : (
                <AntAvatar shape="circle" size="large" />
              )}
              <div className={`max-w-48 ${regularFont.className}`}>
                <div className="text-[16px]">{school?.sch_name}</div>
              </div>
            </Space>
          </Badge>
        </Link>
      ),
      key: 'school',
      children: schoolItems,
    },
  ]

  const schoolAdminItems: MenuProps['items'] = [
    {
      label: (
        <Link
          href={`/dashboard/school/admin`}
          className={regularFont.className}
        >
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

  const allSchoolAdmin = permissionGranted ? schoolAdminItems : []

  const hasSchool = !school ? [] : [...schoolList, ...allSchoolAdmin]

  const items: MenuProps['items'] = [
    ...allUsers,
    ...hasSchool,
    {
      key: 'signout',
      label: (
        <span
          className={regularFont.className}
          onClick={() => {
            signout()
          }}
        >
          Signout
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
    <StyledDropdown
      menu={{ items }}
      trigger={['click']}
      placement="bottomRight"
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Badge size="default">
            <Space>
              {profilePicture ? (
                permissionGranted ?
                <AntAvatar src={profilePicture} shape="square" size="large" /> :
                <StyledAvatar name={'Admin'} />
              ) : permissionGranted ? (
                <StyledAvatar name={auth?.fname ?? ''} />
              ) : (
                <StyledAvatar name={'Admin'} />
              )}
              <span className="hidden md:block">
                {permissionGranted ? auth?.fname : ''}
              </span>
            </Space>
          </Badge>
          <DownOutlined />
        </Space>
      </a>
    </StyledDropdown>
  )
}

export default DropdownComponent
