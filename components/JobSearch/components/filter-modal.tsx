import React from 'react'
import useFilterModal from '../hook/use-filter-modal'
import { Input, Modal, Select } from 'antd'
import useAddress from '@/hooks/useAddress'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import useFilterQuery from '../hook/use-filter-query'

const FilterModal = () => {
  const { open, setClose } = useFilterModal()
  const { filter, setQuery, reset } = useFilterQuery()
  const { states } = useAddress()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: async () => {
      const req = await Axios.get(
        `/job?location=${filter?.location || ''}&minPrice=${
          filter?.minPrice || ''
        }&maxPrice=${filter?.maxPrice || ''}`,
      )
      return req.data
    },
    onSuccess: (res) => {
      console.log('[RES]', res)
      queryClient.setQueryData(['activeJob'], res.job[0])
      queryClient.setQueryData(['jobs'], res.job)
    },
  })

  return (
    <Modal
      title="Filter Jobs"
      open={open}
      onCancel={() => {
        reset()
        setClose()
      }}
      cancelText="Reset"
      onOk={() => {
        mutate()
        setClose()
      }}
    >
      <div className="mb-4">
        <label className="block mb-1">Location</label>
        <Select
          className="w-full"
          value={filter?.location || ''}
          onChange={(value) => setQuery('location', value)}
        >
          <Select.Option value="">All Locations</Select.Option>
          {states.map((state) => (
            <Select.Option key={state.key} value={state.value}>
              {state.value}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Min Price</label>
        <Input
          type="number"
          value={filter?.minPrice}
          onChange={(e) => setQuery('minPrice', e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Max Price</label>
        <Input
          type="number"
          value={filter?.maxPrice}
          onChange={(e) => setQuery('maxPrice', e.target.value)}
        />
      </div>
    </Modal>
  )
}

export default FilterModal
