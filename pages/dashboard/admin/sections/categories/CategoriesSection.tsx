import React from 'react'
import CreateCategoryCard from '../../components/categories/CreateCategoryCard'
import useCategory from '../../hooks/useCategory'
import { Table } from 'antd'

const CategoriesSection = () => {
  const { category, columns, isPending, isDeleting } = useCategory()

  return (
    <section className="grid grid-cols-10 gap-5">
      <div className="col-span-3">
        <CreateCategoryCard />
      </div>
      <div className="col-span-7">
        <Table
          rowKey="id"
          scroll={{ x: 500 }}
          dataSource={category}
          columns={columns}
          loading={isPending || isDeleting}
          size='small'
        />
      </div>
    </section>
  )
}

export default CategoriesSection
