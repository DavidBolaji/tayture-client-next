import { Axios } from '@/request/request'
import axios from 'axios'

export const getViewed = async ({
  jobId,
  no_hires,
  token,
}: {
  jobId: string
  no_hires: string
  token: string
}) => {
  try {
    const viewed = await Axios.post(
      `/viewed/${jobId}`,
      {
        no_hires: +no_hires,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    console.log('[JOB_DATA]', viewed.data.job)
    return !viewed.data.job ? [] : viewed.data.job
  } catch (error) {
    console.log('[GET_VIEWED_FUNCTION]', error)
    throw Error((error as Error).message)
  }
}
