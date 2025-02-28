import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { message } from 'antd'

const filters = {
  location: '',
  minPrice: '',
  maxPrice: '',
}

type filtersType = { location: string; minPrice: string; maxPrice: string }

const useFilterQuery = () => {
  const queryClient = useQueryClient()

  // Initialize LOADING query data if not set already
  if (!queryClient.getQueryData(['FILTER_QUERY'])) {
    queryClient.setQueryData(['FILTER_QUERY'], () => filters)
  }

  const { data: filter } = useQuery({
    queryKey: ['FILTER_QUERY'],
    queryFn: () => queryClient.getQueryData(['FILTER_QUERY']) as filtersType,
  })

  const setQuery = (key: keyof filtersType, value: string) => {
    queryClient.setQueryData(['FILTER_QUERY'], (prev: filtersType) => ({
      ...prev,
      [key]: value,
    }))
  }

  const reset = async () => {
    queryClient.setQueryData(['FILTER_QUERY'], () => filters)
    await Axios.get(`/job`)
      .then((res) => {
        queryClient.setQueryData(['activeJob'], res.data.job[0])
        queryClient.setQueryData(['jobs'], res.data.job)
        queryClient.removeQueries({
          queryKey: ['relatedJob', 'relatedJobs'],
        })
      })
      .catch((err) => {
        message.error((err as Error).message)
      })
  }

  return { filter, setQuery, reset }
}

export default useFilterQuery
