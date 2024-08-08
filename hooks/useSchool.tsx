import { Image, message, Space, Switch } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Axios, url } from '@/request/request'
import { FaCopy, FaEdit } from 'react-icons/fa'
import { School } from '@prisma/client'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { AxiosResponse } from 'axios'

interface DataType {
  sch_id?: string
  sch_logo: string
  sch_name: string
  sch_address: string
  sch_url?: string
  sch_phone: string
  sch_verified?: number
  sch_admin?: any[]
}

const useSchool = () => {
  const queryClient = useQueryClient()
  const [count, setCount] = useState(-1)
  const router = useRouter()
  const { data: admin_schools } = useQuery({
    queryKey: ['allSchools'],
    queryFn: async () => {
      const sch = await Axios.get('/school')
      return sch.data.school
    },
  })

  const { mutate } = useMutation({
    mutationFn: async ({ stat, id }: { stat: number; id: string }) => {
      await Axios.put(`/school/update/${id}`, {
        sch_verified: stat,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['allSchools'],
      })
      queryClient.invalidateQueries({
        queryKey: [''],
      })
    },
  })

  const { mutate: updateSchool } = useMutation({
    mutationFn: (data: School) => {
      return data as any
    },
    onSuccess: (data: School) => {
      queryClient.setQueryData(['school'], (oldData: School) => {
        return data
      })
    },
  })

  const generateLogin = useMutation({
    mutationFn: async (schEmail: string) => {
      const result = await Axios.post('/users/login/generate', { schEmail })
      return result
    },
  })

  const handleGenerateLogin = (schEmail: string) => {
    generateLogin.mutate(schEmail, {
      onSuccess: (res: AxiosResponse) => {
        if (window) {
          window?.navigator?.clipboard?.writeText(
            `${url?.replace("/api", "")}/auth/session?session=${res.data.session.session}`,
          )
          message.success('Link copied to clipboard')
        }
      },
    })
  }

  const setEdit = (id: string) => {
    const allSchools = queryClient.getQueryData(['allSchools']) as School[]
    const selectedSch = allSchools.find(
      (sch: School) => sch.sch_id === id,
    ) as School
    updateSchool(selectedSch)
    setCount(1)
  }

  const setPost = (school: School) => {
    queryClient.setQueryData(['school'], () => school) as School
    router.push('/dashboard/school/post')
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'School Logo',
      dataIndex: 'sch_logo',
      key: 'sch_logo',
      render: (_, record) => (
        <Image width={50} src={record.sch_logo} alt="school logo" />
      ),
    },
    {
      title: 'School name',
      dataIndex: 'sch_name',
      key: 'sch_name',
    },
    {
      title: 'Phone',
      dataIndex: 'sch_phone',
      key: 'sch_phone',
    },
    {
      title: 'School Admin Details',
      dataIndex: 'sch_admin',
      key: 'sch_admin',
      render: (_, record) => (
        <div>
          {record.sch_admin &&
            record.sch_admin.map((d: any, ind: number) => (
              <div key={ind}>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="underline font-[600]"> Admin {ind + 1}</p>
                    <div className='mt-1' onClick={() => handleGenerateLogin(d.sch_admin_email)}>
                      <FaCopy />
                    </div>
                  </div>
                </div>
                <p className="text-[12px]">Name: {d.sch_admin_name}</p>
                <p className="text-[12px]">Email: {d.sch_admin_email}</p>
                <p className="text-[12px]">Phone: {d.sch_admin_phone}</p>
              </div>
            ))}
        </div>
      ),
    },
    {
      title: 'Verify',
      key: 'verify',
      render: (_, record) =>
        record.sch_verified ? (
          <Switch
            checked
            onChange={(e) => mutate({ stat: e ? 1 : 0, id: record.sch_id! })}
          />
        ) : (
          <Switch
            onChange={(e) => mutate({ stat: e ? 1 : 0, id: record.sch_id! })}
          />
        ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="flex gap-3">
          <Space
            className="flex items-center cursor-pointer"
            align="center"
            onClick={() => setEdit(record.sch_id!)}
          >
            <FaEdit />
          </Space>
          <button
            className="flex items-center whitespace-nowrap cursor-pointer bg-orange p-2 rounded-lg text-xs leading-loose"
            //@ts-ignore
            onClick={() => setPost(record)}
          >
            Post Job
          </button>
        </div>
      ),
    },
  ]

  return { columns, admin_schools, count, setCount }
}

export default useSchool
