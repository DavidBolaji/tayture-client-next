import { Axios } from '@/request/request'

export const createSchedule = async (data: any) => {
  const result = await Axios.post('/schedule/create/me', data)
  return result
}

export const getScheduledJobUsers = async (jobId: string) => {
  const result = await Axios.get(`/schedule/${jobId}`)
  return result
}

export const updateScheduled = async (obj: any, scheduleId: string) => {
  const result = await Axios.put(`/schedule/update/${scheduleId}`, obj)
  return result
}
