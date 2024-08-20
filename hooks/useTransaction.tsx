'use client'
import { Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import {  useQuery, useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { Transaction } from '@prisma/client'
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi'
import moment from 'moment'
import { formatNumber } from '@/utils/helpers'
import { FaHandHolding } from 'react-icons/fa6'
import { FaLockOpen } from 'react-icons/fa'
import { GrLock, GrUnlock } from 'react-icons/gr'
import { useGlobalContext } from '@/Context/store'

const hashType = {
  CREDIT: 'success',
  DEBIT: 'magenta',
  LOCKED: 'violet',
  UNLOCKED: 'purple'
}


const useTransaction = () => {

  const {defaultSchool} =useGlobalContext()
  const queryClient = useQueryClient()
  const permission = queryClient.getQueryData(['permission'])
  const permissionGranted = permission !== 'limited'
  const { data: transactions, isPending } = useQuery({
    queryKey: ['allTransactions'],
    queryFn: async () => {
      if (permissionGranted) {
        const req = await Axios.get(`/transaction/me?defaultSchool=${defaultSchool}`)
        return req.data.transaction
      }
      const req = await Axios.get(`/transaction/me/limit?defaultSchool=${defaultSchool}`)
        return req.data.transaction
    },
  })

  const limitTransaction = transactions ? transactions?.slice(0, 4) : []

  const columns: ColumnsType<Transaction> = [
    {
      title: '',
      dataIndex: 's/n',
      key: 's/n',
      width: 50,
      render: (_, record, idx) => idx + 1,
    },
    {
      title: 'State',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (_, record) => (
        <Tag className="bg-[#f4f5fb] space-x-1" color={hashType[record.type]} >
         
          <span className='text-[10px] inline-block  lowercase'>{record.type}</span>
        </Tag>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
      render: (_, record) => (
        <div className="bg-[#f4f5fb] flex items-center justify-start gap-1">
          <div className="-translate-y-[45px]">
            {record.type === 'CREDIT' && <GiReceiveMoney color="lime" />}
            {record.type === 'DEBIT' && <GiPayMoney color="red" />}
            {record.type === 'LOCKED' && <FaHandHolding color="yellow" />}
            {record.type === 'UNLOCKED' && <FaLockOpen color="green" />}
          </div>
          <div>{formatNumber(record.amount, 'NGN', {})}</div>
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, record) => (
        <div className="text-xs">
          <span>
            {moment(new Date(record.createdAt).toISOString()).format('MMM D | HH:mm')}
          </span>
        </div>
      ),
    },
  ]

  const columns2: ColumnsType<Transaction> = [
    {
      title: '',
      dataIndex: 's/n',
      key: 's/n',
      render: (_, record, idx) => idx + 1,
    },
    {
      title: 'State',
      dataIndex: 'type',
      key: 'type',
      render: (_, record) => (
        <Tag className="bg-[#f4f5fb] space-x-1" color={hashType[record.type]} >
         
          <span className='text-[10px] inline-block  lowercase'>{record.type}</span>
        </Tag>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (_, record) => (
        <div className="bg-[#f4f5fb] flex items-center justify-start gap-1">
          <div className="-translate-y-[45px]">
            {record.type === 'CREDIT' && <GiReceiveMoney color="lime" />}
            {record.type === 'DEBIT' && <GiPayMoney color="red" />}
            {record.type === 'LOCKED' && <GrLock color="yellow" />}
            {record.type === 'UNLOCKED' && <GrUnlock color="purple" />}
          </div>
          <div>{formatNumber(record.amount, 'NGN', {})}</div>
        </div>
      ),
    },
  ]

  return { columns, transactions, isPending, limitTransaction, columns2 }
}

export default useTransaction
