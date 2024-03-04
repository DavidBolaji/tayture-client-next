import { Axios } from '@/request/request'

export const incWallet = async (data: any) => {
  const result = await Axios.put('/wallet/update/me', data)
  return result
}
