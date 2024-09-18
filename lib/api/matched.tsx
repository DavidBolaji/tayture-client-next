import { Axios } from '@/request/request'

export const getMatchedJobUsers = async (jobId: string) => {
  const result = await Axios.get(`/matched/${jobId}`)
  return result
}

export const getAppliedJobUsers = async (jobId: string) => {
  const result = await Axios.get(`/apply/${jobId}`)
  return result
}

export const sendRejectionMessage = async (
  {jobId, user}:
  {jobId: string, user: {userId: string}[]}
) => {
  const result = await Axios.post(`/apply/rejection/${jobId}`, {userIds: user})
  return result
}

