import { Axios } from '@/request/request'

export const getUserSchool = async () => {
  const result = await Axios.get('/school/me')
  return result
}
export const createSchool = async (data: any) => {
  const result = await Axios.post('/school/create/me', data)
  return result
}
export const updateSchool = async (data: any, defaultSchool: number) => {
  const result = await Axios.put(`/school/update/me?defaultSchool=${defaultSchool}`, data)
  return result
}

export const getUserSchoolAdmin = async () => {
  const result = await Axios.get(`/school/me/school`)
  return result
}
