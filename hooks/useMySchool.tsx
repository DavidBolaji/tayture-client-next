'use client'
import { Space, Switch } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { FaEdit } from 'react-icons/fa'
import { School, SchoolAdmin } from '@prisma/client'
import { useState } from 'react'
import { useGlobalContext } from '@/Context/store'

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

const useMySchool = () => {
  const queryClient = useQueryClient()
  const [count, setCount] = useState(-1)
  const {setMessage} = useGlobalContext()
  const { data: my_schools, isPending } = useQuery({
    queryKey: ['allMySchools'],
    queryFn: async () => {
      const sch = await Axios.get('/school/mine')

      return sch.data.school
    },
  })

  const { mutate } = useMutation({
    mutationFn: async ({ stat, adminId }: { stat: boolean; adminId: string }) => {
      return await Axios.put(`/schooladmin/update/${adminId}`, {
        sch_admin_active: stat,
      })
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ['allMySchools'],
      })
      setMessage(() => res.data.message)
      queryClient.invalidateQueries({
        queryKey: [''],
      })
    },
  })

  const { mutate: updateSchool } = useMutation({
    mutationFn: (data: School) => {
      return data as any
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['school'], (oldData: School) => {
        return data
      })
    },
  })

  const setEdit = (id: string) => {
    const allSchools = queryClient.getQueryData(['allSchools']) as School[]
    const selectedSch = allSchools.find(
      (sch: School) => sch.sch_id === id,
    ) as School
    updateSchool(selectedSch)
    setCount(1)
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'School name',
      dataIndex: 'sch_name',
      key: 'sch_name',
    },
    {
      title: 'School Admin Details',
      dataIndex: 'sch_admin',
      key: 'sch_admin',
      render: (_, record) => (
        <div>
          {record.sch_admin &&
            record.sch_admin.map((d: SchoolAdmin, ind: number) => (
              <div key={ind}>
                <div>
                  <p className="underline font-[600]">
                    Admin
                    {ind + 1}
                  </p>
                </div>
                <p className="text-[12px]">
                  Name:
                  {d.sch_admin_name}
                </p>
                <p className="text-[12px]">
                  Email:
                  {d.sch_admin_email}
                </p>
                <p className="text-[12px]">
                  Phone:
                  {d.sch_admin_phone}
                </p>
                <p>
                  {d.sch_admin_active ? (
                    <Switch
                      checked
                      onChange={(e) =>
                        mutate({ stat: e ? true : false, adminId: d.sch_admin_id! })
                      }
                    />
                  ) : (
                    <Switch
                      onChange={(e) =>
                        mutate({ stat: e ? true : false, adminId: d.sch_admin_id! })
                      }
                    />
                  )}
                </p>
              </div>
            ))}
        </div>
      ),
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space
          className="flex items-center cursor-pointer"
          align="center"
          onClick={() => setEdit(record.sch_id!)}
        >
          <FaEdit />
          {/* <span>Edit</span> */}
        </Space>
      ),
    },
  ]

  return { columns, my_schools, count, setCount, isPending }
}

export default useMySchool
