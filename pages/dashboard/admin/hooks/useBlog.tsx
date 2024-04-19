'use client'
import { Image, Popconfirm, Space } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { Blog, Categories } from '@prisma/client'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'


const useBlog = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { data: blog, isPending } = useQuery({
    queryKey: ['allBlog'],
    queryFn: async () => {
      const sch = await Axios.get('/blog')
      return sch.data.blog
    },
  })

  const { mutate: deleteBlog, isPending: isDeleting } = useMutation({
    mutationFn: async (blogId: string) => {
      return await Axios.delete(`/blog/delete/${blogId}`)
    },
    onSuccess: (res: AxiosResponse) => {
      queryClient.setQueryData(['allBlog'], (oldData: Categories[]) => {
        const newData = oldData.filter((oD) => oD.id !== res.data.blog.id)
        return newData
      })
    },
  })

  const { mutate: updateBlog } = useMutation({
    mutationFn: (data: Categories) => {
      return data as any
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['editblog'], (oldData: Blog[]) => {
        return data
      })
    },
  
  })

  const handleDelete = (id: string) => {
    deleteBlog(id)
  }

  const handleEdit = (data: Categories) => {
    const options = {
      retry: true
    }
    updateBlog(data)
    
  
  }

  const columns: ColumnsType<Blog> = [
    {
      title: 'S/n',
      key: 'S/n',
      render: (_, record, index) => index + 1,
      width: 50
    },
    {
      title: 'Picture',
      dataIndex: 'banner',
      key: 'banner',
      render: (_, record) => <Image width={200} height={200} src={record.banner} alt={'blog_picture'} />,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Slug',
      dataIndex: 'except',
      key: 'except',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',

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

  return { columns, blog, isPending, isDeleting }
}

export default useBlog
