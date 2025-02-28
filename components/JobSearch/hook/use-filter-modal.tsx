import { useQuery, useQueryClient } from '@tanstack/react-query'

const useFilterModal = () => {
  const queryClient = useQueryClient()

  // Initialize LOADING query data if not set already
  if (!queryClient.getQueryData(['FILTER_MODAL'])) {
    queryClient.setQueryData(['FILTER_MODAL'], () => false)
  }

  const { data: open } = useQuery({
    queryKey: ['FILTER_MODAL'],
    queryFn: () => queryClient.getQueryData(['FILTER_MODAL']) as boolean,
  })

  const setOpen = () => {
    queryClient.setQueryData(['FILTER_MODAL'], true)
  }

  const setClose = () => {
    queryClient.setQueryData(['FILTER_MODAL'], false)
  }

  return { open, setOpen, setClose }
}

export default useFilterModal
