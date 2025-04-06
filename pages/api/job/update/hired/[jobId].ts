import db from '@/db/db'
import verifyToken from '@/middleware/verifyToken'
import { formatNumber } from '@/utils/helpers'
import { Job } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
  job?: Partial<Job>
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' })

  const holder = ['created_at', 'updated_at']

  const keys = Object.keys(req.body)
  const data: any = {}

  keys.forEach((key) => {
    if (!holder.includes(key)) {
      data[key] = req.body[key]
    }
  })

  console.log(
    '[SCHOOLID]',
    req.authUser!.school[+req.body.defaultSchool].sch_id,
  )
  console.log('[WALLETBALANCE]', req.body['amt'])
  console.log('[ACTIVE]', req.body['active'])
  console.log('[REFUND]', req.body['refund'])

  try {
    if (!req.body['active']) {
      if (req.body['refund']) {
        const job = await db.$transaction(async (tx) => {
          const req2 = tx.wallet.update({
            where: {
              // walletUserId: req.authUser!.id as string,
              walletSchId: req.authUser!.school[+req.body.defaultSchool]
                .sch_id as unknown as string,
            },
            data: {
              wallet_balance: {
                increment: req.body['amt'],
              },
              wallet_locked_balance: {
                decrement: req.body['amt'],
              },
            },
          })

          if (req.body['amt'] > 0) {
            await tx.transaction.create({
              data: {
                type: 'UNLOCKED',
                amount: req.body['amt'],
                userId: req.authUser!.id,
                message: `Discontinue hiring, funds unlocked ₦${formatNumber(
                  req.body['amt'],
                  'NGN',
                  {},
                )}`,
                schoolId: req.body['schoolId'],
              },
            })
          }

          const job = tx.job.update({
            where: {
              job_id: req.query.jobId as string,
            },
            data: {
              active: req.body['active'],
            },
          })

          await Promise.all([req2, job])
          return job
        })
        res.status(200).json({ message: 'Job Updated', job })
      } else {
        const job = await db.job.update({
          where: {
            job_id: req.query.jobId as string,
          },
          data: {
            active: req.body['active'],
          },
        })
        res.status(200).json({ message: 'Job Updated', job })
      }
    } else {
      if (req.body['refund']) {
        const job = await db.$transaction(async (tx) => {
          const wallet = await tx.wallet.findUnique({
            where: {
              walletSchId: req.authUser!.school[+req.body.defaultSchool].sch_id,
            },
          })
          let req2: any
          if (!((wallet?.wallet_locked_balance || 0) > 0)) {
            req2 = tx.wallet.update({
              where: {
                // walletUserId: req.authUser!.id as string,
                walletSchId: req.authUser!.school[+req.body.defaultSchool]
                  .sch_id as unknown as string,
              },
              data: {
                wallet_balance: {
                  decrement: req.body['amt'],
                },
                wallet_locked_balance: {
                  increment: req.body['amt'],
                },
              },
            })
          }

          if (req.body['amt'] > 0) {
            if (!((wallet?.wallet_locked_balance || 0) > 0)) {
              await tx.transaction.create({
                data: {
                  type: 'LOCKED',
                  amount: req.body['amt'],
                  userId: req.authUser!.id,
                  message: `Continue hiring, fund locked ₦${formatNumber(
                    req.body['amt'],
                    'NGN',
                    {},
                  )}`,
                  schoolId: req.body['schoolId'],
                },
              })
            }
          }

          const job = tx.job.update({
            where: {
              job_id: req.query.jobId as string,
            },
            data: {
              active: req.body['active'],
            },
          })

          await Promise.all([req2, job])
          return job
        })
        res.status(200).json({ message: 'Job Updated', job })
      } else {
        const job = await db.job.update({
          where: {
            job_id: req.query.jobId as string,
          },
          data: {
            active: req.body['active'],
          },
        })
        res.status(200).json({ message: 'Job Updated', job })
      }
    }
  } catch (error) {
    res.status(400).json({ message: `Error: ${(error as Error).message}` })
  }
}

export default verifyToken(handler)
