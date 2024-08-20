'use client'
import { Popconfirm, Space } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { Coupoun } from '@prisma/client'
import { AxiosResponse } from 'axios'
import moment from 'moment'
import { useState } from 'react'
import { useGlobalContext } from '@/Context/store'
import { formatNumber } from '@/utils/helpers'

const useCoupoun = () => {
  const queryClient = useQueryClient()
  const {setImg, setMessage} = useGlobalContext()
  const [editCoupoun, setEditCoupoun] = useState<Coupoun | null>(null)
  const { data: coupoun, isPending } = useQuery({
    queryKey: ['allCoupoun'],
    queryFn: async () => {
      const coupoun = await Axios.get('/coupoun')
      return coupoun.data.coupoun as Coupoun[]
    },
  })

  const { mutate: deleteCoupoun, isPending: isDeleting } = useMutation({
    mutationFn: async (coupounId: string) => {
      return await Axios.delete(`/coupoun/delete/${coupounId}`)
    },
    onSuccess: (res: AxiosResponse) => {
      setMessage(() => res.data.message)
      queryClient.setQueryData(['allCoupoun'], (oldData: Coupoun[]) => {
        const newData = oldData.filter((oD) => oD.id !== res.data.coupoun.id)
        return newData
      })
    },
  })

  const { mutate: updateCoupoun } = useMutation({
    mutationFn: (data: Coupoun) => {
      return Axios.put(`/coupoun/update/${data.id}`, { ...data })
    },
    onSuccess: (res: AxiosResponse) => {
      close()
      setImg(() => '')
      queryClient.setQueryData(['allCoupoun'], (oldData: Coupoun[]) => {
        const newData = oldData.map((data) => {
          if (data.id === res.data.coupoun.id) {
            return {
              ...res.data.coupoun,
            }
          } else {
            return {
              ...data,
            }
          }
        })
        return newData
      })
    },
  })

  const handleDelete = (id: string) => {
    deleteCoupoun(id)
  }

  //@ts-ignore
  const handleUpdate = (data: Partial<Coupoun>) => updateCoupoun(data)


  const handleActivate = (data: Coupoun) => {
   handleUpdate({...data, used: !data.used})
  }

  const columns: ColumnsType<Coupoun> = [
    {
      title: 'S/n',
      key: 'S/n',
      render: (_, record, index) => index + 1,
      width: 50,
    },
    {
      title: 'Code',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Discount',
      dataIndex: 'amount',
      key: 'amount',
      render: (_, record) => (
        <span>₦ {formatNumber(record.amount, 'NGN', {})}</span>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, record) => (
        <span>{moment(record?.createdAt || new Date().toISOString()).format('Do MMM YYYY | hh:mm')}</span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
          {/* <a onClick={() => handleEdit(record)}>Edit</a>
          <a onClick={() => handlePublish(record)}>{record.published ? 'Unpublish': 'Publish'}</a> */}
        </Space>
      ),
    },
  ]

  return {
    columns,
    coupoun,
    isPending,
    isDeleting,
    handleUpdate,
    editCoupoun,
  }
}

export default useCoupoun
