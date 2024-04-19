'use client'
import { Image, Switch } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'

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

  const columns: ColumnsType<DataType> = [
    {
      title: 'School Logo',
      dataIndex: 'sch_logo',
      key: 'sch_logo',
      render: (_, record) => <Image width={50} src={record.sch_logo} alt="school logo" />,
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
              </div>
            ))}
        </div>
      ),
    },

    {
      title: 'Action',
      key: 'action',
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
  ]

  return { columns, admin_schools }
}

export default useSchool
