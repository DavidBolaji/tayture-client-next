import db from '@/db/db'
import { getUserById } from '@/lib/services/user'
import { Categories } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid'

type Data = {
  message?: string
  category: Categories
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' })

  const id = uuid();
  const newId = typeof req.body['id'] === "undefined" ? id :  req.body['id']
  console.log(id)
  console.log(newId)



  try {
    const category = await db.categories.upsert({
      where: {
        id:  newId
      },
      create: {
        id,
        title: req.body['title'],
      },
      update: {
        title: req.body['title'],
        id: newId
      },
    })
    console.log(category)
    res.status(201).json({
      message: 'Job Created',
      category,
    })
  } catch (error) {
    res.status(400).json({
      message: `An error occured: ${(error as Error).message}`,
    })
  }
}
