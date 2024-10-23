import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Axios } from '@/request/request'

interface CVStats {
  totalDownloads: number
  completedDownloads: number
}

interface CVDownload {
  userId: string
  userName: string
  downloadCount: number
  completedCount: number
}

interface CVDownloadProcess {
  id: string
  userId: string
  cvId: string
  started: boolean
  ended: boolean
  createdAt: string
  updatedAt: string
}

interface APIResponse {
  downloads: CVDownload[]
  processes: CVDownloadProcess[]
}

export const useCVDownloads = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])

  const { data, isLoading, error, refetch } = useQuery<APIResponse>({
    queryKey: ['cvDownloads', dateRange],
    queryFn: async () => {
      const [startDate, endDate] = dateRange
      const params = new URLSearchParams()
      if (startDate) params.append('startDate', startDate.toISOString())
      if (endDate) params.append('endDate', endDate.toISOString())
      
      const res = await Axios.get<APIResponse>(`/cv-downloads?${params.toString()}`)
      return res.data
    },
  })

  useEffect(() => {
    refetch()
  }, [dateRange, refetch])

  const cvStats: CVStats = {
    totalDownloads: data?.downloads.reduce((sum, download) => sum + download.downloadCount, 0) ?? 0,
    completedDownloads: data?.downloads.reduce((sum, download) => sum + download.completedCount, 0) ?? 0,
  }

  return {
    cvStats,
    cvDownloads: data?.downloads ?? [],
    cvProcesses: data?.processes ?? [],
    dateRange,
    setDateRange,
    isLoading,
    error,
  }
}