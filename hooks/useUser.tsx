'use client'
import { ColumnsType } from 'antd/es/table'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { Applied, Hired, Schedule, User } from '@prisma/client'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import debounce from 'lodash/debounce'
import { AxiosResponse } from 'axios'

type DataType = User & {
  applied: Applied[]
  schedule: Schedule[]
  hired: Hired[]
}

const useUser = () => {
  const [drawer, setDrawer] = useState(false)
  const [title, setTitle] = useState('')
  const [allUsers, setAllUsers] = useState<DataType[] | []>([])
  const [drawerContent, setDrawerContent] = useState<
    null | Applied[] | Hired[] | Schedule[]
  >(null)
  const queryClient = useQueryClient()
  const [val, setVal] = useState('')
  const { data: users, isPending, refetch } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await Axios.get('/users')
      return res.data.user
    },
  })

  const { mutate, isPending: isUserPending } = useMutation({
    mutationFn: async (title: string) => {
      const req = await Axios.get(`/users?filter=${title}`)
      return req.data.user
    },
    onSuccess: (res:DataType[]) => {
      queryClient.setQueryData(['allUsers'], () => res)
      setAllUsers(res)
    },
  })

  useEffect(() => {
    setAllUsers(users)
  }, [users])
  const showDrawer = (data: Applied[] | Schedule[] | Hired[], page: string) => {
    setDrawer(true)
    setTitle(page)
    setDrawerContent(data)
  }

  const debouncedSearch = useRef(
    debounce((value: string) => mutate(value), 500),
  ).current

  const handleSearch = (value: string) => {
    setVal(value)
    debouncedSearch(value)
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'First name',
      dataIndex: 'fname',
      key: 'fname',
    },
    {
      title: 'Last Name',
      dataIndex: 'lname',
      key: 'lname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Date Registered',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, record) => (
        <span className="text-xs">
          {moment(record.createdAt).format('Do MMM, YYYY | hh:mm a')}
        </span>
      ),
    },
    {
      title: 'Applied',
      dataIndex: 'applied',
      key: 'applied',
      render: (_, record) => (
        <span
          className="text-xs cursor-pointer transition-colors duration-300 hover:underline hover:text-orange"
          onClick={() => showDrawer(record.applied, 'Applied')}
        >
          View
        </span>
      ),
    },
    {
      title: 'Invited',
      dataIndex: 'schedule',
      key: 'schedule',
      render: (_, record) => (
        <span
          className="text-xs cursor-pointer transition-colors duration-300 hover:underline hover:text-orange"
          onClick={() => showDrawer(record.schedule, 'Invited')}
        >
          View
        </span>
      ),
    },
    {
      title: 'Hired',
      dataIndex: 'hired',
      key: 'hired',
      render: (_, record) => (
        <span
          className="text-xs cursor-pointer transition-colors duration-300 hover:underline hover:text-orange"
          onClick={() => showDrawer(record.hired, 'Hired')}
        >
          View
        </span>
      ),
    },
  ]

  return {
    columns,
    allUsers,
    isPending,
    isUserPending,
    drawer,
    title,
    drawerContent,
    setDrawer,
    handleSearch,
    val,
    refetch
  }
}

export default useUser
