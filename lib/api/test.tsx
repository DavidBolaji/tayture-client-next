import { Axios } from '@/request/request'

export const createTest = async (data: any) => {
  const result = await Axios.post('/test/create/me', data)
  return result
}
export const getTest = async (scheduleId: string) => {
  const result = await Axios.get(`/test/${scheduleId}`)
  return result
}
