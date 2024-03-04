import { z } from 'zod'
export const validateUserSchema = z.object({
  id: z.string(),
  otp: z.string(),
})
