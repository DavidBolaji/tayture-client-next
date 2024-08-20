'use client'
import { Image, Popconfirm, Space } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { Blog, Categories } from '@prisma/client'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import moment from 'moment'
import { useState } from 'react'
import { useGlobalContext } from '@/Context/store'

const useBlog = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const {setImg, setMessage} = useGlobalContext()
  const [drawer, setDrawer] = useState(false)
  const [editBlog, setEditBlog] = useState<Blog | null>(null)
  const { data: blog, isPending } = useQuery({
    queryKey: ['allBlog'],
    queryFn: async () => {
      const sch = await Axios.get('/blog?all=1')
      return sch.data.blog
    },
  })

  const { mutate: deleteBlog, isPending: isDeleting } = useMutation({
    mutationFn: async (blogId: string) => {
      return await Axios.delete(`/blog/delete/${blogId}`)
    },
    onSuccess: (res: AxiosResponse) => {
      setMessage(() => res.data.message)
      queryClient.setQueryData(['allBlog'], (oldData: Blog[]) => {
        const newData = oldData.filter((oD) => oD.id !== res.data.blog.id)
        return newData
      })
    },
  })

  const close = () => setDrawer(false)

  const { mutate: updateBlog } = useMutation({
    mutationFn: (data: Blog) => {
      return Axios.put(`/blog/update/${data.id}`, { ...data })
    },
    onSuccess: (res: AxiosResponse) => {
      close()
      setImg(() => '')
      queryClient.setQueryData(['allBlog'], (oldData: Blog[]) => {
        const newData = oldData.map((data) => {
          if (data.id === res.data.blog.id) {
            return {
              ...res.data.blog,
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
    deleteBlog(id)
  }

  //@ts-ignore
  const handleUpdate = (data: Partial<Blog>) => updateBlog(data)

  const handleEdit = (data: Blog) => {
    setImg(() => data.banner!)
    setDrawer(true)
    setEditBlog(data)
  }

  const handlePublish = (data: Blog) => {
   handleUpdate({...data, published: !data.published})
  }

  const columns: ColumnsType<Blog> = [
    {
      title: 'S/n',
      key: 'S/n',
      render: (_, record, index) => index + 1,
      width: 50,
    },
    {
      title: 'Picture',
      dataIndex: 'banner',
      key: 'banner',
      render: (_, record) => (
        <Image
          width={50}
          height={50}
          src={record.banner!}
          alt={'blog_picture'}
          className="object-cover rounded-full"
        />
      ),
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
      render: (_, record) => (
        <span>{moment(record.createdAt).format('Do MMM YYYY | hh:mm')}</span>
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
          <a onClick={() => handleEdit(record)}>Edit</a>
          <a onClick={() => handlePublish(record)}>{record.published ? 'Unpublish': 'Publish'}</a>
        </Space>
      ),
    },
  ]

  return {
    columns,
    blog,
    isPending,
    isDeleting,
    drawer,
    close,
    handleUpdate,
    editBlog,
  }
}

export default useBlog
