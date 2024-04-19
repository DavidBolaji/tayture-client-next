import { Table } from 'antd'
import React from 'react'
import CreateBlogCard from '../../components/blog/CreateBlogCard'
import useBlog from '../../hooks/useBlog'

const BlogsSection = () => {
  const {blog, isDeleting, isPending, columns} = useBlog()
  return (
  
    <section className="grid grid-cols-10 gap-5">
    <div className="col-span-5">
      <CreateBlogCard />
    </div>
    <div className="col-span-10">
      <Table
        rowKey="id"
        scroll={{ x: 700 }}
        dataSource={blog}
        columns={columns}
        loading={isPending || isDeleting}
        size='small'
      />
    </div>
  </section>
    
  )
}

export default BlogsSection
