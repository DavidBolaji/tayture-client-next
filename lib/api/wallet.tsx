import { Axios } from '@/request/request'

export const incWallet = async (data: any) => {
  const result = await Axios.put('/wallet/update/me', {...data, decre: false})
  return result
}
export const decWallet = async (data: any) => {
  const result = await Axios.put('/wallet/update/me', {...data, decre: true})
  return result
}
