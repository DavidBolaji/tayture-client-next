import { Axios } from '@/request/request'

export const getSchoolJobs = async (defaultSchool: number) => {
  const result = await Axios.get(`/job/me?defaultSchool=${defaultSchool}`)
  return result
}
export const getJobById = async (jobId: string) => {
  const result = await Axios.get(`/job/${jobId}`)
  return result
}
export const getClientJobs = async () => {
  const result = await Axios.get('/job/verified')
  return result
}
export const getClientJobsByType = async (type: string) => {
  const result = await Axios.get(`/job/verified/${type}`)
  return result
}
export const createJob = async (data: any) => {
  const result = await Axios.post('/job/create/me', data)
  return result
}
