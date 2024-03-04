import { Axios } from '@/request/request'

export const createAssesement = async (data: any) => {
  const result = await Axios.post('/assesement', data)
  return result
}
