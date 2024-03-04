import db from '@/db/db'
import { Axios } from '@/request/request'
import { ViewedMatch } from '@prisma/client'

export const getMatchedJobUsers = async (jobId: string) => {
  const result = await Axios.get(`/matched/${jobId}`)
  return result
}

export const getAppliedJobUsers = async (jobId: string) => {
  const result = await Axios.get(`/apply/${jobId}`)
  return result
}

export const storeAndDeleteMatched = async (matched: any) => {
  /** current time + 24hrs */
  const time = new Date(
    new Date().getTime() + 24 * 60 * 60 * 1000,
  ).toISOString()

  try {
    await db.$transaction(async (tx) => {
      const viewed = await tx.viewedMatch.createMany({
        data: matched.map((view: ViewedMatch) => ({
          ...view,
          viewed: time,
        })),
      })

      /**delete data from matched */
      const deleted = matched.map(async (match: any) => {
        await tx.matched.delete({
          where: {
            id: match.id,
          },
        })
      })

      await Promise.all(deleted)
    })
    console.log('[STORE_AND_DELETE_SUCCESS]')
  } catch (error) {
    console.log('[STORE_AND_DELETE_MATCHED]', (error as Error).message)
  }
}
