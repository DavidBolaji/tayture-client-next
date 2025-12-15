import { useQuery } from '@tanstack/react-query'
import { Axios } from '@/request/request'

interface Application {
  id: string
  applicantFirstName: string
  applicantLastName: string
  applicantEmail: string
  applicantPhone: string
  schoolName: string
  jobTitle: string
  jobCreatedAt: string
  jobDeadline: string
  applicationDate: string
  cv: string | null
}

interface ApplicationsResponse {
  applications: Application[]
  pagination: {
    currentPage: number
    totalPages: number
    totalCount: number
    hasNext: boolean
    hasPrev: boolean
  }
}

interface UseApplicationsListParams {
  page: number
  limit: number
  search: string
  startDate?: string
  endDate?: string
}

const useApplicationsList = ({ page, limit, search, startDate, endDate }: UseApplicationsListParams) => {
  return useQuery<ApplicationsResponse>({
    queryKey: ['applications-list', page, limit, search, startDate, endDate],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search,
        ...(startDate && { startDate }),
        ...(endDate && { endDate })
      })

      const response = await Axios.get(`/apply/list?${params}`)
      return response.data
    },
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: false
  })
}

export default useApplicationsList
export type { Application, ApplicationsResponse }