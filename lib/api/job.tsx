import { Axios } from '@/request/request'
import { Profile } from '@prisma/client'

export const getSchoolJobs = async (defaultSchool: number) => {
  const result = await Axios.get(`/job/me?defaultSchool=${defaultSchool}`)
  return result
}

export const getSchoolLimitedJobs = async (defaultSchool: number) => {
  const result = await Axios.get(
    `/job/me/limited?defaultSchool=${defaultSchool}`,
  )
  return result
}

export const getJobById = async (jobId: string) => {
  const result = await Axios.get(`/job/${jobId}`)
  return result
}

export const getClientJobs = async ({
  searchTerm = '',
  filterBy = '',
  currentPage = 1,
  pageSize = '',
} = {}) => {
  const result = await Axios.get('/job/verified', {
    params: { searchTerm, filterBy, currentPage, pageSize },
  })
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
export const updateProfile = async (data: Partial<Profile>) => {
  const result = await Axios.put('/users/profile/update/me', {
    ...data,
  })
  return result
}
export const updateJob = async (jobId: string) => {
  const result = await Axios.put(`/job/update/${jobId}`, {
    active: false,
  })
  return result
}
