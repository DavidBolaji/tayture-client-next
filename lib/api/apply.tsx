import { Axios } from '@/request/request'

export const createApplication = async (data: any) => {
  const result = await Axios.post('/apply/create/me', data)
  return result
}
