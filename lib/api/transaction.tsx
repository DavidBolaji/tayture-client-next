import { Axios } from '@/request/request'

export const createTransaction = async (data: any) => {
  const result = await Axios.post(`/transaction/create/me`, data)
  return result
}
