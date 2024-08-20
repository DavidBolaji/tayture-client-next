import { Axios } from '@/request/request'

export const getMatchedJobUsers = async (jobId: string) => {
  const result = await Axios.get(`/matched/${jobId}`)
  return result
}

export const getAppliedJobUsers = async (jobId: string) => {
  const result = await Axios.get(`/apply/${jobId}`)
  return result
}

