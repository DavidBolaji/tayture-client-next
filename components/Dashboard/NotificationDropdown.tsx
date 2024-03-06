'use client'
import React, { useEffect, useState } from 'react'
import type { MenuProps } from 'antd'
import { Avatar, Card, Dropdown, Empty, Space, Tooltip } from 'antd'
import styled from '@emotion/styled'
import Meta from 'antd/lib/card/Meta'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { HiOutlineBell } from 'react-icons/hi'
import { FiCheck } from 'react-icons/fi'
import NotificationCom from './Notification'
import Spinner from '../../components/Spinner/Spinner'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { Notifcation } from '@prisma/client'

dayjs.extend(relativeTime)
interface StyledCardProps {
  mobile?: boolean
}
const StyledCard = styled(Card)<StyledCardProps>`
  transform: ${(props) => (props.mobile ? 'translateX(10px)' : '')};
  margin-top: ${(props) => (props.mobile ? '24px' : '')};
  & > .ant-card-body {
    padding: 0px;
    min-width: ${(props) => (props.mobile ? '290px' : '400px')};
    height: 300px;
    border-top: 1px solid #ededed;
  }
  & > .ant-card-head {
  }
`

const StyledDropdown = styled(Dropdown)`
  & > .ant-dropdown {
    /* margin-top: 1000px !important; */
    width: 100px !important;
  }
`
const StyledMeta = styled(Meta)`
  && {
    .ant-card-meta-title {
      font-size: 14px;
      font-weight: bolder;
    }
  }
`

const NotificationItem: React.FC<any> = ({
  caption,
  fullMessage,
  date,
  read,
  id,
}) => {
  const period = dayjs().to(dayjs(date))
  const queryClient = useQueryClient()
  const { mutate: notificationUpdate } = useMutation({
    mutationFn: async (data: { id: string; status: boolean }) => {
      return await Axios.put('/notification', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
      })
    },
  })

  const handleNotificationUpdate = (key: string) => {
    notificationUpdate({
      id: key,
      status: true,
    })
  }

  return (
    <Card
      className={`mb-0 max-w-[460px] overflow-clip no-s rounded-none w-full ${
        !read ? 'bg-[#faeee7] ' : ''
      }`}
    >
      <div className="w-full flex items-center">
        <div className="flex-[0.8]">
          <StyledMeta
            avatar={
              <div className="h-full w-full flex items-center justify-center">
                <Avatar
                  shape="circle"
                  className="bg-gray_600 flex items-center justify-center"
                  icon={<HiOutlineBell />}
                />
              </div>
            }
            title={caption}
            description={
              <div>
                <p className="-mt-2 overflow-hidden text-[12px]">
                  {fullMessage}
                </p>
                <small>
                  Period:
                  {period}
                </small>
              </div>
            }
          />
        </div>
        <div className="flex-[0.2] justify-center flex">
          {!read ? (
            <Tooltip title="Mark as read" trigger="hover" placement="bottom">
              <div
                onClick={() => handleNotificationUpdate(id)}
                className="rounded-full w-8 h-8 border flex items-center justify-center cursor-pointer"
              >
                <FiCheck />
              </div>
            </Tooltip>
          ) : (
            ''
          )}
        </div>
      </div>
    </Card>
  )
}

const MenuContent: React.FC<{
  data?: any
  loading?: boolean
  mobile?: boolean
}> = ({ data, loading, mobile }) => (
  <StyledCard
    mobile={mobile}
    title={
      <Space>
        <HiOutlineBell
          // color={color ? 'white' : 'black'}
          className="text-3xl cursor-pointer"
        />
        <span>Notifications</span>
      </Space>
    }
    className="p-0"
  >
    <div className="overflow-y-scroll h-full no-s">
      {data?.length && !loading
        ? data?.map((ntf: any) => <NotificationItem key={ntf?.id} {...ntf} />)
        : null}
      {!data?.length && !loading ? (
        <div>
          <Empty className="scale-75" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      ) : null}
      {loading ? (
        <div className="flex items-center justify-center h-full w-full">
          <Spinner color="#FF7517" />
        </div>
      ) : null}
    </div>
  </StyledCard>
)

const NotificationDropdown: React.FC<{
  mobile?: boolean
}> = ({ mobile }) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
  }, [])

  const { data: notification, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const req = await Axios.get('/notification/me')
      return req.data.notification
    },
  })
  console.log(isLoading)
  console.log(notification)

  const msg = notification
    ?.map((n: Notifcation) => ({
      label: n?.msg,
      key: n?.id,
      id: n?.id,
      caption: n?.caption,
      fullMessage: n.msg,
      date: n.createdAt,
      read: n.status,
    }))
    .sort((a: any, b: any) => b.key! - a.key!) as unknown as MenuProps['items']

  const items: MenuProps['items'] = msg!
  const show = notification
    ? notification.some((n: any) => !n.notification_status)
    : false

  return (
    <StyledDropdown
      trigger={['click']}
      placement="bottomRight"
      arrow={!mobile}
      dropdownRender={() => (
        <MenuContent mobile={mobile} data={items} loading={isLoading} />
      )}
      autoAdjustOverflow
      menu={{ items }}
    >
      <button className="relative flex items-center">
        <NotificationCom show={show} color={mobile || false} />
      </button>
    </StyledDropdown>
  )
}

export default NotificationDropdown
