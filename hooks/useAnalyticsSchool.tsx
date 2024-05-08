'use client'
import { ColumnsType } from 'antd/es/table'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { Applied, Hired, Job, Schedule, School, User } from '@prisma/client'

import { useEffect, useRef, useState } from 'react'
import debounce from 'lodash/debounce'


type DataType = User & {
  applied: Applied[]
  schedule: Schedule[]
  hired: Hired[]
  school:{
    school: School[],
    job: Job[]
   }
}

const useAnalyticsSchool = () => {
  const [drawer, setDrawer] = useState(false)
  const [title, setTitle] = useState('')
  const [allSchools, setAllSchools] = useState<DataType[] | []>([])
  const [drawerContent, setDrawerContent] = useState<
    null | Applied[] | Hired[] | Schedule[]
  >(null)
  const queryClient = useQueryClient()
  const [val, setVal] = useState('')

  const { data: analytics_schools, isPending: analytics_pending, refetch } = useQuery({
    queryKey: ['allAnalyticsSchool'],
    queryFn: async () => {
      const res = await Axios.get(`/users?path=${'school admin'}`)
      return res.data.user
    },
  })

  const { mutate, isPending: isSchoolPending } = useMutation({
    mutationFn: async (title: string) => {
      const req = await Axios.get(`/users?filter=${title}&path=${'school admin'}`)
      return req.data.user
    },
    onSuccess: (res:DataType[]) => {
      queryClient.setQueryData(['allAnalyticsSchool'], () => res)
      setAllSchools(res)
    },
  })

  useEffect(() => {
    setAllSchools(analytics_schools)
  }, [analytics_schools])
  
  const showDrawer = (data: any, page: string) => {
    // setDrawer(true)
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

  const analytics_columns: ColumnsType<DataType> = [
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
    // {
    //   title: 'My School',
    //   dataIndex: 'school',
    //   key: 'school',
    //   render: (_, record) => (
    //     <span
    //       className="text-xs cursor-pointer transition-colors duration-300 hover:underline hover:text-orange"
    //       onClick={() => showDrawer(record.school, 'Schools')}
    //     >
    //       View
    //     </span>
    //   ),
    // },
    // {
    //   title: 'My Jobs',
    //   dataIndex: 'job',
    //   key: 'job',
    //   render: (_, record) => (
    //     <span
    //       className="text-xs cursor-pointer transition-colors duration-300 hover:underline hover:text-orange"
    //       onClick={() => showDrawer(record.school.job, 'Jobs')}
    //     >
    //       View
    //     </span>
    //   ),
    // },
    // {
    //   title: 'Date Registered',
    //   dataIndex: 'createdAt',
    //   key: 'createdAt',
    //   render: (_, record) => (
    //     <span className="text-xs">
    //       {moment(record.createdAt).format('Do MMM, YYYY | hh:mm a')}
    //     </span>
    //   ),
    // },
  ]

  return {
    allSchools,
    analytics_columns,
    analytics_pending,
    isSchoolPending,
    drawer,
    title,
    drawerContent,
    setDrawer,
    handleSearch,
    val,
    refetch
  }
}

export default useAnalyticsSchool
