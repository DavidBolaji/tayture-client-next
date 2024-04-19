'use client'
import { Image, Popconfirm, Space, Switch } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { Categories } from '@prisma/client'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'


const useCategory = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { data: category, isPending } = useQuery({
    queryKey: ['allCategory'],
    queryFn: async () => {
      const sch = await Axios.get('/categories')

      return sch.data.category
    },
  })

  const { mutate: deleteCategory, isPending: isDeleting } = useMutation({
    mutationFn: async (catId: string) => {
      return await Axios.delete(`/categories/delete/${catId}`)
    },
    onSuccess: (res: AxiosResponse) => {
      queryClient.setQueryData(['allCategory'], (oldData: Categories[]) => {
        const newData = oldData.filter((oD) => oD.id !== res.data.category.id)
        
        return newData
      })
    },
  })

  const { mutate: updateCategory } = useMutation({
    mutationFn: (data: Categories) => {
      return data as any
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['editCategory'], (oldData: Categories[]) => {
        return data
      })
      // queryClient.invalidateQueries({
      //   queryKey: ['editCategory']
      // })
    },
  
  })

  const handleDelete = (id: string) => {
    deleteCategory(id)
  }

  const handleEdit = (data: Categories) => {
    const options = {
      retry: true
    }
    updateCategory(data)
    
  
  }

  const columns: ColumnsType<Categories> = [
    {
      title: 'S/n',
      key: 'S/n',
      render: (_, record, index) => index + 1,
      width: 50
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) =>
        <Space size="middle">
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
             <a>Delete</a>
          </Popconfirm>
        <a onClick={() => handleEdit(record)}>Edit</a>
      </Space>
    },
  ]

  return { columns, category, isPending, isDeleting }
}

export default useCategory
