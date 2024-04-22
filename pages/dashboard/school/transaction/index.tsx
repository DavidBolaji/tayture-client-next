import { boldFont, regularFont } from '@/assets/fonts/fonts'
import useTransaction from '@/hooks/useTransaction'
import { Table } from 'antd'
import React from 'react'

const TransactiionsPage = () => {
  const { transactions, columns, isPending } = useTransaction()
  return (
    <div className="rounded-2xl p-3 bg-white ">
        <div>
            <p 
            className={`mb-[40px] border-b  text-black md:text-[24px] text-xl ${boldFont.className}`}
            >
                Transactions
            </p>
        </div>
      <Table
        rowKey="id"
        scroll={{ x: 700 }}
        dataSource={transactions}
        columns={columns}
        loading={isPending}
        size="small"
      />
    </div>
  )
}

export default TransactiionsPage
