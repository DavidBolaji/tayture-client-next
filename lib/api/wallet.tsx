import { Axios } from '@/request/request'

export const incWallet = async (data: any, defaultSchool: number) => {
  const result = await Axios.put(`/wallet/update/me?defaultSchool=${defaultSchool}`, {...data, decre: false})
  return result
}

export const incWalletLimit = async (data: any, defaultSchool: number) => {
  const result = await Axios.put(`/wallet/update/me/limit?defaultSchool=${defaultSchool}`, {...data, decre: false})
  return result
}

export const decWallet = async (data: any, defaultSchool: number) => {
  const result = await Axios.put(`/wallet/update/me?defaultSchool=${defaultSchool}`, {...data, decre: true})
  return result
}

export const decWalletLimit = async (data: any, defaultSchool: number) => {
  const result = await Axios.put(`/wallet/update/me/limit?defaultSchool=${defaultSchool}`, {...data, decre: true})
  return result
}