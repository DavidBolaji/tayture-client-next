import { Axios } from '@/request/request'

export const createTransaction = async (data: any, defaultSchool: number) => {
  const result = await Axios.post(`/transaction/create/me?defaultSchool=${defaultSchool}`, data)
  return result
}
