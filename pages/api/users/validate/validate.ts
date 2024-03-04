import { validateUserSchema } from './Schema/schema'
import { getUserById } from '@/lib/services/user'
import db from '@/db/db'
import { NextApiRequest, NextApiResponse } from 'next'

type verifyField = 'id' | 'otp'
type Data = {
  message: string
  user?: any
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const body = req.body
  const validation = validateUserSchema.safeParse(body)
  if (!validation.success) {
    const errorList = validation.error.format()
    const field = Object.keys(errorList)[1] as verifyField
    return res.send({
      message: `Validation Error (${field}): ${errorList[field]?._errors}`,
    })
  }
  const { id } = validation.data

  const existingUser = await getUserById(id)

  if (!existingUser) return res.send({ message: 'OTP is not valid' })
  const req1 = db.user.update({
    where: {
      id: id,
    },
    data: { validated: 1 },
  })

  try {
    await Promise.all([req1])
    return res.send({ message: 'User Validated!' })
  } catch (error: unknown) {
    return res.send({ message: (error as Error).message })
  }
}
