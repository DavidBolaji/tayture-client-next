import React, { useState } from 'react'
import SchoolSection from './sections/school/SchoolSection'
import UserSection from './sections/users/UserSection'
import CategoriesSection from './sections/categories/CategoriesSection'
import BlogsSection from './sections/blogs/BlogsSection'
import { Segmented } from 'antd'
import { AppstoreOutlined, BarsOutlined, UserOutlined } from '@ant-design/icons'
import AppliedSection from './sections/applied/AppliedSection'

const AdminPage = () => {
  const [path, setPath] = useState('School')

  const handleChange = (val: any) => {
    setPath(() => val)
  }

  return (
    <div>
      <div className="mb-10 border-b">
        <Segmented
          onChange={handleChange}
          options={[
            { label: 'School', value: 'School', icon: <BarsOutlined /> },
            { label: 'User', value: 'User', icon: <UserOutlined /> },
            {
              label: 'Category',
              value: 'Category',
              icon: <AppstoreOutlined />,
            },
            { label: 'Blog', value: 'Blog', icon: <AppstoreOutlined /> },
            { label: 'Applied', value: 'Applied', icon: <AppstoreOutlined /> },
          ]}
        />
      </div>
      <div className="p-5 bg-[#f5f5f5]">
        {path === 'School' && <SchoolSection />}
        {path === 'Blog' && <BlogsSection />}
        {path === 'User' && <UserSection />}
        {path === 'Category' && <CategoriesSection />}
        {path === 'Applied' && <AppliedSection />}
      </div>
    </div>
  )
}

export default AdminPage
