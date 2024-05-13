import { Drawer, Table } from 'antd'
import React from 'react'
import CreateBlogCard from '../../components/blog/CreateBlogCard'
import useBlog from '../../hooks/useBlog'
import EditBlogForm from '../../components/blog/EditBlogForm'

const BlogsSection = () => {
  const {
    blog,
    isDeleting,
    isPending,
    columns,
    drawer,
    editBlog,
    close,
    handleUpdate,
  } = useBlog()
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
          size="small"
        />
      </div>
      <Drawer open={drawer} onClose={close}>
        <EditBlogForm blog={editBlog} updateBlog={handleUpdate} />
      </Drawer>
    </section>
  )
}

export default BlogsSection
