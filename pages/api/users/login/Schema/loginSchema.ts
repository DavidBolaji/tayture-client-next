import { z } from 'zod'

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().max(255),
})


export const sessionUserSchema = z.object({
  session: z.string()
})