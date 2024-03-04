import { z } from 'zod'
export const registerUserSchema = z.object({
  fname: z.string().trim().min(1).max(30),
  lname: z.string().trim().min(1).max(30),
  email: z.string().trim().email(),
  password: z.string().trim().max(255),
  phone: z.string().trim().max(16),
  skip: z.boolean().optional(),
  path: z.string().optional(),
})
